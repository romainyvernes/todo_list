import { Project, projectModule } from './projects';
import { Task, taskModule } from './tasks';
import display from './display';
import { addDays, isWithinInterval, parseISO } from 'date-fns';
import { EventListener } from './events';

const app = (() => {

    const renderMain = (target) => {
        display.renderMain(target);
    };

    const renderCategories = (target) => {
        const CATEGORIES = [
            {label: 'All tasks', iconClass: 'fas fa-inbox'},
            {label: 'Today', iconClass: 'fas fa-calendar-day'},
            {label: 'Next 7 days', iconClass: 'fas fa-calendar-week'}
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
                    iconClass: 'fas fa-folder-open',
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

    const clearContainer = (target) => {
        let firstChild = target.firstElementChild;

        while (firstChild) {
            firstChild.remove();
            firstChild = target.firstElementChild;
        }
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
        
        clearContainer(projectsContainer);
        renderProjects(projectsContainer);
        createProjectEvents();

        clearContainer(contentContainer);
        renderProjectById(contentContainer, newProject.id);
        createAddTaskEvent();
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
        
        const priorityFlags = document.querySelectorAll('#new-task-priority-wrapper input[type="radio"]');
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
        
        const listWrapper = document.querySelector(`#content-area ul[data-project-id="${projectId}"]`);
        
        taskModule.addTask(newTask);
        
        const project = projectModule.getProjectById(projectId);
        project.taskIds.push(newTask.id);
        projectModule.updateProject(project);
        
        const newTasksList = taskModule.sortByDate(project.taskIds.reduce((arr, id) => {
            arr.push(taskModule.getTaskById(id));
            return arr;
        }, []));

        clearContainer(listWrapper);
        addTaskWrapper.remove();

        display.renderTaskList(listWrapper, newTasksList);
    };

    const updateTask = () => {
        const editTaskWrapper = document.getElementById('edit-task-container');
        const taskId = parseInt(editTaskWrapper.dataset.taskId);
        const projectId = taskModule.getTaskById(taskId).projectId;

        const updatedTask = collectTaskData(projectId);
        updatedTask.id = taskId;
        
        taskModule.updateTask(updatedTask);
        
        clearContainer(editTaskWrapper);
        display.renderTask(editTaskWrapper, updatedTask);
    };

    const createUpdateTask = (target) => {
        const taskId = parseInt(target.dataset.taskId);
        const taskToUpdate = taskModule.getTaskById(taskId);
        
        clearContainer(target);

        display.renderNewTask(target, taskToUpdate);
    };

    const cancelNewAddTask = () => {
        const newTaskWrapper = document.getElementById('new-task-container');
        newTaskWrapper.remove();
    };

    const cancelEditAddTask = () => {
        const editTaskWrapper = document.getElementById('edit-task-container');
        const taskId = parseInt(editTaskWrapper.dataset.taskId);
        const task = taskModule.getTaskById(taskId);

        clearContainer(editTaskWrapper);
        display.renderTask(editTaskWrapper, task);
    };
    
    // links each category button (all tasks, today, next 7 days) to its
    // corresponding events
    const createCategoryEvents = () => {
        const contentContainer = document.getElementById('content-area');
        const categories = document.querySelectorAll('#category-btns li');
        
        const EVENT_TRIGGER = 'click';
        const clearContentContainer = () => {clearContainer(contentContainer)};
        
        const inboxBtn = categories[0];
        const renderTasks = () => {renderAllTasks(contentContainer)};
        const inboxEvent = EventListener(inboxBtn, EVENT_TRIGGER, [clearContentContainer,
                renderTasks, createAddTaskEvent, createUpdateTaskEvent]);
        inboxEvent.assignEvent();

        const todayBtn = categories[1];
        const renderDay = () => {renderToday(contentContainer)};
        const todayEvent = EventListener(todayBtn, EVENT_TRIGGER, [clearContentContainer,
                renderDay, createAddTaskEvent, createUpdateTaskEvent]);
        todayEvent.assignEvent();
        
        const weekBtn = categories[2];
        const render7Days = () => {renderWeek(contentContainer)};
        const weekEvent = EventListener(weekBtn, EVENT_TRIGGER, [clearContentContainer,
                render7Days, createAddTaskEvent, createUpdateTaskEvent]);
        weekEvent.assignEvent();
    };

    // links each project button in side bar to corresponding events
    const createProjectEvents = () => {
        const contentContainer = document.getElementById('content-area');
        const projects = document.querySelectorAll('#projects li');
        const clearContentContainer = () => {clearContainer(contentContainer)};
        const EVENT_TRIGGER = 'click';

        if (projects) {
            projects.forEach(project => {
                const renderProject = () => {
                    renderProjectById(contentContainer, parseInt(project.dataset.projectId));
                };
                const newEvent = EventListener(project, EVENT_TRIGGER, [clearContentContainer,
                        renderProject, createAddTaskEvent, createUpdateTaskEvent]);
                newEvent.assignEvent();
            });
        }
    };

    // links "add new project" button corresponding events
    const createAddProjectEvent = () => {
        const EVENT_TRIGGER = 'click';

        const validate = () => {
            const validationBtn = document.getElementById('project-validate');
            createProjectValidationEvent(validationBtn);
        };
        const cancel = () => {
            const cancelBtn = document.getElementById('project-cancel');
            createProjectCancelEvent(cancelBtn);
        };

        const projectBtn = document.getElementById('add-project-container');
        const projectEvent = EventListener(projectBtn, EVENT_TRIGGER, [display.hideAddProjectBtn,
                display.showProjectInput, validate, cancel]);
        projectEvent.assignEvent();
    };

    // creates event that adds new project button upon clicking check mark
    const createProjectValidationEvent = (target) => {
        const EVENT_TRIGGER = 'click';
        const validationEvent = EventListener(target, EVENT_TRIGGER, 
            [addProject]);
        validationEvent.assignEvent();
    };

    // creates event that resets "add new project" button upon clicking x mark
    const createProjectCancelEvent = (target) => {
        const EVENT_TRIGGER = 'click';
        const cancelEvent = EventListener(target, EVENT_TRIGGER, [cancelAddProject]);
        cancelEvent.assignEvent();
    };

    const createNewTaskEvent = (btns, eventFunction) => {
        const EVENT_TRIGGER = 'click';

        if (btns) {
            btns.forEach(btn => {
                const clear = () => {
                    const clearBtn = document.getElementById('new-task-date-reset');
                    createClearDateEvent(clearBtn);
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

                const newEvent = EventListener(btn, EVENT_TRIGGER, [eventFunction,
                        clear, validate, cancel, disable]);
                newEvent.assignEvent();
            });
        }
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
            clearContainer(container);
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

    const createClearDateEvent = (target) => {
        const EVENT_TRIGGER = 'click';
        const clearEvent = EventListener(target, EVENT_TRIGGER, [clearDate]);
        clearEvent.assignEvent();
    }

    // creates event that adds new task to list above upon clicking check mark
    const createTaskValidationEvent = (target, eventFunction) => {
        const EVENT_TRIGGER = 'click';
        
        const enable = () => {
            const addTaskBtns = document.querySelectorAll('.task-add-btn');
            const editTaskBtns = document.querySelectorAll('.task-edit-btn');
            enableBtns(addTaskBtns);
            enableBtns(editTaskBtns);
        };
        
        const validationEvent = EventListener(target, EVENT_TRIGGER, [eventFunction, 
                enable, createUpdateTaskEvent]);
        validationEvent.assignEvent();
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
        
        if (newTaskWrapper) {
            createTaskValidationEvent(target, cancelNewAddTask);
        } else {
            createTaskValidationEvent(target, cancelEditAddTask);
        }
    };

    // links all events upon load. Only meant to be used once.
    const assignInitialEvents = () => {
        createCategoryEvents();
        createProjectEvents();
        createAddProjectEvent();
        createAddTaskEvent();
        createUpdateTaskEvent();
    };

    return {renderMain, renderProjects, renderCategories, renderAllTasks,
            assignInitialEvents};
})();


window.onload = (event) => {
    const mainContainer = document.getElementById('main-container');
    app.renderMain(mainContainer);
    
    const categoryContainer = document.getElementById('category-btns');
    const projectContainer = document.getElementById('projects');
    const contentContainer = document.getElementById('content-area');
    app.renderCategories(categoryContainer);
    setTimeout(() => {
        app.renderProjects(projectContainer);
        app.renderAllTasks(contentContainer);
        app.assignInitialEvents();
    }, 11);
};