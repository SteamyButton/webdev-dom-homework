import { authState, setAuth } from './modules/exportOnly/authState.js';

import {
    loadComments,
    addComment,
    toggleLike,
} from './modules/commentActions.js';

import { loginUser } from './modules/api.js';

import { renderCommentsPage } from './modules/renderCommentsPage.js';

import { renderLogin } from './modules/renderLogin.js';

function showError(error) {
    if (error.message === 'Сервер сломался') {
        alert('Сервер сломался, попробуйте позже');
        return;
    }

    if (error.message === 'Плохой запрос') {
        alert('Комментарий должен быть не короче 3 символов');
        return;
    }

    if (error.message === 'Пользователь не авторизован') {
        alert('Для добавления комментария нужно войти');
        showLoginPage();
        return;
    }

    alert('Кажется, у вас сломался интернет, попробуйте позже');
}

function renderApp() {
    renderCommentsPage({
        onOpenLogin: showLoginPage,
        onAddComment: handleAddComment,
        onToggleLike: handleToggleLike,
    });
}

function handleToggleLike(commentId, likeButtonElement) {
    if (!authState.token) {
        alert('Чтобы поставить лайк, авторизуйтесь');
        showLoginPage();
        return;
    }

    likeButtonElement.disabled = true;

    toggleLike(commentId, authState.token)
        .then(() => {
            renderApp();
        })
        .catch((error) => {
            showError(error);
        })
        .finally(() => {
            likeButtonElement.disabled = false;
        });
}

function handleAddComment(text, buttonElement) {
    buttonElement.disabled = true;
    buttonElement.textContent = 'Добавляем...';

    addComment(text, authState.token)
        .then(() => {
            renderApp();
        })
        .catch((error) => {
            showError(error);
        })
        .finally(() => {
            buttonElement.disabled = false;
            buttonElement.textContent = 'Написать';
        });
}

function handleLogin(login, password, loginButtonElement) {
    if (!login || !password) {
        alert('Введите логин и пароль');
        return;
    }

    loginButtonElement.disabled = true;
    loginButtonElement.textContent = 'Входим...';

    loginUser(login, password)
        .then((response) => {
            setAuth(response.user.token, response.user);

            return loadComments(authState.token);
        })
        .then(() => {
            renderApp();
        })
        .catch((error) => {
            if (error.message === 'Неверный логин или пароль') {
                alert('Неверный логин или пароль');
                return;
            }

            showError(error);
        })
        .finally(() => {
            loginButtonElement.disabled = false;
            loginButtonElement.textContent = 'Войти';
        });
}

function showLoginPage() {
    renderLogin({
        onLogin: handleLogin,
        onBack: renderApp,
    });
}

function startApp() {
    const appEl = document.querySelector('#app');

    appEl.innerHTML = `
        <div class="container">
            <p>Загрузка комментариев...</p>
        </div>
    `;

    loadComments(null)
        .then(() => {
            renderApp();
        })
        .catch((error) => {
            showError(error);
        });
}

startApp();

console.log('It works!');
