const express = require('express');
const router = express.Router();
const { getAllTasks,createTask, getTask, updateTask, deletaTask, editTask } = require('../controllers/tasks');


//  #first approach
// router.get('/',  (req, res) => {
//     return res.send('create task api')
// })
// router.get('/:id', (req, res) => {
//     return res.send('get single task api')
// })

// # second approach
// router.route('/').get(getAllTasks)
// router.route('/').post(createTask)
// router.route('/:id').get(getTask)
// router.route('/:id').patch(updateTask)
// router.route('/id').delete(deletaTask)

// # third approach
router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deletaTask).put(editTask)

module.exports = router