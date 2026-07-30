/**
 * Bushbuck Engine ("Bushbuck: Charms, Viking Ships & Dodo Eggs")
 * Globetrotting quest engine to fly around world cities collecting Viking Ships, Dodo Eggs, and Charms.
 */

window.BushbuckEngine = class BushbuckEngine {
    constructor(geoData) {
        this.data = geoData || window.GeoData;
        this.state = null;
    }

    startNewGame() {
        const cities = this.data.cities;
        const items = this.data.bushbuckItems;

        // Distribute items across cities
        const cityItemMap = {};

        // Guarantee at least 2 Viking ships, 2 Dodo Eggs, and 3 Charms spawn across cities
        const itemPool = [
            items.find(i => i.id === 'viking_ship'),
            items.find(i => i.id === 'viking_ship'),
            items.find(i => i.id === 'dodo_egg'),
            items.find(i => i.id === 'dodo_egg'),
            items.find(i => i.id === 'scarab_charm'),
            items.find(i => i.id === 'jade_dragon'),
            items.find(i => i.id === 'tiki_talisman'),
            items.find(i => i.id === 'inca_sun_charm')
        ];

        const shuffledCities = [...cities].sort(() => 0.5 - Math.random());

        itemPool.forEach((item, idx) => {
            if (shuffledCities[idx]) {
                cityItemMap[shuffledCities[idx].id] = { ...item, instanceId: item.id + '_' + idx };
            }
        });

        this.state = {
            currentCity: cities.find(c => c.id === 'london') || cities[0],
            fuel: 6000, // Miles/Fuel budget
            inventory: [],
            cityItemMap: cityItemMap,
            searchedCities: {},
            activeContracts: [...this.data.bushbuckContracts],
            completedContracts: [],
            score: 0,
            status: 'PLAYING' // 'PLAYING', 'OUT_OF_FUEL', 'CONTRACTS_COMPLETE'
        };

        return this.state;
    }

    getCurrentCity() {
        return this.state ? this.state.currentCity : null;
    }

    flyToCity(targetCityId) {
        if (!this.state || this.state.status !== 'PLAYING') return null;

        const target = this.data.cities.find(c => c.id === targetCityId);
        if (!target) return null;

        const distance = this.calculateDistance(this.state.currentCity, target);

        if (this.state.fuel < distance) {
            return {
                success: false,
                reason: 'NOT_ENOUGH_FUEL',
                requiredFuel: distance,
                currentFuel: this.state.fuel,
                message: `Not enough fuel! You need ${distance} fuel miles to reach ${target.name}, but only have ${this.state.fuel}.`
            };
        }

        this.state.fuel -= distance;
        this.state.currentCity = target;

        if (this.state.fuel <= 0) {
            this.state.status = 'OUT_OF_FUEL';
        }

        return {
            success: true,
            currentCity: target,
            distanceSpent: distance,
            fuelLeft: this.state.fuel
        };
    }

    searchCitySite(siteName) {
        if (!this.state || this.state.status !== 'PLAYING') return null;

        const cityId = this.state.currentCity.id;
        const itemAtCity = this.state.cityItemMap[cityId];

        this.state.searchedCities[cityId] = true;

        if (itemAtCity) {
            // Player found an item!
            this.state.inventory.push(itemAtCity);
            delete this.state.cityItemMap[cityId]; // Remove from world
            this.state.score += itemAtCity.points;

            return {
                found: true,
                item: itemAtCity,
                message: `🎉 ASTONISHING FIND! In the ${siteName} of ${this.state.currentCity.name}, you discovered a genuine ${itemAtCity.name} (${itemAtCity.icon})!`
            };
        } else {
            // Give regional clue where items of category might be
            const uncollectedItems = Object.values(this.state.cityItemMap);
            let hint = "The local vendor has not seen any Viking ships or Dodo eggs in this port.";

            if (uncollectedItems.length > 0) {
                const randomItem = uncollectedItems[Math.floor(Math.random() * uncollectedItems.length)];
                const targetCity = this.data.cities.find(c => c.id === this.getCityForItem(randomItem.instanceId));
                if (targetCity) {
                    hint = `A local merchant whispers: "I heard rumors of a ${randomItem.name} (${randomItem.icon}) hidden somewhere in ${targetCity.continent} near ${targetCity.country}!"`;
                }
            }

            return {
                found: false,
                hint: hint,
                message: `You searched the ${siteName} of ${this.state.currentCity.name}. ${hint}`
            };
        }
    }

    getCityForItem(instanceId) {
        for (const [cId, item] of Object.entries(this.state.cityItemMap)) {
            if (item.instanceId === instanceId) return cId;
        }
        return null;
    }

    turnInContract(contractId) {
        if (!this.state) return null;

        const contract = this.state.activeContracts.find(c => c.id === contractId);
        if (!contract) return null;

        // Check if inventory meets contract requirements
        const canFulfill = contract.requiredItems.every(req => {
            const countInInv = this.state.inventory.filter(item => item.id === req.id).length;
            return countInInv >= req.qty;
        });

        if (!canFulfill) {
            return {
                success: false,
                message: "You do not have all the required items in your Explorer Bag yet!"
            };
        }

        // Remove required items from inventory
        contract.requiredItems.forEach(req => {
            for (let i = 0; i < req.qty; i++) {
                const idx = this.state.inventory.findIndex(item => item.id === req.id);
                if (idx !== -1) {
                    this.state.inventory.splice(idx, 1);
                }
            }
        });

        // Award fuel and score
        this.state.fuel += contract.rewardFuel;
        this.state.score += contract.rewardXP;
        this.state.completedContracts.push(contract);
        this.state.activeContracts = this.state.activeContracts.filter(c => c.id !== contractId);

        if (this.state.activeContracts.length === 0) {
            this.state.status = 'CONTRACTS_COMPLETE';
        }

        return {
            success: true,
            contract: contract,
            bonusFuel: contract.rewardFuel,
            rewardXP: contract.rewardXP,
            fuelLeft: this.state.fuel,
            score: this.state.score,
            message: `🏆 CONTRACT FULFILLED! You turned in the contract requirements to HQ and earned +${contract.rewardFuel} fuel miles and +${contract.rewardXP} XP!`
        };
    }

    calculateDistance(c1, c2) {
        const R = 3958.8; // Miles
        const dLat = (c2.lat - c1.lat) * Math.PI / 180;
        const dLng = (c2.lng - c1.lng) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(c1.lat * Math.PI / 180) * Math.cos(c2.lat * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c);
    }
};
