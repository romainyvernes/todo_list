import { Project, projectModule } from './projects';
import { Task, taskModule } from './tasks';
import display from './display';
import { addDays, isWithinInterval } from 'date-fns';

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

    const clearContentContainer = () => {
        const contentContainer = document.getElementById('content-area');
        let firstChild = contentContainer.firstElementChild;

        while (firstChild) {
            firstChild.remove();
            firstChild = contentContainer.firstElementChild;
        }
    };

    const assignCategoryEvents = () => {
        const categories = document.querySelectorAll('#category-btns li');
        const inboxBtn = categories[0];
        const todayBtn = categories[1];
        const weekBtn = categories[2];

        inboxBtn.addEventListener('click', event => {
            clearContentContainer();
            renderAllTasks();
        });

        todayBtn.addEventListener('click', event => {
            clearContentContainer();
            renderToday();
        });

        weekBtn.addEventListener('click', event => {
            clearContentContainer();
            renderWeek();
        });
    };

    const assignProjectEvents = () => {
        const projects = document.querySelectorAll('#projects li');

        projects.forEach(project => {
            project.addEventListener('click', event => {
                clearContentContainer();
                renderProjectById(project.dataset.projectId);
            });
        });
    };

    return {renderMain, renderProjects, renderCategories, renderAllTasks, 
            assignCategoryEvents, assignProjectEvents};
})();


window.onload = (event) => {
    app.renderMain();
    app.renderCategories();
    app.assignCategoryEvents();
    setTimeout(() => {
        app.renderProjects();
        app.assignProjectEvents();
        app.renderAllTasks();
    }, 11);
};