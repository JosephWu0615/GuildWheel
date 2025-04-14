"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateReading = simulateReading;
const db_1 = require("./db");
function simulateReading(machine_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const power = Math.random() > 0.1 ? 100 + Math.random() * 50 : 0;
        const status = power === 0 ? 'fault' : 'normal';
        yield db_1.pool.query('INSERT INTO machine_readings (machine_id, timestamp, power_watts, status) VALUES ($1, NOW(), $2, $3)', [machine_id, power, status]);
    });
}
