import { format } from 'date-fns';
import { icon } from '@fortawesome/fontawesome-svg-core';

const dom = (() => {
    const renderMain = (target) => {
        /* PAGE HEADER */
        const header = document.createElement('header');
        header.className = 'primary-header secondary-bg';

        /* website logo with website name next to it */
        const siteNameWrapper = document.createElement('div');
        siteNameWrapper.className = 'left';
        
        const logo = document.createElement('i');
        logo.innerHTML = icon({ prefix: 'far', iconName: 'check-circle'}).html;

        const h1 = document.createElement('h1');
        h1.textContent = 'MyTodo';

        siteNameWrapper.appendChild(logo);
        siteNameWrapper.appendChild(h1);

        /* wrapper for right-hand side of header */
        const rightSideWrapper = document.createElement('div');
        rightSideWrapper.className = 'right';

        /* sign in button */
        const signInBtn = document.createElement('button');
        signInBtn.className = 'auth-btn sign-in-btn site-btn primary-bg rounded-corners';
        signInBtn.textContent = 'Sign In With Google';
        
        /* sign out button */
        const signOutContainer = document.createElement('div');
        signOutContainer.className = 'auth-btn hide sign-out-btn site-btn primary-bg rounded-corners';

        const profilePic = document.createElement('span');
        profilePic.id = 'profile-pic';

        const userName = document.createElement('p');
        userName.id = 'user-name';
        
        const signOutBtn = document.createElement('button');
        signOutBtn.textContent = 'Sign out';

        signOutContainer.appendChild(profilePic);
        signOutContainer.appendChild(userName);
        signOutContainer.appendChild(signOutBtn);

        /* hamburger icon for mobile display */
        const barsBtn = document.createElement('button');
        barsBtn.className = 'hide';
        barsBtn.id = 'hamburger-logo';

        const barsIcon = document.createElement('i');
        barsIcon.innerHTML = icon({ prefix: 'fas', iconName: 'bars'}).html;
        
        barsBtn.appendChild(barsIcon);
        
        rightSideWrapper.appendChild(signInBtn);
        rightSideWrapper.appendChild(signOutContainer);
        rightSideWrapper.appendChild(barsBtn);

        header.appendChild(siteNameWrapper);
        header.appendChild(rightSideWrapper);

        /* MAIN PAGE AREA */
        const main = document.createElement('main');
        main.className = 'primary-bg';
        
        /* SIDE BAR */
        const sideBar = document.createElement('aside');
        sideBar.className = 'hide neutral-bg';
        sideBar.id = 'side-bar';

        /* task sorting links */
        const categorySection = document.createElement('section');
        
        const categoryBtns = document.createElement('ul');
        categoryBtns.id = 'category-btns';

        categorySection.appendChild(categoryBtns);

        /* section with links to projects and button to add new projects */
        const projectSection = document.createElement('section');
        
        const h2 = document.createElement('h2');
        h2.textContent = 'Projects';

        /* list of project links */
        const projects = document.createElement('ul');
        projects.id = 'projects';

        /* add project button */
        const addProjectContainer = document.createElement('div');
        addProjectContainer.className = 'primary-bg site-btn rounded-corners';
        addProjectContainer.id = 'add-project-container';
        
        const addIcon = document.createElement('i');
        addIcon.innerHTML = icon({ prefix: 'fas', iconName: 'plus'}).html;
        
        const addSpan = document.createElement('span');
        addSpan.textContent = 'Add new project';

        addProjectContainer.appendChild(addIcon);
        addProjectContainer.appendChild(addSpan);
    
        /* input area to display upon click of add project button */
        const projectInputWrapper = document.createElement('div');
        projectInputWrapper.className = 'hide site-btn primary-bg rounded-corners';
        projectInputWrapper.id = 'add-project-input';

        const projectInput = document.createElement('input');
        projectInput.type = 'text';
        projectInput.placeholder = 'Enter project name';
        projectInput.maxLength = '30';

        const projectValidateBtn = document.createElement('button');
        projectValidateBtn.type = 'button';
        projectValidateBtn.id = 'project-validate';

        const projectValidateIcon = document.createElement('i');
        projectValidateIcon.innerHTML = icon({ prefix: 'fas', iconName: 'check'}).html;
        
        projectValidateBtn.appendChild(projectValidateIcon);

        const projectCancelBtn = document.createElement('button');
        projectCancelBtn.type = 'button';
        projectCancelBtn.id = 'project-cancel';

        const projectCancelIcon = document.createElement('i');
        projectCancelIcon.innerHTML = icon({ prefix: 'fas', iconName: 'times'}).html;
        projectCancelBtn.appendChild(projectCancelIcon);

        projectInputWrapper.appendChild(projectInput);
        projectInputWrapper.appendChild(projectValidateBtn);
        projectInputWrapper.appendChild(projectCancelBtn);

        projectSection.appendChild(h2);
        projectSection.appendChild(projects);
        projectSection.appendChild(addProjectContainer);
        projectSection.appendChild(projectInputWrapper);

        sideBar.appendChild(categorySection);
        sideBar.appendChild(projectSection);

        /* CONTENT AREA */
        const contentArea = document.createElement('section');
        contentArea.id = 'content-area';

        main.appendChild(sideBar);
        main.appendChild(contentArea);

        /* add header and main to page body */
        target.appendChild(header);
        target.appendChild(main);
    };

    const populateSideBar = (target, items) => {
        items.map(item => {
            const li = document.createElement('li');
            li.className = 'rounded-corners';
            
            const link = document.createElement('a');
            link.className = 'site-btn';
            link.href = '#';

            // ensure a project id exists before adding to anchor element as data
            if (item.projectId) {
                li.dataset.projectId = item.projectId;
            }

            // ensure that an icon exists and insert it into anchor
            if (item.icon1Class) {
                const icon = document.createElement('i');
                icon.innerHTML = item.icon1Class;

                link.appendChild(icon);
            }

            // ensure that a second icon exists, create delete project button,
            // and insert into anchor
            if (item.icon2Class) { // implies the items being rendered are project names
                // sets background color
                li.classList.add('primary-bg');
                
                // insert text into anchor as h3 element after first icon
                const heading = document.createElement('h3');
                heading.textContent = item.label;
                
                const btn = document.createElement('button');
                btn.className = 'delete-project';
                btn.dataset.projectId = item.projectId;

                const icon = document.createElement('i');
                icon.innerHTML = item.icon2Class;
                btn.appendChild(icon);

                link.appendChild(heading);
                link.appendChild(btn);
            } else { // implies the items being rendered are category names
                // sets background color
                li.classList.add('secondary-bg');
                
                // insert text into anchor as h2 element after icon above
                const heading = document.createElement('h2');
                heading.textContent = item.label;
                link.appendChild(heading);
            }

            // insert anchor into list element
            li.appendChild(link);
            
            target.appendChild(li);
        });
    };

    /* renders list of tasks according to sorting criterion, or tasks for a
    specific project */
    const renderContentArea = (target, projects, tasks, title=null) => {
        // header for content area section
        const header = document.createElement('header');
        
        /* applies to sorted lists of tasks */
        if (title) {
            const heading = document.createElement('h2');
            heading.id = 'content-label'
            heading.textContent = title;
            header.appendChild(heading);
            target.appendChild(header);
        }

        projects.map(project => {
            // container with project icon and project name
            const nameWrapper = document.createElement('div');
            nameWrapper.className = 'name-wrapper';

            const nameIcon = document.createElement('i');
            nameIcon.innerHTML = icon({ prefix: 'fas', iconName: 'tasks'}).html;
            nameWrapper.appendChild(nameIcon);

            // task add button for each project
            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.className = 'task-add-btn primary-bg';
            addBtn.textContent = '+';
            addBtn.dataset.projectId = project.id;

            // list of tasks for each project
            const listWrapper = document.createElement('ul');
            listWrapper.dataset.projectId = project.id;
            // retrieve tasks matching project currently being rendered
            const projectTasks = tasks.filter(task => {
                if (task.projectId === project.id) return true;
                return false;
            });
            // insert matching tasks into ul element
            renderTaskList(listWrapper, projectTasks);
            
            if (title) {  // a title implies a sorted list of tasks based on criterion
                /* insert project name and task add button into a 
                sub-container */
                const projectHeader = document.createElement('div');
                projectHeader.className = 'project-header';
                
                // create project name as h3 element
                const projectName = document.createElement('h3');
                projectName.textContent = project.name;
                nameWrapper.appendChild(projectName);
                
                projectHeader.appendChild(nameWrapper);
                projectHeader.appendChild(addBtn);
                
                // insert sub-container into article element
                const article = document.createElement('article');
                article.appendChild(projectHeader);
                article.appendChild(listWrapper);

                // insert article element into content area section
                target.appendChild(article);
            } else { // no title implies the content is only one project
                // create project name as h2 element
                const projectName = document.createElement('h2');
                projectName.textContent = project.name;
                nameWrapper.appendChild(projectName);
                
                /* for project only, insert project name and task add button
                directly into content area header */
                header.appendChild(nameWrapper);
                header.appendChild(addBtn);
                
                // insert content area header into content area section
                target.appendChild(header);
                // insert list of tasks into content area section
                target.appendChild(listWrapper);
            }
        });
    };

    const renderTaskList = (target, tasks) => {
        tasks.map(task => {
            renderTask(target, task);
        });
    };

    const renderTask = (target, task) => {
        // container for left side of task
        const leftSide = document.createElement('div');
        leftSide.className = 'left';
        
        // container for both bullet point and check sign
        const bulletWrapper = document.createElement('div');
        bulletWrapper.className = 'bullet-point';

        // circle-shaped bullet point before task name
        const circle = document.createElement('span');
        circle.className = 'check-circle';

        // check sign that appears when hovering over bullet point
        const checkMark = document.createElement('i');
        checkMark.className = 'check-mark';
        checkMark.innerHTML = icon({ prefix: 'fas', iconName: 'check'}).html;
        checkMark.dataset.taskId = task.id;

        // insert bullet point and check sign into a common container
        bulletWrapper.appendChild(circle);
        bulletWrapper.appendChild(checkMark);
        
        // name of task
        const taskLabel = document.createElement('p');
        taskLabel.className = 'task-label';
        taskLabel.textContent = task.name;

        /* insert bullet point/check sign wrapper and task name into common
        container */
        leftSide.appendChild(bulletWrapper);
        leftSide.appendChild(taskLabel);

        // container for right side of task
        const rightSide = document.createElement('div');
        rightSide.className = 'right';

        const date = document.createElement('p');
        date.className = 'task-date';
        // handle due date whether one was selected or not
        if (task.dueDate !== '') {
            date.textContent = format(task.dueDate, 'MM/dd/yyyy');
        } else {
            date.textContent = 'no due date';
        }
        
        // container for flag icon
        const priorityWrapper = document.createElement('div');
        priorityWrapper.className = 'priority-level';
        // flag icon indicating task priority
        const flagIcon = document.createElement('i');
        flagIcon.className = `${task.priority}-priority`;
        flagIcon.innerHTML = icon({ prefix: 'fas', iconName: 'flag'}).html;
        priorityWrapper.appendChild(flagIcon);
        
        // edit button to modify task which contains an icon
        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'task-edit-btn';
        editBtn.dataset.taskId = task.id;

        const editIcon = document.createElement('i');
        editIcon.innerHTML = icon({ prefix: 'far', iconName: 'edit'}).html;
        editBtn.appendChild(editIcon);

        /* insert due date, priority flag, and edit button into common 
        container */
        rightSide.appendChild(date);
        rightSide.appendChild(priorityWrapper);
        rightSide.appendChild(editBtn);

        if (!target.matches('li')) { // implies a new task is being created
            const taskWrapper = document.createElement('li');
            taskWrapper.dataset.taskId = task.id;
            taskWrapper.className = 'task-wrapper neutral-bg rounded-corners';

            // insert left and right sides into task container
            taskWrapper.appendChild(leftSide);
            taskWrapper.appendChild(rightSide);
            
            // insert task container into ul element in DOM
            target.appendChild(taskWrapper)
        } else { // implies an existing task is being updated
            target.removeAttribute('id');
            
            // insert left and right sides into task container in DOM
            target.appendChild(leftSide);
            target.appendChild(rightSide);
        }
    };

    const showProjectInput = () => {
        const projectInput = document.getElementById('add-project-input');
        projectInput.classList.remove('hide');
    };

    const showAddProjectBtn = () => {
        const projectAdd = document.getElementById('add-project-container');
        projectAdd.classList.remove('hide');
    };

    const hideProjectInput = () => {
        const projectInput = document.getElementById('add-project-input');
        projectInput.classList.add('hide');
    };

    const hideAddProjectBtn = () => {
        const projectAdd = document.getElementById('add-project-container');
        projectAdd.classList.add('hide');
    };

    /* renders input fields when a task is either created for the first time
    or edited */
    const renderNewTask = (target, task=null) => {
        if (task) {
            target.id = 'edit-task-container';
        }

        // input for task name
        const taskName = document.createElement('input');
        taskName.className = 'rounded-corners';
        taskName.id = 'new-task-name';
        taskName.type = 'text';
        taskName.placeholder = 'Enter task name here'
        taskName.maxLength = '40';
        if (task) taskName.value = task.name;

        // container for date input and clear date button
        const dateWrapper = document.createElement('div');

        const dueDate = document.createElement('input');
        dueDate.className = 'rounded-corners';
        dueDate.id = 'new-task-due-date';
        dueDate.type = 'date';
        if (task && task.dueDate !== '') {
            dueDate.value = format(task.dueDate, 'yyyy-MM-dd');
        } else {
            dueDate.value = '';
        }

        const resetDate = document.createElement('button');
        resetDate.className = 'rounded-corners';
        resetDate.type = 'button'
        resetDate.id = 'new-task-date-reset';
        resetDate.textContent = 'Clear';

        // insert date input and clear date button in common container
        dateWrapper.appendChild(dueDate);
        dateWrapper.appendChild(resetDate);

        // container with three flag icons for each level of task priority
        const priorityWrapper = document.createElement('div');
        priorityWrapper.id = 'new-task-priority-wrapper';
        
        const PRIORITY_LEVELS = ['low', 'medium', 'high'];
        /* create custom radio input for flag icons to ensure one of the three
        is always selected */
        PRIORITY_LEVELS.map((level, index) => {
            // container for both radio input and flag icon
            const flagWrapper = document.createElement('label');
            
            const flagInput = document.createElement('input');
            flagInput.type = 'radio';
            flagInput.name = 'priority';
            flagInput.value = level;
            if (task && task.priority === level) {
                flagInput.checked = true;
            }
            if (index === 0 && !task) flagInput.checked = true;

            const flagIcon = document.createElement('i');
            flagIcon.className = `${level}-priority`;
            flagIcon.innerHTML = icon({ prefix: 'fas', iconName: 'flag'}).html;
            
            // insert radio input and flag icon into common container
            flagWrapper.appendChild(flagInput);
            flagWrapper.appendChild(flagIcon);
            
            // insert every flag container into a common container
            priorityWrapper.appendChild(flagWrapper);
        });

        // container for both validation and cancel buttons
        const btnWrapper = document.createElement('div');

        // button to save task input, which contains its own icon
        const taskValidateBtn = document.createElement('button');
        taskValidateBtn.type = 'button';
        taskValidateBtn.id = 'new-task-validate';

        // check mark icon for validation
        const taskValidateIcon = document.createElement('i');
        taskValidateIcon.innerHTML = icon({ prefix: 'fas', iconName: 'check'}).html;
        taskValidateBtn.appendChild(taskValidateIcon);

        // button to remove entire new task container
        const taskCancelBtn = document.createElement('button');
        taskCancelBtn.type = 'button';
        taskCancelBtn.id = 'new-task-cancel';

        // "x" icon for cancellation
        const taskCancelIcon = document.createElement('i');
        taskCancelIcon.innerHTML = icon({ prefix: 'fas', iconName: 'times'}).html;
        taskCancelBtn.appendChild(taskCancelIcon);
        
        // insert both validation and cancel buttons into a common container
        btnWrapper.appendChild(taskValidateBtn);
        btnWrapper.appendChild(taskCancelBtn);

        target.appendChild(taskName);
        target.appendChild(dateWrapper);
        target.appendChild(priorityWrapper);
        target.appendChild(btnWrapper);
    };

    const createNewTask = (target, projectId) => {
        const newTaskWrapper = document.createElement('div');
        newTaskWrapper.className = 'neutral-bg rounded-corners task-wrapper';
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

    const fadeOut = (target, delay) => {
        target.classList.add('fade-out');
        setTimeout(() => {
            deleteElement(target);
        }, delay);
    };

    const showSideBar = (target) => {
        target.classList.remove('hide');
    };

    const hideSideBar = (target) => {
        target.classList.add('hide');
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
        fadeOut, 
        showSideBar, 
        hideSideBar,
    };
})();

export default dom;