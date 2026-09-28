import { formState, getCurrentDate } from "./getCommentData.js";
import { comments } from "./comments.js";

export const addFormNameEl = document.querySelector(".add-form-name");
export const addFormTextEl = document.querySelector(".add-form-text");
export const addFormButtonEl = document.querySelector(".add-form-button");

export function initLikeListeners(renderApp) {
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const commentIndex = Number(likeButton.dataset.index);
      const comment = comments[commentIndex];

      if (comment.isLiked) {
        comment.likes -= 1;
        comment.isLiked = false;
      } else {
        comment.likes += 1;
        comment.isLiked = true;
      }

      renderApp();
    });
  });
}

export function initCommentListeners() {
  const commentElements = document.querySelectorAll(".comment");

  commentElements.forEach((commentElement) => {
    commentElement.addEventListener("click", () => {
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
  addFormButtonEl.addEventListener("click", () => {
    if (
      formState.userName.trim() === "" ||
      formState.userComment.trim() === ""
    ) {
      alert("Введите имя и комментарий");
      return;
    }

    const newComment = {
      name: formState.userName,
      date: getCurrentDate(),
      text: formState.userComment,
      likes: 0,
      isLiked: false,
    };

    comments.push(newComment);

    addFormNameEl.value = "";
    addFormTextEl.value = "";

    formState.userName = "";
    formState.userComment = "";

    renderApp();
  });
}
