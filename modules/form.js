import { formState, clearFormState } from './exportOnly/formState.js';
import { addFormNameEl, addFormTextEl } from './exportOnly/elements.js';

export function initFormListeners() {
    addFormNameEl.addEventListener('input', () => {
        formState.userName = addFormNameEl.value;
    });

    addFormTextEl.addEventListener('input', () => {
        formState.userComment = addFormTextEl.value;
    });
}

export function validateForm() {
    return (
        formState.userName.trim().length >= 3 &&
        formState.userComment.trim().length >= 3
    );
}

export function clearForm() {
    addFormNameEl.value = '';
    addFormTextEl.value = '';

    clearFormState();
}
