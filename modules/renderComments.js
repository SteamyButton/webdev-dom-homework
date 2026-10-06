import { comments } from "./comments.js";
import { escapeHtml } from "./escapeHtml.js";

const commentsEl = document.querySelector(".comments");

function formatCommentText(text) {
  if (!text.startsWith(">")) {
    return escapeHtml(text);
  }

  const textParts = text.split("\n\n");
  const quote = textParts[0];
  const answer = textParts.slice(1).join("\n\n");

  return `
        <blockquote class='comment-quote'>
          ${escapeHtml(quote)}
        </blockquote>

        <div class='comment-answer'>
          ${escapeHtml(answer)}
        </div>
      `;
}

export function renderComments() {
  const newComment = comments
    .map((comment, index) => {
      return `
        <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${escapeHtml(comment.name)}</div>
            <div>${comment.date}</div>
          </div>

          <div class="comment-body">
            <div class="comment-text">
              ${formatCommentText(comment.text)}
            </div>
          </div>

          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${comment.isLiked ? "-active-like" : ""}" data-index="${index}"></button>
            </div>
          </div>
        </li>
      `;
    })
    .join("");

  commentsEl.innerHTML = newComment;
}
