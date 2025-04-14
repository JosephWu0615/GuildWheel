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
const db_1 = require("../db");
const uuid_1 = require("uuid");
const router = express_1.default.Router();
// ➕ Create machine
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    const name = req.body.name;
    try {
        yield db_1.pool.query('INSERT INTO machines (id, name) VALUES ($1, $2)', [id, name]);
        res.status(201).json({ id, name });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Failed to create machine');
    }
}));
// 📖 Read all machines
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield db_1.pool.query('SELECT * FROM machines');
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch machines');
    }
}));
const getMachineById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, uuid_1.validate)(id)) {
        res.status(400).json({ error: 'Invalid machine ID format' });
        return;
    }
    try {
        const { rows } = yield db_1.pool.query('SELECT * FROM machines WHERE id = $1', [id]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Machine not found' });
            return;
        }
        res.json(rows[0]);
    }
    catch (err) {
        console.error(`Error fetching machine ${id}:`, err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/:id', getMachineById);
// 📝 Update machine
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    try {
        yield db_1.pool.query('UPDATE machines SET name = $1 WHERE id = $2', [name, id]);
        res.sendStatus(204);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Failed to update machine');
    }
}));
// ❌ Delete machine
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // First delete metrics
        yield db_1.pool.query('DELETE FROM machine_readings WHERE machine_id = $1', [id]);
        // Then delete the machine
        const result = yield db_1.pool.query('DELETE FROM machines WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Machine not found' });
            return;
        }
        res.sendStatus(204); // success
    }
    catch (err) {
        console.error(`Error deleting machine ${id}:`, err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
