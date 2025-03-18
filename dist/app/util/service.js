"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Service {
    constructor() {
        this.instance = null;
        if (!this.instance)
            this.instance = new Service();
        return this.instance;
    }
}
exports.default = Service;
