class CustomStorage {
    constructor() {
        this.store = JSON.parse(localStorage.getItem('customStorage')) || {};
    }

    setItem(key, value) {
        this.store[key] = String(value);
        localStorage.setItem('customStorage', JSON.stringify(this.store));
    }

    getItem(key) {
        return this.store[key] || null;
    }

    removeItem(key) {
        delete this.store[key];
        localStorage.setItem('customStorage', JSON.stringify(this.store));
    }

    clear() {
        this.store = {};
        localStorage.removeItem('customStorage');
    }

    key(index) {
        return Object.keys(this.store)[index] || null;
    }

    get length() {
        return Object.keys(this.store).length;
    }
}

export const myStorage = new CustomStorage();
