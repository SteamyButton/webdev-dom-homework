import { comments } from './exportOnly/comments.js';
import { authState } from './exportOnly/authState.js';
import { escapeHtml } from './exportOnly/escapeHtml.js';
import { formatCommentDate } from './exportOnly/formatCommentDate.js';

function formatCommentText(text) {
    if (!text.startsWith('>')) {
        return escapeHtml(text);
    }

    const textParts = text.split('\n\n');
    const quote = textParts[0];
    const answer = textParts.slice(1).join('\n\n');

    return `
        <blockquote class="comment-quote">
            ${escapeHtml(quote)}
        </blockquote>

        <div class="comment-answer">
            ${escapeHtml(answer)}
        </div>
    `;
}

function getCommentsMarkup() {
    return comments
        .map((comment, index) => {
            return `
                <li
                    class="comment"
                    data-index="${index}"
                >
                    <div class="comment-header">
                        <div>${escapeHtml(comment.name)}</div>

                        <div>
                            ${formatCommentDate(comment.date)}
                        </div>
                    </div>

                    <div class="comment-body">
                        <div class="comment-text">
                            ${formatCommentText(comment.text)}
                        </div>
                    </div>

                    <div class="comment-footer">
                        <div class="likes">
                            <span class="likes-counter">
                                ${comment.likes}
                            </span>

                            <button
                                type="button"
                                class="like-button ${
                                    comment.isLiked ? '-active-like' : ''
                                }"
                                data-index="${index}"
                            ></button>
                        </div>
                    </div>
                </li>
            `;
        })
        .join('');
}

function getAddCommentMarkup() {
    if (!authState.token) {
        return `
            <p class="authorization-message">
                <a href="#" class="authorization-link">
                    Чтобы добавить комментарий,
                    авторизуйтесь
                </a>
            </p>
        `;
    }

    return `
        <form class="add-form">
            <input
                type="text"
                class="add-form-name"
                value="${escapeHtml(authState.user.name)}"
                readonly
            />

            <textarea
                class="add-form-text"
                placeholder="Введите ваш комментарий"
                rows="4"
            ></textarea>

            <div class="add-form-row">
                <button
                    type="submit"
                    class="add-form-button"
                >
                    Написать
                </button>
            </div>
        </form>
    `;
}

export function renderCommentsPage({
    onOpenLogin,
    onAddComment,
    onToggleLike,
}) {
    const appEl = document.querySelector('#app');

    appEl.innerHTML = `
        <div class="container">
            <ul class="comments">
                ${getCommentsMarkup()}
            </ul>

            ${getAddCommentMarkup()}
        </div>
    `;

    const likeButtons = document.querySelectorAll('.like-button');

    likeButtons.forEach((likeButton) => {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation();

            const commentIndex = Number(likeButton.dataset.index);

            const comment = comments[commentIndex];

            onToggleLike(comment.id, likeButton);
        });
    });

    if (!authState.token) {
        const authorizationLinkEl = document.querySelector(
            '.authorization-link',
        );

        authorizationLinkEl.addEventListener('click', (event) => {
            event.preventDefault();
            onOpenLogin();
        });

        return;
    }

    const addFormEl = document.querySelector('.add-form');
    const addFormTextEl = document.querySelector('.add-form-text');
    const addFormButtonEl = document.querySelector('.add-form-button');

    addFormEl.addEventListener('submit', (event) => {
        event.preventDefault();

        const text = addFormTextEl.value.trim();

        if (text.length < 3) {
            alert('Комментарий должен быть не короче 3 символов');
            return;
        }

        onAddComment(text, addFormButtonEl);
    });

    const commentElements = document.querySelectorAll('.comment');

    commentElements.forEach((commentElement) => {
        commentElement.addEventListener('click', () => {
            const commentIndex = Number(commentElement.dataset.index);

            const comment = comments[commentIndex];

            addFormTextEl.value = `> ${comment.name}: ${comment.text}\n\n`;

            addFormTextEl.focus();
        });
    });
}
