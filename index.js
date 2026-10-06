import { initFormListeners } from "./modules/form.js";

import {
  initLikeListeners,
  initCommentListeners,
  initAddCommentListener,
} from "./modules/initListeners.js";

import { renderComments } from "./modules/renderComments.js";
import { loadComments } from "./modules/commentActions.js";

function renderApp() {
  renderComments();
  initLikeListeners(renderApp);
  initCommentListeners();
}

async function startApp() {
  initFormListeners();
  initAddCommentListener(renderApp);

  try {
    await loadComments();
    renderApp();
  } catch (error) {
    alert(error.message);
  }
}

startApp();

console.log('It works!');