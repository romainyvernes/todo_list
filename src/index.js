/* stylesheets */
import './styles/reset.css';
import './styles/main.css';
/* fontawesome icons */
import './assets/icons/fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core';
/* components */
import dom from './components/dom';
/* firebase server */
import firebase from "firebase/app";
import './components/firebase';
/*******************/
/* date-fns library */
import { addDays, isWithinInterval, parseISO, compareAsc } from 'date-fns';

const app = (() => {
    const renderMain = (target) => {
        dom.renderMain(target);
    };

    const renderCategories = (target) => {
        const CATEGORIES = [
            {label: 'All tasks', icon1Class: icon({ prefix: 'fas', iconName: 'inbox'}).html},
            {label: 'Today', icon1Class: icon({ prefix: 'fas', iconName: 'calendar-day'}).html},
            {label: 'Next 7 days', icon1Class: icon({ prefix: 'fas', iconName: 'calendar-week'}).html}
        ];
        dom.populateSideBar(target, CATEGORIES);
    };

    const renderProjects = (target) => {
        if (!isUserSignedIn()) return;
        
        return firebase.firestore()
        .collection('projects')
        .where('userId', '==', getUserId())
        .orderBy('name')
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                dom.populateSideBar(target, [{
                    label: doc.data().name,
                    icon1Class: icon({ prefix: 'fas', iconName: 'folder-open'}).html,
                    icon2Class: icon({ prefix: 'fas', iconName: 'trash-alt'}).html,
                    projectId: doc.id
                }]);
            });
        }).catch((error) => {
            console.error('Error retrieving projects', error);
        });
    };

    const renderAllTasks = (target) => {
        if (!isUserSignedIn()) return;

        return firebase.firestore()
        .collection('projects')
        .where('userId', '==', getUserId())
        .orderBy('name')
        .get()
        .then((snapshot) => {
            const projects = [];
            snapshot.forEach((doc) => {
                projects.push({
                    ...doc.data(),
                    id: doc.id
                });
            });
            return Promise.resolve(projects);
        }).then((projects) => {
            return firebase.firestore().collection('tasks').get().then((snapshot) => {
                const tasks = (
                    sortByDate(
                        sortByPriority(
                            snapshot.docs.reduce((arr, doc) => {
                                const task = {...doc.data()};
                                task.id = doc.id;
                                
                                if (task.dueDate !== '') {
                                    task.dueDate = task.dueDate.toDate();
                                }
                                
                                arr.push(task);
                                return arr;
                            }, [])
                        )
                    )
                );
                
                const label = document.querySelectorAll('#category-btns h2')[0].textContent;
                dom.renderContentArea(target, projects, tasks, label);
            });
        }).catch((error) => {
            console.error('Error retrieving projects and tasks', error);
        });
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

    const renderByTimespan = (target, startDate, endDate, title) => {
        if (!isUserSignedIn()) return;

        return firebase.firestore().collection('tasks')
        .where('userId', '==', getUserId())
        .get()
        .then((snapshot) => {
            if (snapshot.docs.length > 0) {
                // get array of all tasks
                const taskArr = snapshot.docs.reduce((arr, doc) => {
                    const task = doc.data();
                    task.id = doc.id;

                    if (task.dueDate !== '') {
                        task.dueDate = task.dueDate.toDate();
                    }

                    arr.push(task);
                    return arr;
                }, []);
                
                // filter tasks based on dates passed in
                const filteredTasks = filterTasksByTimespan(taskArr, startDate, endDate);
                
                // retrieve projects' data from DB and pass into render const with tasks
                return firebase.firestore().collection('projects')
                .get()
                .then((snapshot) => {
                    const projects = snapshot.docs
                    .filter((doc) => (
                        filteredTasks.some((task) => task.projectId === doc.id)
                    ))
                    .map((doc) => {
                        return {
                            ...doc.data(),
                            id: doc.id
                        };
                    });
                    
                    dom.renderContentArea(
                        target, 
                        projects, 
                        filteredTasks, 
                        title
                    );
                });
            } else {
                dom.renderContentArea(target, [], [], title);
            }
        }).catch((error) => {
            console.error('Error retrieving tasks and projects', error);
        });
    };

    const renderToday = async (target) => {
        const startDate = new Date().setHours(0, 0, 0, 0);
        const endDate = new Date().setHours(23, 59, 59, 999);
        const label = document.querySelectorAll('#category-btns h2')[1].textContent;
        await renderByTimespan(target, startDate, endDate, label);
    };

    const renderWeek = async (target) => {
        const startDate = new Date().setHours(0, 0, 0, 0);
        const endDate = addDays(startDate, 6).setHours(23, 59, 59, 999);
        const label = document.querySelectorAll('#category-btns h2')[2].textContent;
        await renderByTimespan(target, startDate, endDate, label);
    };

    const renderProjectById = (target, projectId) => {
        if (!isUserSignedIn()) return;

        return firebase.firestore()
        .collection('projects')
        .get()
        .then((snapshot) => {
            for (let i = 0; i < snapshot.docs.length; i++) {
                if (snapshot.docs[i].id === projectId) {
                    return Promise.resolve(snapshot.docs[i].data());
                }
            }
        }).then((project) => {
            return firebase.firestore().collection('tasks')
                .where('projectId', '==', projectId)
                .get().then((querySnapshot) => {
                    const sortedTasks = (
                        sortByDate(
                            sortByPriority(
                                querySnapshot.docs.reduce((arr, doc) => {
                                    const task = doc.data();
                                    task.id = doc.id;

                                    if (task.dueDate !== '') {
                                        task.dueDate = task.dueDate.toDate();
                                    }

                                    arr.push(task);
                                    return arr;
                                }, [])
                            )
                        )
                    );
            
                    dom.renderContentArea(
                        target, 
                        [{
                            ...project,
                            id: projectId
                        }], 
                        sortedTasks
                    );
                });
        }).catch((error) => {
            console.error('Error retrieving project and tasks', error);
        });
    };

    const addProject = () => {
        if (!isUserSignedIn()) return;

        const contentContainer = document.getElementById('content-area');
        const projectsContainer = document.getElementById('projects');
        const inputField = document.querySelector('#add-project-input input');

        if (inputField.value === '') return;
        
        return firebase.firestore().collection('projects').add({
            name: inputField.value,
            userId: getUserId()
        }).then((docRef) => {
            inputField.value = '';

            dom.hideProjectInput();
            dom.showAddProjectBtn();
            
            dom.clearContainer(projectsContainer);
            renderProjects(projectsContainer).then(() => {
                createProjectEvents();
                createDeleteProjectEvent();

                dom.clearContainer(contentContainer);
                renderProjectById(contentContainer, docRef.id).then(() => {
                    createAddTaskEvent();
                    createUpdateTaskEvent();
                    createDeleteTaskEvent();
                });
            });
        }).catch((error) => {
            console.error('Error adding new project to database', error);
        });
    };

    const deleteProject = (projectId) => {
        if (!isUserSignedIn()) return;

        return firebase.firestore().collection('projects')
        .get().then((querySnapshot) => {
            for (let i = 0; querySnapshot.docs.length; i++) {
                if (querySnapshot.docs[i].id === projectId) {
                    return Promise.resolve(querySnapshot.docs[i].ref);
                }
            }
        }).then((docRef) => {
            return docRef.delete();
        }).then(() => {
            console.log('Project successfully deleted');
            
            return firebase.firestore().collection('tasks')
                .where('projectId', '==', projectId)
                .get()
        }).then((snapshot) => {
            const promises = [];
            snapshot.forEach((doc) => {
                promises.push(doc.ref.delete());
            });
            return Promise.all(promises);
        }).then(() => {
            console.log('Project\'s tasks successfully deleted');
        })
        .catch((error) => {
            console.error('Error deleting project', error);
        });
    };

    const cancelAddProject = () => {
        const inputField = document.querySelector('#add-project-input input');
        inputField.value = '';
        dom.hideProjectInput();
        dom.showAddProjectBtn();
    };

    const collectTaskData = () => {
        const name = document.getElementById('new-task-name').value;
        
        let dueDate = document.getElementById('new-task-due-date').value;
        if (dueDate !== '') dueDate = parseISO(dueDate);
        
        const priorityFlags = document.querySelectorAll(
            '#new-task-priority-wrapper input[type="radio"]');
        let priority;
        for (let i = 0; i < priorityFlags.length; i++) {
            if (priorityFlags[i].checked) {
                priority = priorityFlags[i].value;
            }
        }
    
        return {
            name,
            dueDate,
            priority,
        }; 
    };

    const addTask = () => {
        if (!isUserSignedIn()) return;

        const addTaskWrapper = document.getElementById('new-task-container');
        const { projectId } = addTaskWrapper.dataset;
        
        const { name, dueDate, priority } = collectTaskData();
        
        if (name === '') return;

        const listWrapper = document.querySelector(
            `#content-area ul[data-project-id="${projectId}"]`);

        return firebase.firestore().collection('tasks').add({
            name,
            dueDate,
            priority,
            projectId,
            userId: getUserId()
        }).then(() => {
            return firebase.firestore()
                .collection('tasks')
                .where('projectId', '==', projectId)
                .get();
        }).then((snapshot) => {
            const sortedTasks = (
                sortByDate(
                    sortByPriority(
                        snapshot.docs.reduce((arr, doc) => {
                            const task = doc.data();
                            task.id = doc.id;
                            
                            if (task.dueDate !== '') {
                                task.dueDate = task.dueDate.toDate();
                            }

                            arr.push(task);
                            return arr;
                        }, [])
                    )
                )
            );
            
            dom.clearContainer(listWrapper);
            dom.deleteElement(addTaskWrapper);
    
            dom.renderTaskList(listWrapper, sortedTasks);
        }).catch((error) => {
            console.error('Error adding new task', error);
        });
    };

    const sortByDate = (tasks) => {
        return tasks.sort((task1, task2) => {
            if (task1.dueDate === '' || task2.dueDate === '') {
                if (task1.dueDate === '' && task2.dueDate === '') {
                    return 0;
                } else if (task1.dueDate === '') {
                    return 1;
                } else if (task2.dueDate === '') {
                    return -1;
                }
            }
            return compareAsc(task1.dueDate, task2.dueDate);
        });
    };

    const sortByPriority = (tasks) => {
        return tasks.sort((task1, task2) => {
            const task1Priority = task1.priority;
            const task2Priority = task2.priority;

            if (task1Priority === task2Priority) return 0;
            if (task1Priority === 'high') return -1;
            if (task1Priority === 'low') return 1;
            if (task1Priority === 'medium' && task2Priority === 'high') return 1;
            if (task1Priority === 'medium' && task2Priority === 'low') return 1;
        });
    };

    const updateTask = () => {
        if (!isUserSignedIn()) return;

        const editTaskWrapper = document.getElementById('edit-task-container');
        const { taskId } = editTaskWrapper.dataset;
        const { name, dueDate, priority } = collectTaskData();

        return firebase.firestore().collection('tasks')
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                if (doc.id === taskId) {
                    return doc.ref.update({
                        name,
                        dueDate,
                        priority
                    }).then(() => {
                        console.log('Task successfully updated');
                        dom.clearContainer(editTaskWrapper);
                        dom.renderTask(editTaskWrapper, {
                            name,
                            dueDate,
                            priority,
                            id: taskId
                        });
                    })
                }
            });
        }).catch((error) => {
            console.error('Error updating task', error);
        });
    };

    const createUpdateTask = (target) => {
        if (!isUserSignedIn()) return;

        const { taskId } = target.dataset;

        return firebase.firestore().collection('tasks')
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                if (doc.id === taskId) {
                    dom.clearContainer(target);
                    
                    const task = {...doc.data()};
                    
                    if (task.dueDate !== '') {
                        task.dueDate = task.dueDate.toDate();
                    } 
                    
                    dom.renderNewTask(target, {
                        ...task,
                        id: taskId
                    });
                }
            });
        }).catch((error) => {
            console.error('Error retrieving task', error);
        });
    };

    const deleteTask = (taskId) => {
        if (!isUserSignedIn()) return;

        return firebase.firestore()
        .collection('tasks')
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                if (doc.id === taskId) {
                    doc.ref.delete().then(() => {
                        console.log('Task successfully deleted');
                    });
                }
            });
        }).catch((error) => {
            console.error('Error deleting task', error);
        });
    };

    const cancelEditAddTask = () => {
        if (!isUserSignedIn()) return;

        const editTaskWrapper = document.getElementById('edit-task-container');
        const { taskId } = editTaskWrapper.dataset;

        return firebase.firestore().collection('tasks')
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                if (doc.id === taskId) {
                    dom.clearContainer(editTaskWrapper);

                    const task = doc.data();

                    if (task.dueDate !== '') {
                        task.dueDate = task.dueDate.toDate();
                    }

                    dom.renderTask(editTaskWrapper, {
                        ...task,
                        id: doc.id
                    });
                }
            });
        }).catch((error) => {
            console.error('Error retrieving task', error);
        });
    };

    const createCategoryEvents = () => {
        const contentContainer = document.getElementById('content-area');
        const categories = document.querySelectorAll('#category-btns li');
        const EVENT_TRIGGER = 'click';

        categories.forEach((categoryEl, index) => {
            categoryEl.addEventListener(EVENT_TRIGGER, async () => {
                dom.clearContainer(contentContainer);

                switch (index) {
                    case 0:
                        await renderAllTasks(contentContainer);
                        break;
                    case 1:
                        renderToday(contentContainer);
                        break;
                    case 2:
                        renderWeek(contentContainer);
                        break;
                    default:
                        throw new Error('Category event cannot be created');
                }

                createAddTaskEvent();
                createUpdateTaskEvent();
                createDeleteTaskEvent();
            });
        });
    };

    // links each project button in side bar to corresponding events
    const createProjectEvents = () => {
        const contentContainer = document.getElementById('content-area');
        const projects = document.querySelectorAll('#projects li');
        const EVENT_TRIGGER = 'click';

        projects.forEach((projectEl) => {
            projectEl.addEventListener(EVENT_TRIGGER, async (event) => {
                dom.clearContainer(contentContainer);

                const { projectId } = event.currentTarget.dataset;
                await renderProjectById(contentContainer, projectId);

                createAddTaskEvent();
                createUpdateTaskEvent();
                createDeleteTaskEvent();
            });
        });
    };

    // links "add new project" button corresponding events
    const createAddProjectEvent = () => {
        const projectBtn = document.getElementById('add-project-container');
        const EVENT_TRIGGER = 'click';

        projectBtn.addEventListener(EVENT_TRIGGER, () => {
            dom.hideAddProjectBtn();
            dom.showProjectInput();

            const validationBtn = document.getElementById('project-validate');
            validationBtn.addEventListener(EVENT_TRIGGER, addProject);

            const cancelBtn = document.getElementById('project-cancel');
            cancelBtn.addEventListener(EVENT_TRIGGER, () => {
                cancelAddProject();
                validationBtn.removeEventListener(EVENT_TRIGGER, addProject);
            });
        });
    };

    const createDeleteProjectEvent = () => {
        const deleteBtns = document.querySelectorAll('.delete-project');
        const contentArea = document.getElementById('content-area');
        const EVENT_TRIGGER = 'click';
        
        deleteBtns.forEach((deleteBtn) => {
            deleteBtn.addEventListener(EVENT_TRIGGER, async (event) => {
                const { projectId } = event.currentTarget.dataset;
                
                await deleteProject(projectId);
                
                const projectEl = document.querySelector(
                    `#projects li[data-project-id="${projectId}"]`
                );
                dom.deleteElement(projectEl);
                dom.clearContainer(contentArea);
                
                await renderAllTasks(contentArea);

                createAddTaskEvent();
                createUpdateTaskEvent();
                createDeleteTaskEvent();
            });
        });
    };

    const clear = () => {
        const clearBtn = document.getElementById('new-task-date-reset');
        clearBtn.addEventListener('click', clearDate);
    };
    const validate = () => {
        const validationBtn = document.getElementById('new-task-validate');
        validateTaskEvent(validationBtn);
    };
    const cancel = () => {
        const cancelBtn = document.getElementById('new-task-cancel');
        cancelTaskEvent(cancelBtn);
    };
    const disable = () => {
        const taskBtns = document.querySelectorAll('.task-add-btn');
        const editBtns = document.querySelectorAll('.task-edit-btn');
        disableBtns(taskBtns);
        disableBtns(editBtns);
    };

    const createAddTaskEvent = () => {
        const taskBtns = document.querySelectorAll('.task-add-btn');
        const EVENT_TRIGGER = 'click';

        taskBtns.forEach((taskBtn) => {
            taskBtn.addEventListener(EVENT_TRIGGER, async (event) => {
                const projectId = event.target.dataset.projectId;
                const projectContainer = document.querySelector(
                    `#content-area ul[data-project-id="${projectId}"]`
                );
                
                dom.createNewTask(projectContainer, projectId);
                clear();
                validate();
                cancel();
                disable();
            });
        });
    };

    const createUpdateTaskEvent = () => {
        const editBtns = document.querySelectorAll('.task-edit-btn');
        const EVENT_TRIGGER = 'click';

        editBtns.forEach((editBtn) => {
            editBtn.addEventListener(EVENT_TRIGGER, async (event) => {
                const taskId = event.currentTarget.dataset.taskId;
                const container = document.querySelector(`li[data-task-id="${taskId}"]`);
                
                dom.clearContainer(container);
                await createUpdateTask(container);

                clear();
                validate();
                cancel();
                disable();
            });
        });
    };

    const disableBtns = (btns) => {
        btns.forEach(btn => btn.disabled = true);
    };

    const enableBtns = (btns) => {
        const inputField = document.getElementById('new-task-name');
        if (inputField) return;

        btns.forEach(btn => btn.disabled = false);
    };

    const clearDate = () => {
        const dateField = document.getElementById('new-task-due-date');
        dateField.value = '';
    };

    const validateTaskEvent = (target) => {
        const newTaskWrapper = document.getElementById('new-task-container');
        
        if (newTaskWrapper) {
            const EVENT_TRIGGER = 'click';

            target.addEventListener(EVENT_TRIGGER, async () => {
                await addTask();
                
                const addTaskBtns = document.querySelectorAll('.task-add-btn');
                const editTaskBtns = document.querySelectorAll('.task-edit-btn');
                
                enableBtns(addTaskBtns);
                enableBtns(editTaskBtns);
                createUpdateTaskEvent();
                createDeleteTaskEvent();
            });
        } else {
            const EVENT_TRIGGER = 'click';

            target.addEventListener(EVENT_TRIGGER, async () => {
                await updateTask();
                
                const addTaskBtns = document.querySelectorAll('.task-add-btn');
                const editTaskBtns = document.querySelectorAll('.task-edit-btn');
                
                enableBtns(addTaskBtns);
                enableBtns(editTaskBtns);
                createUpdateTaskEvent();
                createDeleteTaskEvent();
            });
        }
    };

    const cancelTaskEvent = (target) => {
        const newTaskWrapper = document.getElementById('new-task-container');
        const EVENT_TRIGGER = 'click';
        const addTaskBtns = document.querySelectorAll('.task-add-btn');
        const editTaskBtns = document.querySelectorAll('.task-edit-btn');

        if (newTaskWrapper) {
            target.addEventListener(EVENT_TRIGGER, async () => {
                dom.deleteElement(newTaskWrapper);
                enableBtns(addTaskBtns);
                enableBtns(editTaskBtns);
                createUpdateTaskEvent();
                createDeleteTaskEvent();
            });
        } else {
            target.addEventListener(EVENT_TRIGGER, async () => {
                await cancelEditAddTask();
                enableBtns(addTaskBtns);
                enableBtns(editTaskBtns);
                createUpdateTaskEvent();
                createDeleteTaskEvent();
            });
        }
    };

    const createDeleteTaskEvent = () => {
        const deleteBtns = document.querySelectorAll('.check-mark');
        const EVENT_TRIGGER = 'click';

        deleteBtns.forEach((deleteBtn) => {
            deleteBtn.addEventListener(EVENT_TRIGGER, async (event) => {
                const { taskId } = event.currentTarget.dataset;
                await deleteTask(taskId);
                
                const taskEl = document.querySelector(
                    `#content-area li[data-task-id="${taskId}"]`);
                dom.fadeOut(taskEl, 350);
            });
        });
    };

    const createSideBarToggleEvent = () => {
        const hamburgerBtn = document.getElementById('hamburger-logo');
        const contentArea = document.getElementById('content-area');
        const sideBar = document.getElementById('side-bar');
        const EVENT_TRIGGER = 'click';

        hamburgerBtn.addEventListener(EVENT_TRIGGER, () => {
            sideBar.classList.toggle('slide-in');
        });

        contentArea.addEventListener(EVENT_TRIGGER, () => {
            sideBar.classList.remove('slide-in');
        });
    };

    // links all events upon load. Only meant to be used once.
    const assignInitialEvents = () => {
        createSideBarToggleEvent();
        createCategoryEvents();
        createProjectEvents();
        createDeleteProjectEvent();
        createAddProjectEvent();
        createAddTaskEvent();
        createUpdateTaskEvent();
        createDeleteTaskEvent();
    };

    return {
        renderMain, 
        renderProjects, 
        renderCategories, 
        renderAllTasks,
        assignInitialEvents,
        createProjectEvents,
        createDeleteProjectEvent,
        createAddTaskEvent,
        createUpdateTaskEvent,
        createDeleteTaskEvent,
    };
})();

const body = document.querySelector('body');
app.renderMain(body);

const categoryContainer = document.getElementById('category-btns');
const projectContainer = document.getElementById('projects');
const contentContainer = document.getElementById('content-area');

app.renderCategories(categoryContainer);

/*
 * Firebase authentication
 */

const signInElement = document.querySelector('.sign-in-btn');
const signOutElement = document.querySelector('.sign-out-btn');
const profilePicElement = document.getElementById('profile-pic');
const userNameElement = document.getElementById('user-name');

const signIn = () => {
    // Sign into Firebase using popup auth & Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}
  
// Signs-out of Friendly Chat.
const signOut = () => {
    // Sign out of Firebase.
    firebase.auth().signOut();
}
  
// Initiate firebase auth.
const initFirebaseAuth = () => {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged(authStateObserver);
}
  
// Returns the signed-in user's profile Pic URL.
const getProfilePicUrl = () => {
    return firebase.auth().currentUser.photoURL;
}
  
// Returns the signed-in user's display name.
const getUserName = () => {
    return firebase.auth().currentUser.displayName;
}

// Returns the signed-in user's unique ID
const getUserId = () => {
    return firebase.auth().currentUser.uid;
}
  
// Returns true if a user is signed-in.
const isUserSignedIn = () => {
    return !!firebase.auth().currentUser;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
const authStateObserver = (user) => {
    if (user) { // User is signed in!
        
        // Get the signed-in user's profile pic and name.
        var profilePicUrl = getProfilePicUrl();
        var userName = getUserName();

        // Set the user's profile pic and name.
        profilePicElement.style.backgroundImage = 'url(' + profilePicUrl + ')';
        userNameElement.textContent = userName;
        
        // Show user's profile and sign-out button.
        signOutElement.classList.remove('hide');

        // Hide sign-in button.
        signInElement.classList.add('hide');

        Promise.all([
            app.renderProjects(projectContainer), 
            app.renderAllTasks(contentContainer)
        ]).then(() => {
            app.createProjectEvents();
            app.createDeleteProjectEvent();
            app.createAddTaskEvent();
            app.createUpdateTaskEvent();
            app.createDeleteTaskEvent();
        });
    } else { // User is signed out!
        // Hide user's profile and sign-out button.
        signOutElement.classList.add('hide');

        // Show sign-in button.
        signInElement.classList.remove('hide');

        dom.clearContainer(contentContainer);
        dom.clearContainer(projectContainer);
    }
}

// initialize Firebase
initFirebaseAuth();

if (isUserSignedIn()) {
    Promise.all([
        app.renderProjects(projectContainer), 
        app.renderAllTasks(contentContainer)
    ]).then(() => {
        app.assignInitialEvents();
    });
} else {
    app.assignInitialEvents();
}

signInElement.addEventListener('click', signIn);
signOutElement.addEventListener('click', signOut);