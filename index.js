import { initFormListeners } from "./modules/getCommentData.js";
import {
  addFormNameEl,
  addFormTextEl,
  initLikeListeners,
  initCommentListeners,
  initAddCommentListener,
} from "./modules/initListeners.js";
import { renderComments } from "./modules/renderComments.js";

function renderApp() {
  renderComments();
  initLikeListeners(renderApp);
  initCommentListeners();
}

initFormListeners(addFormNameEl, addFormTextEl);
initAddCommentListener(renderApp);

renderApp();

console.log("It works!");
