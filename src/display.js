const display = (() => {

    const renderMain = (target) => {
        const header = document.createElement('header');
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

        const addProjectBtn = document.createElement('div');
        addProjectBtn.id = 'add-project-btn';
        const addIcon = document.createElement('i');
        addIcon.className = 'fas fa-plus';
        const addSpan = document.createElement('span');
        addSpan.textContent = 'Add project';
        addProjectBtn.appendChild(addIcon);
        addProjectBtn.appendChild(addSpan);
        
        sideBar.appendChild(addProjectBtn);


        const contentArea = document.createElement('div');
        contentArea.id = 'content-area';

        target.appendChild(header);
        target.appendChild(sideBar);
        target.appendChild(contentArea);
    };

    const populateSideBar = (target, items) => {
        items.map(item => {
            const li = document.createElement('li');

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

    return {renderMain, populateSideBar};
})();

export default display;