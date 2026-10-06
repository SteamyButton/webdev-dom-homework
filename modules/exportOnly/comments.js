export const comments = [];

export function setComments(newComments) {
    comments.splice(0, comments.length, ...newComments);
}
