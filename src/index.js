import { Project, projectModule } from './projects';
import { Task, taskModule } from './tasks';
import display from './display';

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
                const projectObj = {label: project.name, iconClass: 'fas fa-folder-open'};
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

    const renderToday = () => {
        const contentContainer = document.getElementById('content-area');
        const currentDate = new Date(Date.now()).toDateString();
        const tasks = taskModule.getTasks().filter(task => {
            if (task.dueDate !== '' && task.dueDate.toDateString() === currentDate) {
                return true;
            }
            return false;
        });
        const projects = tasks.reduce((arr, task) => {
            const project = projectModule.getProjectById(task.projectId);
            arr.push(project);
            return arr;
        }, []);

        display.renderContentArea(contentContainer, projects, tasks);
    };

    return {renderMain, renderProjects, renderCategories, renderAllTasks, 
            renderToday};
})();

window.onload = (event) => {
    app.renderMain();
    app.renderCategories();
    setTimeout(() => {
        app.renderProjects();
        app.renderToday();
    }, 11);
};