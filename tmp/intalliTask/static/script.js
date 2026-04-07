// ===================================================================================
// CONFIGURATION & GLOBAL VARIABLES
// ===================================================================================
const API_BASE_URL = 'http://localhost:8080/api';

// --- Page Elements ---
const taskList = document.getElementById('task-list');
const newTaskForm = document.getElementById('new-task-form');
const assigneeSelect = document.getElementById('task-assignee');
const themeSwitcher = document.getElementById('theme-switcher');
const logoutButton = document.getElementById('logout-button');

// --- Modal Elements ---
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-task-form');
const closeModalButton = document.querySelector('.close-button');
const editTaskId = document.getElementById('edit-task-id');
const editTaskTitle = document.getElementById('edit-task-title');
const editTaskDescription = document.getElementById('edit-task-description');

// ===================================================================================
// HELPER FUNCTIONS
// ===================================================================================

/**
 * Retrieves the JWT from local storage.
 * @returns {string|null} The token or null if not found.
 */
const getToken = () => {
    return localStorage.getItem('jwtToken');
};

/**
 * A centralized fetch function to automatically add the auth header.
 * @param {string} url - The URL to fetch.
 * @param {object} options - The options for the fetch request.
 * @returns {Promise<Response>}
 */
const authenticatedFetch = (url, options = {}) => {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(url, { ...options, headers });
};

// ===================================================================================
// API & RENDER FUNCTIONS
// ===================================================================================

/**
 * Fetches all tasks from the API and renders them on the page.
 */
const fetchAndDisplayTasks = async () => {
    try {
        const response = await authenticatedFetch(`${API_BASE_URL}/tasks`);
        if (!response.ok) {
            if (response.status === 403 || response.status === 401) {
                window.location.href = 'login.html';
            }
            return;
        }
        const tasks = await response.json();
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const category = task.category || 'General';
            const assigneeInfo = task.assigneeUsername ? `<p class="assignee">Assigned to: <strong>${task.assigneeUsername}</strong></p>` : '';

            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.dataset.id = task.id;
            if (task.completed) {
                taskItem.classList.add('completed');
            }

            taskItem.innerHTML = `
                <div class="task-content">
                    <h3>${task.title}</h3>
                    <p>${task.description || ''}</p>
                    ${assigneeInfo}
                </div>
                <div class="task-details">
                    <div>
                        <span class="category ${category.toLowerCase()}">${category}</span>
                        <span class="priority ${task.priority.toLowerCase()}">${task.priority}</span>
                    </div>
                    <div class="task-actions">
                        <button class="btn btn-secondary complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                        <button class="btn btn-primary edit-btn">Edit</button>
                        <button class="btn btn-danger delete-btn">Delete</button>
                    </div>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
    }
};

/**
 * Fetches all users and populates the assignee dropdown menu.
 */
const populateAssigneeDropdown = async () => {
    try {
        const response = await authenticatedFetch(`${API_BASE_URL}/users`);
        if (!response.ok) throw new Error('Could not fetch users.');
        
        const users = await response.json();
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.username;
            assigneeSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Failed to populate users dropdown:', error);
    }
};

// ===================================================================================
// EVENT HANDLERS
// ===================================================================================

/**
 * Handles adding a new task.
 */
const handleAddTask = async (event) => {
    event.preventDefault();
    const title = document.getElementById('new-task-title').value;
    const description = document.getElementById('new-task-description').value;
    const assigneeId = assigneeSelect.value;

    if (!title || !assigneeId) {
        alert('Please provide a title and select an assignee.');
        return;
    }

    try {
        await authenticatedFetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            body: JSON.stringify({ title, description, assigneeId }),
        });
        newTaskForm.reset();
        fetchAndDisplayTasks();
    } catch (error) {
        console.error('Failed to add task:', error);
    }
};

/**
 * Handles clicks on complete, edit, and delete buttons.
 */
const handleTaskListClick = async (event) => {
    const taskItem = event.target.closest('.task-item');
    if (!taskItem) return;
    const taskId = taskItem.dataset.id;

    if (event.target.classList.contains('delete-btn')) {
        await authenticatedFetch(`${API_BASE_URL}/tasks/${taskId}`, { method: 'DELETE' });
        taskItem.remove();
    } else {
        const response = await authenticatedFetch(`${API_BASE_URL}/tasks/${taskId}`);
        const task = await response.json();

        if (event.target.classList.contains('edit-btn')) {
            editTaskId.value = task.id;
            editTaskTitle.value = task.title;
            editTaskDescription.value = task.description;
            editModal.style.display = 'block';
        } else if (event.target.classList.contains('complete-btn')) {
            // Create a clean payload for the DTO
            const payload = {
                title: task.title,
                description: task.description,
                assigneeId: task.assignee ? task.assignee.id : task.assigneeId,
                priority: task.priority,
                category: task.category,
                completed: !task.completed
            };
            await authenticatedFetch(`${API_BASE_URL}/tasks/${taskId}`, {
                method: 'PUT',
                body: JSON.stringify(payload),
            });
            fetchAndDisplayTasks();
        }
    }
};

/**
 * Handles form submission for updating a task.
 */
const handleUpdateTask = async (event) => {
    event.preventDefault();
    const id = editTaskId.value;
    const title = editTaskTitle.value;
    const description = editTaskDescription.value;

    const response = await authenticatedFetch(`${API_BASE_URL}/tasks/${id}`);
    const taskToUpdate = await response.json();
    
    // Prepare payload matching TaskRequest DTO
    const payload = {
        title: title,
        description: description,
        assigneeId: taskToUpdate.assignee ? taskToUpdate.assignee.id : taskToUpdate.assigneeId,
        priority: taskToUpdate.priority,
        category: taskToUpdate.category,
        completed: taskToUpdate.completed
    };

    await authenticatedFetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
    editModal.style.display = 'none';
    fetchAndDisplayTasks();
};

/**
 * Handles logout by clearing the token and redirecting to the login page.
 */
const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = 'login.html';
};

// ===================================================================================
// DARK MODE LOGIC
// ===================================================================================

const setTheme = (theme) => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
};

themeSwitcher.addEventListener('click', () => {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const newTheme = isDarkMode ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
});

// ===================================================================================
// INITIALIZATION & EVENT LISTENERS
// ===================================================================================

document.addEventListener('DOMContentLoaded', () => {
    if (!getToken()) {
        window.location.href = 'login.html';
        return;
    }
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    fetchAndDisplayTasks();
    populateAssigneeDropdown();
});

// --- Event Listeners for Forms and Modals ---
newTaskForm.addEventListener('submit', handleAddTask);
taskList.addEventListener('click', handleTaskListClick);
closeModalButton.addEventListener('click', () => editModal.style.display = 'none');
editForm.addEventListener('submit', handleUpdateTask);
logoutButton.addEventListener('click', handleLogout);
window.onclick = (event) => {
    if (event.target == editModal) {
        editModal.style.display = 'none';
    }
};