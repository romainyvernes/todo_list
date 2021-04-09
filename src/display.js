import { format } from 'date-fns';

const display = (() => {

    const renderMain = (target) => {
        const header = document.createElement('header');
        
        const logo = document.createElement('i');
        logo.className = 'far fa-check-circle';
        header.appendChild(logo);

        const h1 = document.createElement('h1');
        h1.textContent = 'My Todo';
        header.appendChild(h1);


        const sideBar = document.createElement('div');
        sideBar.id = 'side-bar';
        
        const categoryBtns = document.createElement('ul');
        categoryBtns.id = 'category-btns';
        sideBar.appendChild(categoryBtns);
        
        const h2 = document.createElement('h2');
        h2.textContent = 'Projects';
        sideBar.appendChild(h2);

        const projects = document.createElement('ul');
        projects.id = 'projects';
        sideBar.appendChild(projects);

        const addProjectContainer = document.createElement('div');
        addProjectContainer.id = 'add-project-container';
        
        const addIcon = document.createElement('i');
        addIcon.className = 'fas fa-plus';
        addProjectContainer.appendChild(addIcon);
        
        const addSpan = document.createElement('span');
        addSpan.textContent = 'Add new project';
        addProjectContainer.appendChild(addSpan);
        
        sideBar.appendChild(addProjectContainer);

        const projectInputWrapper = document.createElement('div');
        projectInputWrapper.id = 'add-project-input';

        const projectInput = document.createElement('input');
        projectInput.type = 'text';
        projectInput.placeholder = 'Enter project name';
        projectInput.maxLength = '30';
        projectInputWrapper.appendChild(projectInput);

        const projectValidateBtn = document.createElement('button');
        projectValidateBtn.type = 'button';
        projectValidateBtn.id = 'project-validate';

        const projectValidateIcon = document.createElement('i');
        projectValidateIcon.className= 'fas fa-check';
        projectValidateBtn.appendChild(projectValidateIcon);

        projectInputWrapper.appendChild(projectValidateBtn);

        const projectCancelBtn = document.createElement('button');
        projectCancelBtn.type = 'button';
        projectCancelBtn.id = 'project-cancel';

        const projectCancelIcon = document.createElement('i');
        projectCancelIcon.className = 'fas fa-times';
        projectCancelBtn.appendChild(projectCancelIcon);

        projectInputWrapper.appendChild(projectCancelBtn);

        sideBar.appendChild(projectInputWrapper);

        const contentArea = document.createElement('div');
        contentArea.id = 'content-area';

        target.appendChild(header);
        target.appendChild(sideBar);
        target.appendChild(contentArea);
    };

    const populateSideBar = (target, items) => {
        items.map(item => {
            const li = document.createElement('li');

            if (item.projectId) {
                li.dataset.projectId = item.projectId;
            }

            if (item.iconClass) {
                const icon = document.createElement('i');
                icon.className = item.iconClass;

                li.appendChild(icon);
            }

            const span = document.createElement('span');
            span.textContent = item.label;

            li.appendChild(span);
            target.appendChild(li);
        });
    };

    const renderContentArea = (target, projects, tasks) => {
        projects.map(project => {
            const nameWrapper = document.createElement('div');
            nameWrapper.className = 'name-wrapper';

            const nameIcon = document.createElement('i');
            nameIcon.className = 'fas fa-tasks';
            nameWrapper.appendChild(nameIcon);

            const projectName = document.createElement('h2');
            projectName.textContent = project.name;
            nameWrapper.appendChild(projectName);

            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.className = 'task-add-btn';
            addBtn.textContent = '+';
            nameWrapper.appendChild(addBtn);
            
            const listWrapper = document.createElement('ul');
            
            const projectTasks = tasks.filter(task => {
                if (task.projectId === project.id) return true;
                return false;
            });
            projectTasks.map(task => {
                const taskWrapper = document.createElement('li');

                const circle = document.createElement('span');
                circle.className = 'check-circle';
                taskWrapper.appendChild(circle);
                
                const taskLabel = document.createElement('span');
                taskLabel.className = 'task-label';
                taskLabel.textContent = task.name;
                taskWrapper.appendChild(taskLabel);

                const date = document.createElement('span');
                date.className = 'task-date';
                if (task.dueDate !== '') {
                    date.textContent = format(task.dueDate, 'MM/dd/yyyy');
                } else {
                    date.textContent = 'no due date';
                }
                taskWrapper.appendChild(date);
                
                const priorityWrapper = document.createElement('div');
                priorityWrapper.className = 'priority-level';

                const flagIcon = document.createElement('i');
                flagIcon.className = 'priority-flag fab fa-font-awesome-flag';
                flagIcon.dataset.color = 'green';
                priorityWrapper.appendChild(flagIcon);
                
                taskWrapper.appendChild(priorityWrapper);

                const editIcon = document.createElement('i');
                editIcon.className = 'far fa-edit edit-icon';
                taskWrapper.appendChild(editIcon);

                listWrapper.appendChild(taskWrapper);
            });

            target.appendChild(nameWrapper);
            target.appendChild(listWrapper);
        });
    };

    const showProjectInput = () => {
        const projectInput = document.getElementById('add-project-input');
        projectInput.style.display = 'block';
    };

    const showAddProjectBtn = () => {
        const projectAdd = document.getElementById('add-project-container');
        projectAdd.style.display = 'block';
    };

    const hideProjectInput = () => {
        const projectInput = document.getElementById('add-project-input');
        projectInput.style.display = 'none';
    };

    const hideAddProjectBtn = () => {
        const projectAdd = document.getElementById('add-project-container');
        projectAdd.style.display = 'none';
    };

    return {renderMain, populateSideBar, renderContentArea, showProjectInput,
            showAddProjectBtn, hideProjectInput, hideAddProjectBtn};
})();

export default display;