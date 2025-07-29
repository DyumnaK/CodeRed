const pool = require('../config/db');

const getAllJobs = async (req, res) => {
  try {
    const [jobs] = await pool.query('SELECT * FROM jobs');
    res.json(jobs);
  } catch (error) {
    console.error('Get all jobs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const [jobs] = await pool.query('SELECT * FROM jobs WHERE id = ?', [id]);
    if (jobs.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(jobs[0]);
  } catch (error) {
    console.error('Get job by id error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createJob = async (req, res) => {
  const { title, description, location } = req.body;
  if (!title || !description || !location) {
    return res.status(400).json({ message: 'Please provide title, description and location' });
  }
  try {
    const [result] = await pool.query('INSERT INTO jobs (title, description, location) VALUES (?, ?, ?)', [title, description, location]);
    res.status(201).json({ id: result.insertId, title, description, location });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  const { title, description, location } = req.body;
  try {
    const [result] = await pool.query('UPDATE jobs SET title = ?, description = ?, location = ? WHERE id = ?', [title, description, location, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ id, title, description, location });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM jobs WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
