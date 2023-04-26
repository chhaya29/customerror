const taskModel = require('../models/task')
const asyncWrapper = require('../middleware/asyncWrapper');
const createCustomError = require('../errors/customError')

// without asyncWrapper
const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find({});
        return res.status(200).json({ tasks })
    }
    catch (error) {
        return res.status(500).json({ error })
    }
}

// with asyncWrapper
const getTask = asyncWrapper (async (req, res, next) => {
   
        const { id: taskID } = req.params
        const task = await taskModel.findOne({ _id: taskID });
        if (!task) {
            // first method without next inline
            //return res.status(404).json({ message: `no task present for given id ${taskID}` })
            
            // two second method with custom errorHandlerMiddlerware with next 
            // const error = new Error(`no task present for given id ${taskID}`)
            // error.status = 404
            // return  next(error)

            // third method with customError class
            return next(createCustomError(`no task present for given id ${taskID}`, 404))

        }
        return res.status(200).json({ task })
})

// without asyncWrapper passing error to express error handler
const createTask = async (req, res, next) => {
    try {
        const task = await taskModel.create(req.body);
        return res.status(200).json({ task })
    }
    catch (error) {
        next(error)
        //return res.status(500).json({ error })
    }
}

const deletaTask = asyncWrapper(async (req, res) => {
   
        const { id: taskID } = req.params
        const task = await taskModel.findOneAndDelete({ _id: taskID });
        if (!task) {
            return res.status(404).json({ message: `no task present for given id ${taskID}` })
        }
        return res.status(200).json({ task })
})

// patch method
const updateTask = asyncWrapper(async (req, res) => {
   
        const { id: taskID } = req.params
        const task = await taskModel.findOneAndUpdate(
            { _id: taskID },
            req.body,
            {
                new: true,  // this will return updated data
                runValidators: true
            });
        if (!task) {
            return res.status(404).json({ message: `no task present for given id ${taskID}` })
        }
        return res.status(200).json({ task })
    
})

// put method
const editTask = asyncWrapper(async (req, res) => {
 
        const { id: taskID } = req.params
        const task = await taskModel.findOneAndUpdate(
            { _id: taskID },
            req.body,
            {
                new: true,  // this will return updated data
                runValidators: true,
                overwrite: true
            });
        if (!task) {
            return res.status(404).json({ message: `no task present for given id ${taskID}` })
        }
        return res.status(200).json({ task })
    
})

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deletaTask, editTask
}