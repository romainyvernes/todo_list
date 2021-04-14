import { compareAsc } from 'date-fns'

const Task = (name, dueDate='', priority='', projectId='') => {
    name = name;
    dueDate = dueDate;
    priority = priority;
    projectId = projectId;
    let id = Date.now();

    return {name, dueDate, priority, projectId, id};
};

const taskModule = (() => {

    let tasks = [];

    const addTask = (task) => {
        tasks.push(task);
    };

    const getTasks = () => {
        return tasks;
    };

    const getTaskById = (taskId) => {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === taskId) {
                return tasks[i];
            }
        }
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

    const sortByDate = (tasks) => {
        return tasks.sort((task1, task2) => {
            if (task1.dueDate === '' || task2.dueDate === '') {
                if (task1.dueDate === '' && task2.dueDate === '') {
                    return 0;
                } else if (task1.dueDate === '') {
                    return 1;
                } else if (task2.dueDate === '') {
                    return -1;
                }
            }
            compareAsc(task1.dueDate, task2.dueDate);
        });
    };

    const sortByName = (tasks) => {
        return tasks.sort((task1, task2) => {
            const task1Name = task1.name.toUpperCase();
            const task2Name = task2.name.toUpperCase();

            if (task1Name < task2Name) return -1;
            if (task1Name > task2Name) return 1;

            return 0;
        });
    };

    return {addTask, getTasks, getTaskById, updateTask, deleteTask, sortByDate, 
            sortByName}
})();

export {Task, taskModule};