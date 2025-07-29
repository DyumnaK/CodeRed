const pool = require('../config/db');

const getAllWorkers = async (req, res) => {
  try {
    const [workers] = await pool.query('SELECT * FROM workers');
    res.json(workers);
  } catch (error) {
    console.error('Get all workers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getWorkerById = async (req, res) => {
  const { id } = req.params;
  try {
    const [workers] = await pool.query('SELECT * FROM workers WHERE id = ?', [id]);
    if (workers.length === 0) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.json(workers[0]);
  } catch (error) {
    console.error('Get worker by id error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createWorker = async (req, res) => {
  const { name, skill, experience } = req.body;
  if (!name || !skill || !experience) {
    return res.status(400).json({ message: 'Please provide name, skill and experience' });
  }
  try {
    const [result] = await pool.query('INSERT INTO workers (name, skill, experience) VALUES (?, ?, ?)', [name, skill, experience]);
    res.status(201).json({ id: result.insertId, name, skill, experience });
  } catch (error) {
    console.error('Create worker error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateWorker = async (req, res) => {
  const { id } = req.params;
  const { name, skill, experience } = req.body;
  try {
    const [result] = await pool.query('UPDATE workers SET name = ?, skill = ?, experience = ? WHERE id = ?', [name, skill, experience, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.json({ id, name, skill, experience });
  } catch (error) {
    console.error('Update worker error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteWorker = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM workers WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.json({ message: 'Worker deleted' });
  } catch (error) {
    console.error('Delete worker error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllWorkers,
  getWorkerById,
  createWorker,
  updateWorker,
  deleteWorker,
};
