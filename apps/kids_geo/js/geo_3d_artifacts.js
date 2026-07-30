/**
 * Kids Geo Arcade - Three.js 3D Artifact Showcase Stage
 * Renders interactive 360° rotating 3D models for Bushbuck items & Carmen Sandiego artifacts.
 */

window.Geo3DArtifacts = class Geo3DArtifacts {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.currentMeshGroup = null;

        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };

        this.init();
    }

    init() {
        if (!this.container || typeof THREE === 'undefined') return;

        const width = this.container.clientWidth || 300;
        const height = this.container.clientHeight || 300;

        // 1. Scene & Camera
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.z = 15;

        // 2. Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        // 3. Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xf59e0b, 1.5, 100);
        pointLight.position.set(10, 10, 10);
        this.scene.add(pointLight);

        // 4. Mouse Rotation Listeners
        const dom = this.renderer.domElement;
        dom.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        dom.addEventListener('mousemove', (e) => {
            if (!this.isDragging || !this.currentMeshGroup) return;
            const deltaX = e.clientX - this.previousMousePosition.x;
            const deltaY = e.clientY - this.previousMousePosition.y;

            this.currentMeshGroup.rotation.y += deltaX * 0.01;
            this.currentMeshGroup.rotation.x += deltaY * 0.01;

            this.previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mouseup', () => {
            this.isDragging = false;
        });

        // 5. Animation Loop
        this.animate();
    }

    renderArtifact(itemId) {
        if (!this.scene || typeof THREE === 'undefined') return;

        if (this.currentMeshGroup) {
            this.scene.remove(this.currentMeshGroup);
        }

        this.currentMeshGroup = new THREE.Group();

        switch (itemId) {
            case 'viking_ship':
                this.build3DVikingShip(this.currentMeshGroup);
                break;
            case 'dodo_egg':
                this.build3DDodoEgg(this.currentMeshGroup);
                break;
            case 'scarab_charm':
                this.build3DScarab(this.currentMeshGroup);
                break;
            case 'jade_dragon':
                this.build3DJadeDragon(this.currentMeshGroup);
                break;
            case 'tiki_talisman':
                this.build3DTikiTalisman(this.currentMeshGroup);
                break;
            default:
                this.build3DGenericArtifact(this.currentMeshGroup);
                break;
        }

        this.scene.add(this.currentMeshGroup);
    }

    build3DVikingShip(group) {
        // Hull
        const hullGeo = new THREE.ConeGeometry(2, 6, 8);
        const hullMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.4 });
        const hullMesh = new THREE.Mesh(hullGeo, hullMat);
        hullMesh.rotation.z = Math.PI / 2;
        group.add(hullMesh);

        // Mast
        const mastGeo = new THREE.CylinderGeometry(0.1, 0.1, 4.5);
        const mastMat = new THREE.MeshStandardMaterial({ color: 0x451a03 });
        const mastMesh = new THREE.Mesh(mastGeo, mastMat);
        mastMesh.position.y = 2;
        group.add(mastMesh);

        // Crimson Sail
        const sailGeo = new THREE.PlaneGeometry(3, 2.5);
        const sailMat = new THREE.MeshStandardMaterial({ color: 0xd97706, side: THREE.DoubleSide });
        const sailMesh = new THREE.Mesh(sailGeo, sailMat);
        sailMesh.position.y = 2.2;
        group.add(sailMesh);
    }

    build3DDodoEgg(group) {
        const eggGeo = new THREE.SphereGeometry(2.5, 32, 32);
        eggGeo.scale(1, 1.35, 1); // Oval egg shape

        const eggMat = new THREE.MeshStandardMaterial({
            color: 0x10b981,
            metalness: 0.2,
            roughness: 0.1
        });
        const eggMesh = new THREE.Mesh(eggGeo, eggMat);
        group.add(eggMesh);
    }

    build3DScarab(group) {
        const bodyGeo = new THREE.CylinderGeometry(1.8, 2.2, 1, 16);
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.2 });
        const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
        group.add(bodyMesh);

        const gemGeo = new THREE.SphereGeometry(1.2, 16, 16);
        const gemMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.9, roughness: 0.1 });
        const gemMesh = new THREE.Mesh(gemGeo, gemMat);
        gemMesh.position.y = 0.6;
        group.add(gemMesh);
    }

    build3DJadeDragon(group) {
        const dragonGeo = new THREE.TorusKnotGeometry(1.8, 0.5, 64, 8);
        const dragonMat = new THREE.MeshStandardMaterial({ color: 0x059669, metalness: 0.5, roughness: 0.2 });
        const dragonMesh = new THREE.Mesh(dragonGeo, dragonMat);
        group.add(dragonMesh);
    }

    build3DTikiTalisman(group) {
        const totemGeo = new THREE.BoxGeometry(2, 4.5, 2);
        const totemMat = new THREE.MeshStandardMaterial({ color: 0x374151, roughness: 0.7 });
        const totemMesh = new THREE.Mesh(totemGeo, totemMat);
        group.add(totemMesh);
    }

    build3DGenericArtifact(group) {
        const geo = new THREE.IcosahedronGeometry(2.2, 1);
        const mat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.5, roughness: 0.2 });
        group.add(new THREE.Mesh(geo, mat));
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.currentMeshGroup && !this.isDragging) {
            this.currentMeshGroup.rotation.y += 0.01; // Auto spin
        }

        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
};
