import { Project, projectModule } from './projects';
import { Task, taskModule } from './tasks';
import display from './display';
import { addDays, isWithinInterval } from 'date-fns';
import { eventModule } from './events';

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
        display.renderContentArea(contentContainer, sortedProjects, sortedTasks);
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

    const renderByTimespan = (startDate, endDate) => {
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
        display.renderContentArea(contentContainer, projects, tasks);
    };

    const renderToday = () => {
        const startDate = new Date().setHours(0, 0, 0, 0);
        const endDate = new Date().setHours(23, 59, 59, 999);
        renderByTimespan(startDate, endDate);
    };

    const renderWeek = () => {
        const startDate = new Date().setHours(0, 0, 0, 0);
        const endDate = addDays(startDate, 6).setHours(23, 59, 59, 999);
        renderByTimespan(startDate, endDate);
    };

    const renderProjectById = (projectId) => {
        const contentContainer = document.getElementById('content-area');
        const project = [projectModule.getProjectById(projectId)];
        let tasks = project[0].taskIds.reduce((arr, taskId) => {
            const task = taskModule.getTaskById(taskId);
            arr.push(task);
            return arr;
        }, []);
        tasks = taskModule.sortByDate(tasks);
        display.renderContentArea(contentContainer, project, tasks);
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

        clearContainer(contentContainer);
        renderProjectById(newProject.id);
    };

    const cancelAddProject = () => {
        const inputField = document.querySelector('#add-project-input input');
        inputField.value = '';
        display.hideProjectInput();
        display.showAddProjectBtn();
    };

    const createCategoryEvents = () => {
        const contentContainer = document.getElementById('content-area');
        const categories = document.querySelectorAll('#category-btns li');
        const clearContentContainer = () => {clearContainer(contentContainer)};
        const EVENT_TRIGGER = 'click';
        
        const inboxBtn = categories[0];
        eventModule.createEvent(inboxBtn, EVENT_TRIGGER, [clearContentContainer,
                renderAllTasks]);

        const todayBtn = categories[1];
        eventModule.createEvent(todayBtn, EVENT_TRIGGER, [clearContentContainer,
                renderToday]);
        
        const weekBtn = categories[2];
        eventModule.createEvent(weekBtn, EVENT_TRIGGER, [clearContentContainer,
                renderWeek]);

        eventModule.assignEvents();
    };

    const createProjectEvents = () => {
        const contentContainer = document.getElementById('content-area');
        const projects = document.querySelectorAll('#projects li');
        const clearContentContainer = () => {clearContainer(contentContainer)};
        const EVENT_TRIGGER = 'click';

        projects.forEach(project => {
            const renderProject = () => {
                renderProjectById(project.dataset.projectId);
            };

            eventModule.createEvent(project, EVENT_TRIGGER, [clearContentContainer,
                    renderProject]);
        });

        const projectBtn = document.getElementById('add-project-container');
        eventModule.createEvent(projectBtn, EVENT_TRIGGER, [display.hideAddProjectBtn,
                display.showProjectInput]);

        
        const projectValidation = document.getElementById('project-validate');
        eventModule.createEvent(projectValidation, EVENT_TRIGGER, [addProject]);

        const projectCancel = document.getElementById('project-cancel');
        eventModule.createEvent(projectCancel, EVENT_TRIGGER, [cancelAddProject]);
    };

    const assignEvents = () => {
        createCategoryEvents();
        createProjectEvents();
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
        app.assignEvents();
        app.renderAllTasks();
    }, 11);
};