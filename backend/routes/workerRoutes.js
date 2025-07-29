const express = require('express');
const router = express.Router();
const {
  getAllWorkers,
  getWorkerById,
  createWorker,
  updateWorker,
  deleteWorker,
} = require('../controllers/workerControllers');

router.get('/', getAllWorkers);
router.get('/:id', getWorkerById);
router.post('/', createWorker);
router.put('/:id', updateWorker);
router.delete('/:id', deleteWorker);

module.exports = router;
