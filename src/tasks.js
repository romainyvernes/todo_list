const Task = (name) => {
    name = name;
    let dueDate = '';
    let priority = '';
    let projectId = '';
    let notes = '';
    let id = new Date().getUTCMilliseconds();

    return {name, dueDate, priority, projectId, notes, id};
};

const taskModule = (() => {

    let tasks = [];

    const addTask = (task) => {
        tasks.push(task);
    };

    const getTasks = () => {
        return tasks;
    };

    const updateTask = (updatedTask) => {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === updatedTask.id) {
                tasks.splice(i, 1, updatedTask);
                return;
            }
        }
    }

    const deleteTask = (taskId) => {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === taskId) {
                tasks.splice(i, 1);
                return;
            }
        }
    }

    return {addTask, getTasks, updateTask, deleteTask}
})();

export {Task, taskModule};