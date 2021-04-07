import {Task, taskModule} from './tasks';

const Project = (name) => {
    name = name;
    let taskIds = [];
    let id = Date.now();

    return {name, taskIds, id};
};

const projectModule = (() => {

    let projects = [];

    const addProject = (project) => {
        projects.push(project);
    };

    const getProjects = () => {
        return projects;
    };

    const getProjectById = (projectId) => {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id === projectId) {
                return projects[i];
            }
        }
    };

    const updateProject = (updatedProject) => {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id === updatedProject.id) {
                projects.splice(i, 1, updatedProject);
                return;
            }
        }
    }

    const deleteProject = (projectId) => {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id === projectId) {
                projects.splice(i, 1);
                return;
            }
        }
    }

    const sortByName = (projects) => {
        return projects.sort((project1, project2) => {
            const project1Name = project1.name.toUpperCase();
            const project2Name = project2.name.toUpperCase();

            if (project1Name < project2Name) return -1;
            if (project1Name > project2Name) return 1;

            return 0;
        });
    };

    return {addProject, getProjects, updateProject, deleteProject, sortByName,
            getProjectById}
})();

// Test data

const scriptProject = Project('Write script');
projectModule.addProject(scriptProject);

const task1 = Task('Buy binder');
const task2 = Task('Do research');
task1.projectId = scriptProject.id;
task2.projectId = scriptProject.id;
task2.dueDate = new Date(Date.now());
taskModule.addTask(task1);
taskModule.addTask(task2);

scriptProject.taskIds.push(task1.id, task2.id);

setTimeout(() => {
    const homeworkProject = Project('Do homework');
    projectModule.addProject(homeworkProject);

    const task3 = Task('Write English essay');
    const task4 = Task('Study math exam');
    task3.projectId = homeworkProject.id;
    task4.projectId = homeworkProject.id;
    task3.dueDate = new Date(Date.now());
    taskModule.addTask(task3);
    taskModule.addTask(task4);

    homeworkProject.taskIds.push(task3.id, task4.id);
}, 10);


export {Project, projectModule};