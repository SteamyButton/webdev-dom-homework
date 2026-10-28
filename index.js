import { initFormListeners } from './modules/form.js';

import { addFormButtonEl } from './modules/exportOnly/elements.js';

import {
    initLikeListeners,
    initCommentListeners,
    initAddCommentListener,
} from './modules/initListeners.js';

import { renderComments } from './modules/renderComments.js';
import { loadComments } from './modules/commentActions.js';

function renderApp() {
    renderComments();
    initLikeListeners(renderApp);
    initCommentListeners();
}

function startApp() {
    initFormListeners();
    initAddCommentListener(renderApp);

    addFormButtonEl.disabled = true;
    addFormButtonEl.textContent = 'Загрузка...';

    loadComments()
        .then(() => {
            renderApp();
        })
        .catch((error) => {
            if (error.message === 'Сервер сломался') {
                alert('Сервер сломался, попробуй позже');
                return;
            }

            alert('Кажется, у вас сломался интернет, попробуйте позже');
        })
        .finally(() => {
            addFormButtonEl.disabled = false;
            addFormButtonEl.textContent = 'Написать';
        });
}

startApp();

console.log('It works!');
