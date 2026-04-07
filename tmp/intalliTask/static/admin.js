const API_BASE_URL = 'http://localhost:8080/api';
const usersTableBody = document.getElementById('users-table-body');
const tasksTableBody = document.getElementById('tasks-table-body');
const logoutButton = document.getElementById('logout-button');

/**
 * A helper function to get the JWT from localStorage.
 */
const getToken = () => {
    return localStorage.getItem('jwtToken');
};

/**
 * A helper function to decode the JWT and get the user's roles.
 */
const getUserInfo = () => {
    const token = getToken();
    if (!token) return null;
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        console.error('Failed to decode token:', e);
        return null;
    }
};

/**
 * A centralized fetch function to automatically add the auth header.
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


/**
 * Fetches and displays all users.
 */
const fetchAndDisplayUsers = async () => {
    try {
        const response = await authenticatedFetch(`${API_BASE_URL}/users`);
        const users = await response.json();
        usersTableBody.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email || 'N/A'}</td>
                <td><button class="btn btn-danger delete-user-btn" data-id="${user.id}">Delete</button></td>
            `;
            usersTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to fetch users:', error);
    }
};

/**
 * Fetches and displays all tasks in the system.
 */
const fetchAndDisplayAllTasks = async () => {
    try {
        const response = await authenticatedFetch(`${API_BASE_URL}/admin/tasks`);
        const tasks = await response.json();
        tasksTableBody.innerHTML = '';
        tasks.forEach(task => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.id}</td>
                <td>${task.title}</td>
                <td>${task.completed ? 'Completed' : 'Pending'}</td>
                <td><button class="btn btn-danger delete-task-btn" data-id="${task.id}">Delete</button></td>
            `;
            tasksTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to fetch all tasks:', error);
    }
};


/**
 * Handles clicks on delete buttons for users.
 */
const handleUsersTableClick = async (event) => {
    if (event.target.classList.contains('delete-user-btn')) {
        const userId = event.target.dataset.id;
        if (confirm(`Are you sure you want to delete user ${userId}?`)) {
            try {
                await authenticatedFetch(`${API_BASE_URL}/admin/users/${userId}`, {
                    method: 'DELETE'
                });
                event.target.closest('tr').remove(); // Remove row from table
            } catch (error) {
                console.error('Failed to delete user:', error);
                alert('Could not delete user.');
            }
        }
    }
};

/**
 * Handles clicks on delete buttons for tasks.
 */
const handleTasksTableClick = async (event) => {
    if (event.target.classList.contains('delete-task-btn')) {
        const taskId = event.target.dataset.id;
        if (confirm(`Are you sure you want to delete task ${taskId}?`)) {
            try {
                await authenticatedFetch(`${API_BASE_URL}/admin/tasks/${taskId}`, {
                    method: 'DELETE'
                });
                event.target.closest('tr').remove(); // Remove row from table
            } catch (error) {
                console.error('Failed to delete task:', error);
                alert('Could not delete task.');
            }
        }
    }
};

/**
 * Handles logout.
 */
const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = 'login.html';
};


// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    const userInfo = getUserInfo();
    // Protect the page: if not an admin, redirect.
    if (!userInfo || userInfo.sub !== 'admin') {
        alert('Access denied.');
        window.location.href = 'dashboard.html';
        return;
    }

    fetchAndDisplayUsers();
    fetchAndDisplayAllTasks();
});

logoutButton.addEventListener('click', handleLogout);
usersTableBody.addEventListener('click', handleUsersTableClick);
tasksTableBody.addEventListener('click', handleTasksTableClick);