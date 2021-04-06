const Project = (name) => {
    name = name;
    let taskIds = [];
    let id = new Date().getUTCMilliseconds();

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

    return {addProject, getProjects, updateProject, deleteProject}
})();

const scriptProject = Project('Write script');
projectModule.addProject(scriptProject);
const currentProjects = projectModule.getProjects();

export {Project, projectModule};