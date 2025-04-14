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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET /metrics/:id — return a list of 20 random time series points
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const now = new Date();
    const data = [];
    for (let i = 0; i < 20; i++) {
        const timestamp = new Date(now.getTime() - i * 1000);
        const power_watts = Math.random() > 0.1 ? 100 + Math.random() * 50 : 0;
        const status = power_watts === 0 ? 'fault' : 'normal';
        data.unshift({ timestamp, power_watts, status });
    }
    res.json(data);
}));
// GET /metrics/:id/live — return a single latest data point
router.get('/:id/live', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const timestamp = new Date();
    const power_watts = Math.random() > 0.1 ? 100 + Math.random() * 50 : 0;
    const status = power_watts === 0 ? 'fault' : 'normal';
    res.json({ timestamp, power_watts, status });
}));
exports.default = router;
