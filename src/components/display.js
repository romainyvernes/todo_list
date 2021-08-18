import { format } from 'date-fns';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';

const display = (() => {
    const renderMain = (target) => {
        // page header
        const header = document.createElement('header');
        header.className = 'primary-header';
        
        const siteNameWrapper = document.createElement('div');
        siteNameWrapper.className = 'header-left-section';
        
        const logo = document.createElement('i');
        logo.className = 'far fa-check-circle'; /* HERE */
        siteNameWrapper.appendChild(logo);

        const h1 = document.createElement('h1');
        h1.textContent = 'MyTodo';
        siteNameWrapper.appendChild(h1);

        header.appendChild(siteNameWrapper);

        const loginBtnWrapper = document.createElement('div');
        loginBtnWrapper.className = 'header-right-section';

        const signInBtn = document.createElement('button');
        signInBtn.className = 'auth-btn sign-in-btn';
        signInBtn.textContent = 'Sign In With Google';
        loginBtnWrapper.appendChild(signInBtn);

        const signOutContainer = document.createElement('div');
        signOutContainer.className = 'auth-btn hidden sign-out-btn';

        const profilePic = document.createElement('span');
        profilePic.id = 'profile-pic';
        signOutContainer.appendChild(profilePic);

        const userName = document.createElement('p')
        userName.id = 'user-name';
        signOutContainer.appendChild(userName);

        const signOutBtn = document.createElement('button');
        signOutBtn.textContent = 'Sign Out';
        signOutContainer.appendChild(signOutBtn);

        loginBtnWrapper.appendChild(signOutContainer);

        const barsBtn = document.createElement('button');
        barsBtn.id = 'hamburger-logo';

        const barsIcon = document.createElement('i');
        barsIcon.className = 'fas fa-bars'; /* HERE */
        barsBtn.appendChild(barsIcon);
        
        loginBtnWrapper.appendChild(barsBtn);

        header.appendChild(loginBtnWrapper);
        // side bar
        const sideBar = document.createElement('aside');
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
        addIcon.className = 'fas fa-plus'; /* HERE */
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
        projectValidateIcon.className= 'fas fa-check'; /* HERE */
        projectValidateBtn.appendChild(projectValidateIcon);

        projectInputWrapper.appendChild(projectValidateBtn);

        const projectCancelBtn = document.createElement('button');
        projectCancelBtn.type = 'button';
        projectCancelBtn.id = 'project-cancel';

        const projectCancelIcon = document.createElement('i');
        projectCancelIcon.className = 'fas fa-times'; /* HERE */
        projectCancelBtn.appendChild(projectCancelIcon);

        projectInputWrapper.appendChild(projectCancelBtn);

        sideBar.appendChild(projectInputWrapper);

        const contentArea = document.createElement('section');
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

            if (item.icon1Class) {
                const icon = document.createElement('i');
                icon.className = item.icon1Class;

                li.appendChild(icon);
            }

            const span = document.createElement('span');
            span.dataset.projectId = item.projectId;
            span.textContent = item.label;

            li.appendChild(span);

            if (item.icon2Class) {
                const btn = document.createElement('button');
                btn.className = 'delete-project';
                btn.dataset.projectId = item.projectId;

                const icon = document.createElement('i');
                icon.className = item.icon2Class;
                btn.appendChild(icon);

                li.appendChild(btn);
            }
            
            target.appendChild(li);
        });
    };

    const renderContentArea = (target, projects, tasks, title=null) => {
        if (title) {
            const header = document.createElement('h2');
            header.id = 'content-label'
            header.textContent = title;
            target.appendChild(header);
        }

        projects.map(project => {
            const nameWrapper = document.createElement('div');
            nameWrapper.className = 'name-wrapper';

            const nameIcon = document.createElement('i');
            nameIcon.className = 'fas fa-tasks'; /* HERE */
            nameWrapper.appendChild(nameIcon);

            const projectName = document.createElement('h3');
            projectName.textContent = project.name;
            nameWrapper.appendChild(projectName);

            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.className = 'task-add-btn';
            addBtn.textContent = '+';
            addBtn.dataset.projectId = project.id;
            nameWrapper.appendChild(addBtn);
            
            const listWrapper = document.createElement('ul');
            listWrapper.dataset.projectId = project.id;
            
            const projectTasks = tasks.filter(task => {
                if (task.projectId === project.id) return true;
                return false;
            });
            renderTaskList(listWrapper, projectTasks);

            target.appendChild(nameWrapper);
            target.appendChild(listWrapper);
        });

        if (!title) {
            const nameWrapper = document.querySelector('.name-wrapper');
            nameWrapper.style.marginTop = '0.5em';

            const projectIcon = document.querySelector('.name-wrapper i');
            projectIcon.style.fontSize = '1.9em';

            const projectName = document.querySelector('.name-wrapper h3');
            projectName.style.fontSize = '2em';
        }
    };

    const renderTaskList = (target, tasks) => {
        tasks.map(task => {
            renderTask(target, task);
        });
    };

    const renderTask = (target, task) => {
        let taskWrapper;
        
        if (!target.matches('li')) {
            taskWrapper = document.createElement('li');
            taskWrapper.dataset.taskId = task.id;
            taskWrapper.className = 'task-wrapper';
        } else {
            target.removeAttribute('id');
            taskWrapper = target;
        }
        
        const circle = document.createElement('span');
        circle.className = 'check-circle';
        taskWrapper.appendChild(circle);

        const checkMark = document.createElement('i');
        checkMark.className = 'check-mark fas fa-check'; /* HERE */
        checkMark.dataset.taskId = task.id;
        taskWrapper.appendChild(checkMark);
        
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
        flagIcon.className = `${task.priority}-priority fab fa-font-awesome-flag`; /* HERE */
        priorityWrapper.appendChild(flagIcon);
        
        taskWrapper.appendChild(priorityWrapper);

        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'task-edit-btn';
        editBtn.dataset.taskId = task.id;

        const editIcon = document.createElement('i');
        editIcon.className = 'far fa-edit'; /* HERE */
        editBtn.appendChild(editIcon);

        taskWrapper.appendChild(editBtn);

        if (!target.matches('li')) target.appendChild(taskWrapper);
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

    const renderNewTask = (target, task=null) => {
        if (task) {
            target.id = 'edit-task-container';
        }

        const taskName = document.createElement('input');
        taskName.id = 'new-task-name';
        taskName.type = 'text';
        taskName.placeholder = 'Enter task name here'
        taskName.maxLength = '40';
        if (task) taskName.value = task.name;
        target.appendChild(taskName);

        const dateWrapper = document.createElement('div');

        const dueDate = document.createElement('input');
        dueDate.id = 'new-task-due-date';
        dueDate.type = 'date';
        if (task && task.dueDate !== '') {
            dueDate.value = format(task.dueDate, 'yyyy-MM-dd');
        } else {
            dueDate.value = '';
        }
        dateWrapper.appendChild(dueDate);

        const resetDate = document.createElement('button');
        resetDate.type = 'button'
        resetDate.id = 'new-task-date-reset';
        resetDate.textContent = 'Clear';
        dateWrapper.appendChild(resetDate);

        target.appendChild(dateWrapper);

        const priorityWrapper = document.createElement('div');
        priorityWrapper.id = 'new-task-priority-wrapper';
        
        const PRIORITY_LEVELS = ['low', 'medium', 'high'];
        PRIORITY_LEVELS.map((level, index) => {
            const flagWrapper = document.createElement('label');
            
            const flagInput = document.createElement('input');
            flagInput.type = 'radio';
            flagInput.name = 'priority';
            flagInput.value = level;
            if (task && task.priority === level) {
                flagInput.checked = true;
            }
            if (index === 0 && !task) flagInput.checked = true;
            flagWrapper.appendChild(flagInput);

            const flagIcon = document.createElement('i');
            flagIcon.className = `${level}-priority fab fa-font-awesome-flag`; /* HERE */
            flagWrapper.appendChild(flagIcon);

            priorityWrapper.appendChild(flagWrapper);
        });

        target.appendChild(priorityWrapper);

        const btnWrapper = document.createElement('div');

        const taskValidateBtn = document.createElement('button');
        taskValidateBtn.type = 'button';
        taskValidateBtn.id = 'new-task-validate';

        const taskValidateIcon = document.createElement('i');
        taskValidateIcon.className= 'fas fa-check'; /* HERE */
        taskValidateBtn.appendChild(taskValidateIcon);
        
        btnWrapper.appendChild(taskValidateBtn);

        const taskCancelBtn = document.createElement('button');
        taskCancelBtn.type = 'button';
        taskCancelBtn.id = 'new-task-cancel';

        const taskCancelIcon = document.createElement('i');
        taskCancelIcon.className = 'fas fa-times'; /* HERE */
        taskCancelBtn.appendChild(taskCancelIcon);
        
        btnWrapper.appendChild(taskCancelBtn);

        target.appendChild(btnWrapper);
    };

    const createNewTask = (target, projectId) => {
        const newTaskWrapper = document.createElement('li');
        newTaskWrapper.id = 'new-task-container';
        newTaskWrapper.dataset.projectId = projectId;

        renderNewTask(newTaskWrapper);

        target.after(newTaskWrapper);
    };

    const clearContainer = (target) => {
        let firstChild = target.firstElementChild;

        while (firstChild) {
            firstChild.remove();
            firstChild = target.firstElementChild;
        }
    };

    const deleteElement = (target) => {
        target.remove();
    };

    const createFadeOut = (target, delay) => {
        target.style.opacity = '0';
        setTimeout(() => {
            deleteElement(target);
        }, delay);
    };

    const showSideBar = (target) => {
        const hamburgerLogo = document.getElementById('hamburger-logo');
        hamburgerLogo.style.transform = 'rotate(90deg)';
        target.style.transform = 'translateX(-300px)';
    };

    const hideSideBar = (target) => {
        const hamburgerLogo = document.getElementById('hamburger-logo');
        hamburgerLogo.style.transform = 'rotate(0deg)';
        target.style.transform = 'translateX(300px)';
    };

    const resetSideBar = () => {
        const hamburgerLogo = document.getElementById('hamburger-logo');
        const sideBar = document.getElementById('side-bar');
        sideBar.style.transform = 'none';
        hamburgerLogo.style.transform = 'none';
    };

    return {
        renderMain, 
        populateSideBar, 
        renderContentArea, 
        showProjectInput,
        showAddProjectBtn, 
        hideProjectInput, 
        hideAddProjectBtn, 
        createNewTask,
        renderTask, 
        renderTaskList, 
        renderNewTask, 
        clearContainer,
        deleteElement, 
        createFadeOut, 
        showSideBar, 
        hideSideBar, 
        resetSideBar
    };
})();

export default display;