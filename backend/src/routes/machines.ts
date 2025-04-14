import express, { Request, RequestHandler, Response } from 'express';
import { pool } from '../db';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

const router = express.Router();

// ➕ Create machine
router.post('/', async (req: Request, res: Response) => {
  const id = uuidv4();
  const name = req.body.name;

  try {
    await pool.query('INSERT INTO machines (id, name) VALUES ($1, $2)', [id, name]);
    res.status(201).json({ id, name });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create machine');
  }
});

// 📖 Read all machines
router.get('/', async (_req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM machines');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch machines');
  }
});

const getMachineById: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;

  if (!uuidValidate(id)) {
    res.status(400).json({ error: 'Invalid machine ID format' });
    return;
  }

  try {
    const { rows } = await pool.query('SELECT * FROM machines WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Machine not found' });
      return;
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(`Error fetching machine ${id}:`, err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

router.get('/:id', getMachineById);

// 📝 Update machine
router.put('/:id', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    await pool.query('UPDATE machines SET name = $1 WHERE id = $2', [name, id]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to update machine');
  }
});

// ❌ Delete machine
router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  try {
    // First delete metrics
    await pool.query('DELETE FROM machine_readings WHERE machine_id = $1', [id]);

    // Then delete the machine
    const result = await pool.query('DELETE FROM machines WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Machine not found' });
      return;
    }

    res.sendStatus(204); // success
  } catch (err) {
    console.error(`Error deleting machine ${id}:`, err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
