import { comments } from './exportOnly/comments.js';
import { addFormTextEl, addFormButtonEl } from './exportOnly/elements.js';
import { formState } from './exportOnly/formState.js';
import { addComment, toggleLike } from './commentActions.js';
import { validateForm, clearForm } from './form.js';

export function initLikeListeners(renderApp) {
    const likeButtons = document.querySelectorAll('.like-button');

    likeButtons.forEach((likeButton) => {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation();

            const commentIndex = Number(likeButton.dataset.index);

            toggleLike(commentIndex);

            renderApp();
        });
    });
}

export function initCommentListeners() {
    const commentElements = document.querySelectorAll('.comment');

    commentElements.forEach((commentElement) => {
        commentElement.addEventListener('click', () => {
            const commentIndex = Number(commentElement.dataset.index);
            const comment = comments[commentIndex];

            const quote = `> ${comment.name}: ${comment.text}\n\n`;

            addFormTextEl.value = quote;
            formState.userComment = quote;

            addFormTextEl.focus();
        });
    });
}

export function initAddCommentListener(renderApp) {
    addFormButtonEl.addEventListener('click', async () => {
        if (!validateForm()) {
            alert('Имя и комментарий должны содержать хотя бы 3 символа');
            return;
        }

        const name = formState.userName.trim();
        const text = formState.userComment.trim();

        try {
            addFormButtonEl.disabled = true;
            addFormButtonEl.textContent = 'Добавляем...';

            await addComment(name, text);

            clearForm();
            renderApp();
        } catch (error) {
            alert(error.message);
        } finally {
            addFormButtonEl.disabled = false;
            addFormButtonEl.textContent = 'Написать';
        }
    });
}
