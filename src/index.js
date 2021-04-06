import { Project, projectModule } from './projects';
import { Task, taskModule } from './tasks';
import display from './display';

const app = (() => {

    const renderMain = () => {
        const container = document.getElementById('main-container');
        display.renderMain(container);
    };

    const renderProjects = () => {
        const projectContainer = document.getElementById('projects');
        const projects = projectModule.getProjects();
        let projectArray = [];
        
        if (projects.length > 0) {
            projects.map(project => {
                const projectObj = {label: project.name, iconClass: 'fas fa-folder-open'};
                projectArray.push(projectObj);
            });

            display.populateSideBar(projectContainer, projectArray);
        }
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

    const viewAllTasks = () => {
        const tasks = taskModule.getTasks();
    };

    return {renderMain, renderProjects, renderCategories};
})();

window.onload = (event) => {
    app.renderMain();
    app.renderCategories();
    app.renderProjects();
};