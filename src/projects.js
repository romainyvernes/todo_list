const Project = (name, taskIds=[]) => {
    name = name;
    taskIds = taskIds;
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

export {Project, projectModule};