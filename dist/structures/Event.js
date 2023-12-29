"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEvent = void 0;
class BaseEvent {
    constructor(data) {
        this.name = data.name;
        this.description = data.description;
        this.once = data.once ?? false;
        this.listener = data.listener;
    }
}
exports.BaseEvent = BaseEvent;
