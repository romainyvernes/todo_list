import { Project, projectModule } from './projects';
import { Task, taskModule } from './tasks';
import display from './display';
import { addDays, isWithinInterval } from 'date-fns';
import { eventModule, EventListener } from './events';

const app = (() => {

    const renderMain = () => {
        const container = document.getElementById('main-container');
        display.renderMain(container);
    };

    const renderCategories = () => {
        const categoryContainer = document.getElementById('category-btns');
        const CATEGORIES = [
            {label: 'All tasks', iconClass: 'fas fa-inbox'},
            {label: 'Today', iconClass: 'fas fa-calendar-day'},
            {label: 'Next 7 days', iconClass: 'fas fa-calendar-week'}
        ];
        display.populateSideBar(categoryContainer, CATEGORIES);
    };

    const renderProjects = () => {
        const projectContainer = document.getElementById('projects');
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

            display.populateSideBar(projectContainer, projectArray);
        }
    };

    const renderAllTasks = () => {
        const contentContainer = document.getElementById('content-area');
        const sortedProjects = projectModule.sortByName(projectModule.getProjects());
        const sortedTasks = taskModule.sortByDate(taskModule.getTasks());
        const label = document.querySelectorAll('#category-btns span')[0].textContent;
        display.renderContentArea(contentContainer, sortedProjects, sortedTasks, label);
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

    const renderByTimespan = (startDate, endDate, title) => {
        const contentContainer = document.getElementById('content-area');
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
        display.renderContentArea(contentContainer, projects, tasks, title);
    };

    const renderToday = () => {
        const startDate = new Date().setHours(0, 0, 0, 0);
        const endDate = new Date().setHours(23, 59, 59, 999);
        const label = document.querySelectorAll('#category-btns span')[1].textContent;
        renderByTimespan(startDate, endDate, label);
    };

    const renderWeek = () => {
        const startDate = new Date().setHours(0, 0, 0, 0);
        const endDate = addDays(startDate, 6).setHours(23, 59, 59, 999);
        const label = document.querySelectorAll('#category-btns span')[2].textContent;
        renderByTimespan(startDate, endDate, label);
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
        renderProjects();
        createProjectEvents();
        eventModule.assignEvents();

        clearContainer(contentContainer);
        renderProjectById(contentContainer, newProject.id);
    };

    const cancelAddProject = () => {
        const inputField = document.querySelector('#add-project-input input');
        inputField.value = '';
        display.hideProjectInput();
        display.showAddProjectBtn();
    };

    const addTask = () => {
        const taskWrapper = document.getElementById('new-task-container');
        const projectId = taskWrapper.dataset.projectId;
        const listWrapper = document.querySelector(`#content-area ul[data-project-id="${projectId}"]`);
        const inputField = document.getElementById('task-name');

        if (inputField.value === '') return;
        
        const newTask = Task(inputField.value);
        newTask.projectId = projectId;
        
        const project = projectModule.getProjectById(projectId);
        project.taskIds.push(newTask.id);
        projectModule.updateProject(project);
        
        inputField.value = '';

        clearContainer(listWrapper);
        renderProjectById(listWrapper, projectId);
    };

    const cancelAddTask = () => {
        return
    };

    const createCategoryEvents = () => {
        const contentContainer = document.getElementById('content-area');
        const categories = document.querySelectorAll('#category-btns li');
        const clearContentContainer = () => {clearContainer(contentContainer)};
        const EVENT_TRIGGER = 'click';
        
        const inboxBtn = categories[0];
        const inboxEvent = EventListener(inboxBtn, EVENT_TRIGGER, [clearContentContainer,
                renderAllTasks]);
        eventModule.createEvent(inboxEvent);

        const todayBtn = categories[1];
        const todayEvent = EventListener(todayBtn, EVENT_TRIGGER, [clearContentContainer,
                renderToday]);
        eventModule.createEvent(todayEvent);
        
        const weekBtn = categories[2];
        const weekEvent = EventListener(weekBtn, EVENT_TRIGGER, [clearContentContainer,
                renderWeek]);
        eventModule.createEvent(weekEvent);

        eventModule.assignEvents();
    };

    const createProjectEvents = () => {
        const contentContainer = document.getElementById('content-area');
        const projects = document.querySelectorAll('#projects li');
        const clearContentContainer = () => {clearContainer(contentContainer)};
        const EVENT_TRIGGER = 'click';

        projects.forEach(project => {
            const renderProject = () => {
                renderProjectById(contentContainer, project.dataset.projectId);
            };
            const newEvent = EventListener(project, EVENT_TRIGGER, [clearContentContainer,
                    renderProject]);
            eventModule.createEvent(newEvent);
        });
    };

    const createAddProjectEvent = () => {
        const EVENT_TRIGGER = 'click';

        const projectBtn = document.getElementById('add-project-container');
        const projectEvent = EventListener(projectBtn, EVENT_TRIGGER, [display.hideAddProjectBtn,
                display.showProjectInput]);
        eventModule.createEvent(projectEvent);

        const projectValidation = document.getElementById('project-validate');
        const validationEvent = EventListener(projectValidation, EVENT_TRIGGER, 
                [addProject]);
        eventModule.createEvent(validationEvent);

        const projectCancel = document.getElementById('project-cancel');
        const cancelEvent = EventListener(projectCancel, EVENT_TRIGGER, [cancelAddProject]);
        eventModule.createEvent(cancelEvent);
    };

    const createAddTaskEvent = () => {
        const EVENT_TRIGGER = 'click';
        
        const taskBtns = document.querySelectorAll('.task-add-btn');
        taskBtns.forEach(taskBtn => {
            const newEvent = EventListener(taskBtn, EVENT_TRIGGER);
            const createTask = () => {display.createNewTask(newEvent.event.target.dataset.projectId)};
            newEvent.functions.push(createTask);
            eventModule.createEvent(newEvent);
        });

        const taskValidation = document.getElementById('task-validate');
        const validationEvent = EventListener(taskValidation, EVENT_TRIGGER, 
                [addTask]);
        eventModule.createEvent(validationEvent);
        /*
        const taskCancel = document.getElementById('task-cancel');
        const cancelEvent = EventListener(taskCancel, EVENT_TRIGGER, [cancelAddTask]);
        eventModule.createEvent(cancelEvent);*/
    };

    const assignEvents = () => {
        createCategoryEvents();
        createProjectEvents();
        createAddProjectEvent();
        createAddTaskEvent();
        eventModule.assignEvents();
    };

    return {renderMain, renderProjects, renderCategories, renderAllTasks,
            assignEvents};
})();


window.onload = (event) => {
    app.renderMain();
    app.renderCategories();
    setTimeout(() => {
        app.renderProjects();
        app.renderAllTasks();
        app.assignEvents();
    }, 11);
};