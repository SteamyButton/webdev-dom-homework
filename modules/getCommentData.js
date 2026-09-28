export const formState = {
  userName: "",
  userComment: "",
};

export function initFormListeners(addFormNameEl, addFormTextEl) {
  addFormNameEl.addEventListener("input", () => {
    formState.userName = addFormNameEl.value;
  });

  addFormTextEl.addEventListener("input", () => {
    formState.userComment = addFormTextEl.value;
  });
}

export function getCurrentDate() {
  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = String(currentDate.getFullYear()).slice(-2);
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
