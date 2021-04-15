import { Project, projectModule } from './projects';
import { Task, taskModule } from './tasks';
import display from './display';
import { addDays, isWithinInterval, parseISO, parseJSON } from 'date-fns';
import { EventListener } from './events';

const app = (() => {

    const renderMain = (target) => {
        display.renderMain(target);
    };

    const renderCategories = (target) => {
        const CATEGORIES = [
            {label: 'All tasks', icon1Class: 'fas fa-inbox'},
            {label: 'Today', icon1Class: 'fas fa-calendar-day'},
            {label: 'Next 7 days', icon1Class: 'fas fa-calendar-week'}
        ];
        display.populateSideBar(target, CATEGORIES);
    };

    const renderProjects = (target) => {
        const projects = projectModule.sortByName(projectModule.getProjects());
        let projectArray = [];
        
        if (projects.length > 0) {
            projects.map(project => {
                const projectObj = {
                    label: project.name, 
                    icon1Class: 'fas fa-folder-open',
                    icon2Class: 'fas fa-trash-alt',
                    projectId: project.id
                };
                projectArray.push(projectObj);
            });

            display.populateSideBar(target, projectArray);
        }
    };

    const renderAllTasks = (target) => {
        const sortedProjects = projectModule.sortByName(projectModule.getProjects());
        const sortedTasks = taskModule.sortByDate(taskModule.getTasks());
        const label = document.querySelectorAll('#category-btns span')[0].textContent;
        display.renderContentArea(target, sortedProjects, sortedTasks, label);
    };

    const filterTasksByTimespan = (tasks, startDate, endDate) => {
        const timespan = {start: startDate, end: endDate};
        
        const filteredTasks = tasks.filter(task => {
            if (task.dueDate !== '' && isWithinInterval(task.dueDate, timespan)) {
                return true;
            }
            return false;
        });

        return filteredTasks;
    };

    const renderByTimespan = (target, startDate, endDate, title) => {
        const tasks = filterTasksByTimespan(taskModule.getTasks(), startDate, 
                endDate);
        const projects = tasks
                .reduce((arr, task) => {
                    arr.push(task.projectId);
                    return arr;
                }, [])
                .filter((projectId, index, self) => self.indexOf(projectId) === index)
                .reduce((arr, projectId) => {
                    const project = projectModule.getProjectById(projectId);
                    arr.push(project);
                    return arr;
                }, []);
        display.renderContentArea(target, projects, tasks, title);
    };

    const renderToday = (target) => {
        const startDate = new Date().setHours(0, 0, 0, 0);
        const endDate = new Date().setHours(23, 59, 59, 999);
        const label = document.querySelectorAll('#category-btns span')[1].textContent;
        renderByTimespan(target, startDate, endDate, label);
    };

    const renderWeek = (target) => {
        const startDate = new Date().setHours(0, 0, 0, 0);
        const endDate = addDays(startDate, 6).setHours(23, 59, 59, 999);
        const label = document.querySelectorAll('#category-btns span')[2].textContent;
        renderByTimespan(target, startDate, endDate, label);
    };

    const renderProjectById = (target, projectId) => {
        const project = [projectModule.getProjectById(projectId)];
        let tasks = project[0].taskIds.reduce((arr, taskId) => {
            const task = taskModule.getTaskById(taskId);
            arr.push(task);
            return arr;
        }, []);
        tasks = taskModule.sortByDate(tasks);
        display.renderContentArea(target, project, tasks);
    };

    const addProject = () => {
        const contentContainer = document.getElementById('content-area');
        const projectsContainer = document.getElementById('projects');
        const inputField = document.querySelector('#add-project-input input');

        if (inputField.value === '') return;
        
        const newProject = Project(inputField.value);
        projectModule.addProject(newProject);
        
        inputField.value = '';
        
        display.hideProjectInput();
        display.showAddProjectBtn();
        
        display.clearContainer(projectsContainer);
        renderProjects(projectsContainer);
        createProjectEvents();
        createDeleteProjectEvent();

        display.clearContainer(contentContainer);
        renderProjectById(contentContainer, newProject.id);
        createAddTaskEvent();
        createUpdateTaskEvent();
        createDeleteTaskEvent();

        storeData();
    };

    const deleteProject = (projectId) => {
        const projectToDelete = projectModule.getProjectById(projectId);
        projectToDelete.taskIds.map(id => taskModule.deleteTask(id));
        projectModule.deleteProject(projectId);
        storeData();
    };

    const cancelAddProject = () => {
        const inputField = document.querySelector('#add-project-input input');
        inputField.value = '';
        display.hideProjectInput();
        display.showAddProjectBtn();
    };

    const collectTaskData = (projectId) => {
        const name = document.getElementById('new-task-name').value;

        if (name === '') return;
        
        let date = document.getElementById('new-task-due-date').value;
        if (date !== '') date = parseISO(date);
        
        const priorityFlags = document.querySelectorAll(
            '#new-task-priority-wrapper input[type="radio"]');
        let selectedPriority;
        for (let i = 0; i < priorityFlags.length; i++) {
            if (priorityFlags[i].checked) {
                selectedPriority = priorityFlags[i].value;
            }
        }

        const newTask = Task(name, date, selectedPriority, projectId);

        return newTask; 
    };

    const addTask = () => {
        const addTaskWrapper = document.getElementById('new-task-container');
        const projectId = parseInt(addTaskWrapper.dataset.projectId);
        
        const newTask = collectTaskData(projectId);
        if (!newTask) return;
        
        const listWrapper = document.querySelector(
            `#content-area ul[data-project-id="${projectId}"]`);
        
        taskModule.addTask(newTask);
        
        const project = projectModule.getProjectById(projectId);
        project.taskIds.push(newTask.id);
        projectModule.updateProject(project);
        
        const newTasksList = taskModule.sortByDate(project.taskIds.reduce((arr, id) => {
            arr.push(taskModule.getTaskById(id));
            return arr;
        }, []));

        display.clearContainer(listWrapper);
        display.deleteElement(addTaskWrapper);

        display.renderTaskList(listWrapper, newTasksList);
        storeData();
    };

    const updateTask = () => {
        const editTaskWrapper = document.getElementById('edit-task-container');
        const taskId = parseInt(editTaskWrapper.dataset.taskId);
        const projectId = taskModule.getTaskById(taskId).projectId;

        const updatedTask = collectTaskData(projectId);
        updatedTask.id = taskId;
        
        taskModule.updateTask(updatedTask);
        
        display.clearContainer(editTaskWrapper);
        display.renderTask(editTaskWrapper, updatedTask);
        storeData();
    };

    const createUpdateTask = (target) => {
        const taskId = parseInt(target.dataset.taskId);
        const taskToUpdate = taskModule.getTaskById(taskId);
        
        display.clearContainer(target);

        display.renderNewTask(target, taskToUpdate);
    };

    const deleteTask = (taskId) => {
        const taskToDelete = taskModule.getTaskById(taskId);
        const projectToUpdate = projectModule.getProjectById(
            taskToDelete.projectId);

        for (let i = 0; i < projectToUpdate.taskIds.length; i++) {
            if (projectToUpdate.taskIds[i] === taskId) {
                projectToUpdate.taskIds.splice(i, 1);
                break;
            }
        }
        
        projectModule.updateProject(projectToUpdate);
        taskModule.deleteTask(taskId);
        storeData();
    };

    const cancelEditAddTask = () => {
        const editTaskWrapper = document.getElementById('edit-task-container');
        const taskId = parseInt(editTaskWrapper.dataset.taskId);
        const task = taskModule.getTaskById(taskId);

        display.clearContainer(editTaskWrapper);
        display.renderTask(editTaskWrapper, task);
    };
    
    // links each category button (all tasks, today, next 7 days) to its
    // corresponding events
    const createEvent = (targets, trigger, functions) => {
        if (targets) {
            targets.forEach(target => {
                const newEvent = EventListener(target, trigger, functions);
                newEvent.assignEvent();
            });
        }
    };

    const createCategoryEvents = () => {
        const contentContainer = document.getElementById('content-area');
        const categories = document.querySelectorAll('#category-btns li');
        
        const EVENT_TRIGGER = 'click';
        
        const clearContentContainer = () => {display.clearContainer(contentContainer)};
        const renderTasks = () => {renderAllTasks(contentContainer)};
        const renderDay = () => {renderToday(contentContainer)};
        const render7Days = () => {renderWeek(contentContainer)};

        const commonFunctions = [clearContentContainer, createAddTaskEvent, createUpdateTaskEvent,
            createDeleteTaskEvent];
        const specificFunctions = [renderTasks, renderDay, render7Days];

        categories.forEach((category, index) => {
            createEvent([category], EVENT_TRIGGER, [...commonFunctions.slice(0, 1), 
                specificFunctions[index], ...commonFunctions.slice(1)]);
        });
    };

    // links each project button in side bar to corresponding events
    const createProjectEvents = () => {
        const contentContainer = document.getElementById('content-area');
        const projects = document.querySelectorAll('#projects span');
        const EVENT_TRIGGER = 'click';
        
        const clearContentContainer = () => {
            display.clearContainer(contentContainer)
        };
        const renderProject = (event) => {
            const projectId = event.target.dataset.projectId ||
                event.target.parentElement.dataset.projectId;
            renderProjectById(contentContainer, parseInt(projectId));
        };
        
        createEvent(projects, EVENT_TRIGGER, [clearContentContainer, 
            renderProject, createAddTaskEvent, createUpdateTaskEvent,
            createDeleteTaskEvent]);
    };

    // links "add new project" button corresponding events
    const createAddProjectEvent = () => {
        const projectBtn = document.getElementById('add-project-container');
        const EVENT_TRIGGER = 'click';

        const validate = () => {
            const validationBtn = document.getElementById('project-validate');
            createEvent([validationBtn], EVENT_TRIGGER, [addProject]);
        };
        const cancel = () => {
            const cancelBtn = document.getElementById('project-cancel');
            createEvent([cancelBtn], EVENT_TRIGGER, [cancelAddProject]);
        };

        createEvent([projectBtn], EVENT_TRIGGER, [display.hideAddProjectBtn,
            display.showProjectInput, validate, cancel]);
        
    };

    const createDeleteProjectEvent = () => {
        const deleteBtns = document.querySelectorAll('.delete-project');
        const contentArea = document.getElementById('content-area');
        const EVENT_TRIGGER = 'click';
        const remove = (event) => {
            const projectId = event.target.parentElement.parentElement
                .dataset.projectId;
            deleteProject(parseInt(projectId));
        };
        const clear = (event) => {
            const projectId = parseInt(event.target.parentElement.parentElement
                .dataset.projectId);
            const projectEl = document.querySelector(
                `#projects li[data-project-id="${projectId}"]`);
            display.deleteElement(projectEl);
            display.clearContainer(contentArea);
        };
        const renderHome = () => {
            renderAllTasks(contentArea);
        };

        createEvent(deleteBtns, EVENT_TRIGGER, [remove, clear, renderHome]);
    };

    const createNewTaskEvent = (btns, eventFunction) => {
        const EVENT_TRIGGER = 'click';

        const clear = () => {
            const clearBtn = document.getElementById('new-task-date-reset');
            createEvent([clearBtn], EVENT_TRIGGER, [clearDate]);
        };
        const validate = () => {
            const validationBtn = document.getElementById('new-task-validate');
            validateTaskEvent(validationBtn);
        };
        const cancel = () => {
            const cancelBtn = document.getElementById('new-task-cancel');
            cancelTaskEvent(cancelBtn);
        };
        const disable = () => {
            const taskBtns = document.querySelectorAll('.task-add-btn');
            const editBtns = document.querySelectorAll('.task-edit-btn');
            disableBtns(taskBtns);
            disableBtns(editBtns);
        };

        createEvent(btns, EVENT_TRIGGER, [eventFunction, clear, validate, 
            cancel, disable]);
    };

    const createAddTaskEvent = () => {
        const taskBtns = document.querySelectorAll('.task-add-btn');

        const createTask = (event) => {
            const projectId = parseInt(event.target.dataset.projectId);
            const projectContainer = document.querySelector(
                    `#content-area ul[data-project-id="${projectId}"]`);
            
            display.createNewTask(projectContainer, projectId);
        };

        createNewTaskEvent(taskBtns, createTask);
    };

    const createUpdateTaskEvent = () => {
        const editBtns = document.querySelectorAll('.task-edit-btn');
        
        const editTask = (event) => {
            const taskId = parseInt(event.target.parentElement.dataset.taskId);
            const container = document.querySelector(`li[data-task-id="${taskId}"]`);
            display.clearContainer(container);
            createUpdateTask(container);
        };

        createNewTaskEvent(editBtns, editTask);
    };

    const disableBtns = (btns) => {
        btns.forEach(btn => btn.disabled = true);
    };

    const enableBtns = (btns) => {
        const inputField = document.getElementById('new-task-name');
        if (inputField) return;

        btns.forEach(btn => btn.disabled = false);
    };

    const clearDate = () => {
        const dateField = document.getElementById('new-task-due-date');
        dateField.value = '';
    };

    // creates event that adds new task to list above upon clicking check mark
    const createTaskValidationEvent = (target, eventFunction) => {
        const EVENT_TRIGGER = 'click';
        
        const enable = () => {
            const addTaskBtns = document.querySelectorAll('.task-add-btn');
            const editTaskBtns = document.querySelectorAll('.task-edit-btn');
            enableBtns(addTaskBtns);
            enableBtns(editTaskBtns);
        };

        createEvent([target], EVENT_TRIGGER, [eventFunction, enable, 
            createUpdateTaskEvent, createDeleteTaskEvent]);
    };

    const validateTaskEvent = (target) => {
        const newTaskWrapper = document.getElementById('new-task-container');
        
        if (newTaskWrapper) {
            createTaskValidationEvent(target, addTask);
        } else {
            createTaskValidationEvent(target, updateTask);
        }
    };

    const cancelTaskEvent = (target) => {
        const newTaskWrapper = document.getElementById('new-task-container');
        const cancel = () => {
            const newTaskWrapper = document.getElementById('new-task-container');
            display.deleteElement(newTaskWrapper);
        };

        if (newTaskWrapper) {
            createTaskValidationEvent(target, cancel);
        } else {
            createTaskValidationEvent(target, cancelEditAddTask);
        }
    };

    const createDeleteTaskEvent = () => {
        const deleteBtns = document.querySelectorAll('.check-mark');
        const EVENT_TRIGGER = 'click';
        const remove = (event) => {
            const taskId = event.target.parentElement.dataset.taskId;
            deleteTask(parseInt(taskId));
        };
        const clearDOM = (event) => {
            const taskId = parseInt(event.target.parentElement.dataset.taskId);
            const taskEl = document.querySelector(
                `#content-area li[data-task-id="${taskId}"]`);
            display.createFadeOut(taskEl, 350);
        };

        createEvent(deleteBtns, EVENT_TRIGGER, [remove, clearDOM]);
    };

    // links all events upon load. Only meant to be used once.
    const assignInitialEvents = () => {
        createCategoryEvents();
        createProjectEvents();
        createDeleteProjectEvent();
        createAddProjectEvent();
        createAddTaskEvent();
        createUpdateTaskEvent();
        createDeleteTaskEvent();
    };

    const storeData = () => {
        if (localStorage.getItem('projects')) {
            localStorage.removeItem('projects');
        }

        if (localStorage.getItem('tasks')) {
            localStorage.removeItem('tasks');
        }

        let projects = projectModule.getProjects();
        let tasks = taskModule.getTasks();

        localStorage.setItem('projects', JSON.stringify(projects));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const retrieveData = () => {
        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        projects.forEach(project => {
            project.id = parseInt(project.id);
            project.taskIds = project.taskIds.map(id => parseInt(id));
            projectModule.addProject(project);
        });
        
        tasks.forEach(task => {
            task.id = parseInt(task.id);
            task.projectId = parseInt(task.projectId);
            task.dueDate = parseJSON(task.dueDate);
            taskModule.addTask(task);
        });

    };

    return {renderMain, renderProjects, renderCategories, renderAllTasks,
            assignInitialEvents, retrieveData};
})();


window.onload = (event) => {
    
    try {
        app.retrieveData();
    } catch(error) {
        return error;
    }
    
    const mainContainer = document.getElementById('main-container');
    app.renderMain(mainContainer);
    
    const categoryContainer = document.getElementById('category-btns');
    const projectContainer = document.getElementById('projects');
    const contentContainer = document.getElementById('content-area');

    app.renderCategories(categoryContainer);
    app.renderProjects(projectContainer);
    app.renderAllTasks(contentContainer);
    app.assignInitialEvents();
};