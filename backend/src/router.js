const express = require('express');
const router = express.Router();
const tasksController = require('./controllers/tasksController');
const tasksMiddleware = require('./middlewares/tasksMiddleware');

router.get('/tasks', tasksController.getAll);
router.post('/tasks', tasksMiddleware.validateFieldTitle, tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id',
    tasksMiddleware.validateFieldTitle,
    tasksMiddleware.validateFieldStatus,
    tasksController.updateTask
);

router.put('/tecnico/:id',
    tasksMiddleware.validateFieldTitle,
    tasksMiddleware.validateFieldTecnico,
    tasksController.updateTecnico
);

router.put('/date/:id',
    tasksMiddleware.validateFieldTitle,
    tasksMiddleware.validateFieldDate,
    tasksController.updateDate
);

module.exports = router;
