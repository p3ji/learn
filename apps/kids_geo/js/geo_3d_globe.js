/**
 * Kids Geo Arcade - Real Earth Three.js 3D Globe & Flight Arc System
 * Features cinematic 2.5-second airplane flight arc trajectory animations with camera tracking.
 */

window.Geo3DGlobe = class Geo3DGlobe {
    constructor(containerId, geoData, onCitySelect) {
        this.container = document.getElementById(containerId);
        this.data = geoData || window.GeoData;
        this.onCitySelect = onCitySelect;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.globeGroup = null;
        this.cloudsMesh = null;

        this.cityPins = {};
        this.activeArc = null;
        this.planeMesh = null;
        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };

        this.init();
    }

    init() {
        if (!this.container) return;

        const width = this.container.clientWidth || 600;
        const height = this.container.clientHeight || 400;

        if (typeof THREE === 'undefined') {
            console.warn('Three.js not loaded, using fallback.');
            this.init2DFallback(width, height);
            return;
        }

        // 1. Scene & Camera
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.z = 270;

        // 2. Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        // 3. Globe Master Group
        this.globeGroup = new THREE.Group();
        this.scene.add(this.globeGroup);

        // 4. Geographically Accurate Real Earth Texture Canvas
        const earthCanvas = this.createAccurateEarthTextureCanvas();
        const earthTexture = new THREE.CanvasTexture(earthCanvas);

        const sphereGeo = new THREE.SphereGeometry(80, 64, 64);
        const earthMat = new THREE.MeshPhongMaterial({
            map: earthTexture,
            shininess: 25,
            specular: new THREE.Color(0x0284c7)
        });

        const earthMesh = new THREE.Mesh(sphereGeo, earthMat);
        this.globeGroup.add(earthMesh);

        // Load 8K High-Res Local Satellite Texture from earth/textures/Material.002_diffuse.jpeg
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load('earth/textures/Material.002_diffuse.jpeg', (diffuseTex) => {
            diffuseTex.anisotropy = 8;
            earthMesh.material.map = diffuseTex;
            earthMesh.material.needsUpdate = true;
        }, undefined, (err) => {
            console.log('Using procedural canvas Earth texture fallback.');
        });

        // Load 3D Earth Model scene.gltf from local earth/ directory
        const GLTF = THREE.GLTFLoader || (window.THREE && window.THREE.GLTFLoader);
        if (GLTF) {
            const gltfLoader = new GLTF();
            gltfLoader.load('earth/scene.gltf', (gltf) => {
                const model = gltf.scene;
                const box = new THREE.Box3().setFromObject(model);
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                if (maxDim > 0) {
                    const scale = 160 / maxDim; // Scale to radius 80
                    model.scale.set(scale, scale, scale);
                }
                model.traverse(child => {
                    if (child.isMesh && child.material) {
                        child.material.side = THREE.DoubleSide;
                        child.material.needsUpdate = true;
                    }
                });
                this.globeGroup.add(model);
                earthMesh.visible = false;
            }, undefined, (err) => {
                console.log('Loaded Earth texture map on sphere geometry.');
            });
        }

        // 5. Rotating Cloud Sphere
        const cloudCanvas = this.createCloudsTextureCanvas();
        const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
        const cloudGeo = new THREE.SphereGeometry(81.5, 64, 64);
        const cloudMat = new THREE.MeshPhongMaterial({
            map: cloudTexture,
            transparent: true,
            opacity: 0.35,
            blending: THREE.AdditiveBlending
        });

        this.cloudsMesh = new THREE.Mesh(cloudGeo, cloudMat);
        this.globeGroup.add(this.cloudsMesh);

        // 6. Atmosphere Outer Glow Shell
        const atmosphereGeo = new THREE.SphereGeometry(83.5, 64, 64);
        const atmosphereMat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.18,
            side: THREE.BackSide
        });
        const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
        this.globeGroup.add(atmosphereMesh);

        // 7. Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
        this.scene.add(ambientLight);

        const sunLight = new THREE.DirectionalLight(0xffffff, 1.1);
        sunLight.position.set(250, 120, 200);
        this.scene.add(sunLight);

        const rimLight = new THREE.DirectionalLight(0xf59e0b, 0.4);
        rimLight.position.set(-200, -100, -150);
        this.scene.add(rimLight);

        // 8. Create 3D City Pins
        this.createCityPins();

        // 9. Controls & Mouse Events
        this.setupMouseEvents();

        // 10. Animation Loop
        this.animate();

        window.addEventListener('resize', () => this.onWindowResize());
    }

    createAccurateEarthTextureCanvas() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        const W = canvas.width;
        const H = canvas.height;

        const oceanGrad = ctx.createLinearGradient(0, 0, 0, H);
        oceanGrad.addColorStop(0, '#041026');
        oceanGrad.addColorStop(0.5, '#0a2342');
        oceanGrad.addColorStop(1, '#041026');
        ctx.fillStyle = oceanGrad;
        ctx.fillRect(0, 0, W, H);

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
        ctx.lineWidth = 1;
        for (let x = 0; x < W; x += 64) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
        }
        for (let y = 0; y < H; y += 64) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        }

        const toCanvas = (lat, lng) => {
            const x = (lng + 180) * (W / 360);
            const y = (90 - lat) * (H / 180);
            return [x, y];
        };

        const drawPolygon = (coords, fillColor = '#1b4332', strokeColor = '#2d6a4f') => {
            ctx.fillStyle = fillColor;
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            const first = toCanvas(coords[0][0], coords[0][1]);
            ctx.moveTo(first[0], first[1]);
            for (let i = 1; i < coords.length; i++) {
                const pt = toCanvas(coords[i][0], coords[i][1]);
                ctx.lineTo(pt[0], pt[1]);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        };

        // ACCURATE EQUIRECTANGULAR CONTINENT POLYGONS (Planet Earth)

        // North America
        drawPolygon([
            [70, -165], [72, -125], [60, -135], [58, -140], [55, -130],
            [48, -124], [38, -123], [32, -117], [23, -110], [16, -93],
            [15, -88], [9, -79], [8, -77], [10, -73], [15, -73],
            [21, -87], [25, -80], [30, -81], [25, -77], [35, -75],
            [41, -70], [45, -66], [47, -53], [52, -55], [58, -62],
            [62, -75], [66, -85], [70, -115], [70, -165]
        ]);

        // Greenland
        drawPolygon([ [83, -30], [80, -15], [70, -20], [60, -43], [65, -52], [77, -70], [83, -30] ], '#2d6a4f', '#40916c');

        // South America
        drawPolygon([
            [12, -73], [10, -62], [5, -52], [ -2, -44], [-5, -35],
            [-12, -37], [-23, -42], [-34, -53], [-45, -65], [-55, -67],
            [-52, -75], [-45, -74], [-33, -71], [-18, -70], [-5, -81], [8, -77], [12, -73]
        ]);

        // Europe
        drawPolygon([
            [71, 28], [70, 40], [60, 30], [55, 21], [54, 14],
            [47, 13], [44, 8], [43, 3], [37, -9], [36, -5],
            [43, -9], [48, -4], [50, 1], [53, 5], [54, 10],
            [60, 5], [63, 10], [60, 18], [65, 25], [71, 28]
        ]);

        drawPolygon([ [58, -5], [58, -1], [50, 1], [50, -5], [58, -5] ]);
        drawPolygon([ [55, -10], [55, -6], [51, -6], [51, -10], [55, -10] ]);
        drawPolygon([ [71, 25], [60, 30], [56, 16], [60, 12], [68, 14], [71, 25] ]);

        // Africa
        drawPolygon([ [37, 10], [35, 25], [31, 32], [30, 33], [22, 37],
            [12, 44], [11, 51], [2, 45], [-11, 40], [-25, 33],
            [-34, 26], [-34, 18], [-22, 14], [-12, 13], [5, 9],
            [4, -7], [6, -12], [15, -17], [21, -17], [32, -10], [37, 10]
        ]);
        drawPolygon([ [-12, 49], [-16, 50], [-25, 47], [-25, 44], [-14, 47], [-12, 49] ]);

        // Asia
        drawPolygon([
            [73, 70], [70, 130], [60, 170], [50, 140], [40, 140],
            [35, 120], [22, 114], [10, 105], [1, 104], [10, 98],
            [8, 77], [22, 70], [25, 62], [12, 44], [22, 37],
            [30, 33], [37, 36], [40, 48], [42, 60], [55, 60], [60, 70], [73, 70]
        ]);

        drawPolygon([ [45, 142], [40, 140], [35, 135], [31, 130], [35, 139], [45, 145], [45, 142] ]);
        drawPolygon([ [5, 115], [-5, 115], [-7, 106], [3, 98], [5, 115] ]);

        // Australia & NZ
        drawPolygon([ [-12, 130], [-12, 142], [-25, 153], [-38, 148], [-35, 117], [-20, 114], [-12, 130] ]);
        drawPolygon([ [-35, 173], [-46, 167], [-46, 170], [-37, 178], [-35, 173] ]);

        // Antarctica
        ctx.fillStyle = '#e2e8f0';
        ctx.strokeStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.fillRect(0, H - 40, W, 40);
        ctx.fill();

        return canvas;
    }

    createCloudsTextureCanvas() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        for (let i = 0; i < 40; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const r = 15 + Math.random() * 35;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }

        return canvas;
    }

    latLngToVector3(lat, lng, radius) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);

        const x = -(radius * Math.sin(phi) * Math.cos(theta));
        const z = (radius * Math.sin(phi) * Math.sin(theta));
        const y = (radius * Math.cos(phi));

        return new THREE.Vector3(x, y, z);
    }

    createCityPins() {
        if (!this.data.cities) return;

        this.data.cities.forEach(city => {
            const pos = this.latLngToVector3(city.lat, city.lng, 80);

            const pinGeo = new THREE.SphereGeometry(2.2, 16, 16);
            const pinMat = new THREE.MeshBasicMaterial({ color: 0x475569 });
            const pinMesh = new THREE.Mesh(pinGeo, pinMat);
            pinMesh.position.copy(pos);

            const ringGeo = new THREE.RingGeometry(2.8, 4.2, 32);
            const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.3 });
            const ringMesh = new THREE.Mesh(ringGeo, ringMat);
            ringMesh.position.copy(pos);
            ringMesh.lookAt(new THREE.Vector3(0, 0, 0));

            const pinGroup = new THREE.Group();
            pinGroup.add(pinMesh);
            pinGroup.add(ringMesh);
            pinGroup.userData = { city: city, pinMesh: pinMesh, ringMesh: ringMesh };

            this.globeGroup.add(pinGroup);
            this.cityPins[city.id] = pinGroup;
        });
    }

    updateCityPinHighlights(currentCityId, destinationCityIds = []) {
        if (!this.cityPins) return;

        // Draw multiple flight trajectory arcs to all available destinations
        if (currentCityId && destinationCityIds.length > 0) {
            this.drawDestinationArcs(currentCityId, destinationCityIds);
        }

        Object.keys(this.cityPins).forEach(cityId => {
            const pinGroup = this.cityPins[cityId];
            if (!pinGroup) return;

            const { pinMesh, ringMesh } = pinGroup.userData;
            const isCurrent = cityId === currentCityId;
            const isDestination = destinationCityIds.includes(cityId);

            if (isCurrent) {
                // Neon Green Pulse for Current Location (Departure)
                pinMesh.material.color.setHex(0x10b981);
                ringMesh.material.color.setHex(0x10b981);
                ringMesh.material.opacity = 0.95;
                pinGroup.scale.set(1.7, 1.7, 1.7);
            } else if (isDestination) {
                // Neon Pink & Cyan Target Reticle for Destination Cities
                pinMesh.material.color.setHex(0xec4899);
                ringMesh.material.color.setHex(0x06b6d4);
                ringMesh.material.opacity = 0.9;
                pinGroup.scale.set(1.4, 1.4, 1.4);
            } else {
                // Dimmed Slate Blue for Inactive Background Cities
                pinMesh.material.color.setHex(0x475569);
                ringMesh.material.color.setHex(0x334155);
                ringMesh.material.opacity = 0.25;
                pinGroup.scale.set(0.85, 0.85, 0.85);
            }
        });
    }

    drawDestinationArcs(fromCityId, destinationCityIds = []) {
        if (this.destinationArcsGroup) {
            this.globeGroup.remove(this.destinationArcsGroup);
        }
        this.destinationArcsGroup = new THREE.Group();
        this.globeGroup.add(this.destinationArcsGroup);

        destinationCityIds.forEach(destId => {
            const arc = this.createArcMesh(fromCityId, destId, 0x06b6d4);
            if (arc) this.destinationArcsGroup.add(arc);
        });
    }

    createArcMesh(fromCityId, toCityId, colorHex = 0xec4899) {
        const fromCity = this.data.cities.find(c => c.id === fromCityId);
        const toCity = this.data.cities.find(c => c.id === toCityId);
        if (!fromCity || !toCity || !THREE) return null;

        const p1 = this.latLngToVector3(fromCity.lat, fromCity.lng, 80);
        const p2 = this.latLngToVector3(toCity.lat, toCity.lng, 80);

        const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
        const distance = p1.distanceTo(p2);
        mid.setLength(80 + distance * 0.25);

        const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const material = new THREE.LineBasicMaterial({ color: colorHex, linewidth: 3, transparent: true, opacity: 0.85 });
        return new THREE.Line(geometry, material);
    }

    setupMouseEvents() {
        const dom = this.renderer.domElement;

        dom.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        dom.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            const deltaX = e.clientX - this.previousMousePosition.x;
            const deltaY = e.clientY - this.previousMousePosition.y;

            this.globeGroup.rotation.y += deltaX * 0.005;
            this.globeGroup.rotation.x += deltaY * 0.005;

            this.previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mouseup', () => {
            this.isDragging = false;
        });
    }

    flyToCity(cityId, onComplete) {
        const city = this.data.cities.find(c => c.id === cityId);
        if (!city || !this.globeGroup) return;

        const phi = (90 - city.lat) * (Math.PI / 180);
        const theta = (city.lng + 180) * (Math.PI / 180);

        const targetRotY = -theta + Math.PI / 2;
        const targetRotX = phi - Math.PI / 2;

        const startRotX = this.globeGroup.rotation.x;
        const startRotY = this.globeGroup.rotation.y;

        const startTime = Date.now();
        const duration = 1200;

        const animateFly = () => {
            const now = Date.now();
            const progress = Math.min(1, (now - startTime) / duration);
            const ease = 1 - Math.pow(1 - progress, 3);

            this.globeGroup.rotation.x = startRotX + (targetRotX - startRotX) * ease;
            this.globeGroup.rotation.y = startRotY + (targetRotY - startRotY) * ease;

            if (progress < 1) {
                requestAnimationFrame(animateFly);
            } else if (onComplete) {
                onComplete();
            }
        };

        animateFly();
    }

    /**
     * Cinematic 2.5-Second Airplane Flight Trajectory Animation
     */
    animateFlightTrajectory(fromCityId, toCityId, onComplete) {
        const fromCity = this.data.cities.find(c => c.id === fromCityId);
        const toCity = this.data.cities.find(c => c.id === toCityId);
        if (!fromCity || !toCity || !THREE) {
            if (onComplete) onComplete();
            return;
        }

        // Draw active arc line
        this.drawFlightArc(fromCityId, toCityId);

        // Create 3D Airplane Mesh
        if (this.planeMesh) {
            this.globeGroup.remove(this.planeMesh);
        }

        const planeGeo = new THREE.ConeGeometry(2.5, 6, 8);
        const planeMat = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.2 });
        this.planeMesh = new THREE.Mesh(planeGeo, planeMat);

        const p1 = this.latLngToVector3(fromCity.lat, fromCity.lng, 80);
        const p2 = this.latLngToVector3(toCity.lat, toCity.lng, 80);
        const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
        const distance = p1.distanceTo(p2);
        mid.setLength(80 + distance * 0.25);

        const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
        this.globeGroup.add(this.planeMesh);

        // Rotate globe towards destination
        this.flyToCity(toCityId);

        const duration = 2500; // 2.5 seconds
        const startTime = Date.now();

        const animatePlane = () => {
            const now = Date.now();
            const t = Math.min(1, (now - startTime) / duration);

            const pos = curve.getPoint(t);
            const tangent = curve.getTangent(t);

            this.planeMesh.position.copy(pos);
            this.planeMesh.lookAt(pos.clone().add(tangent));

            if (t < 1) {
                requestAnimationFrame(animatePlane);
            } else {
                if (this.planeMesh) {
                    this.globeGroup.remove(this.planeMesh);
                    this.planeMesh = null;
                }
                if (onComplete) onComplete();
            }
        };

        animatePlane();
    }

    drawFlightArc(fromCityId, toCityId) {
        const fromCity = this.data.cities.find(c => c.id === fromCityId);
        const toCity = this.data.cities.find(c => c.id === toCityId);
        if (!fromCity || !toCity || !THREE) return;

        if (this.activeArc) {
            this.globeGroup.remove(this.activeArc);
        }

        const p1 = this.latLngToVector3(fromCity.lat, fromCity.lng, 80);
        const p2 = this.latLngToVector3(toCity.lat, toCity.lng, 80);

        const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
        const distance = p1.distanceTo(p2);
        mid.setLength(80 + distance * 0.25);

        const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const material = new THREE.LineBasicMaterial({ color: 0xec4899, linewidth: 3 });
        this.activeArc = new THREE.Line(geometry, material);

        this.globeGroup.add(this.activeArc);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (!this.isDragging && this.globeGroup) {
            this.globeGroup.rotation.y += 0.0015;
            if (this.cloudsMesh) this.cloudsMesh.rotation.y += 0.0008;
        }

        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    onWindowResize() {
        if (!this.container || !this.renderer || !this.camera) return;
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    init2DFallback(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        this.container.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#041026';
        ctx.fillRect(0, 0, width, height);

        ctx.beginPath();
        ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = '#1b4332';
        ctx.fill();
        ctx.strokeStyle = '#2d6a4f';
        ctx.lineWidth = 3;
        ctx.stroke();
    }
};
