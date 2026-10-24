import { comments, setComments } from './exportOnly/comments.js';
import { getCommentsFromApi, postCommentToApi } from './api.js';

export function loadComments() {
    return getCommentsFromApi().then((apiComments) => {
        const preparedComments = apiComments.map((comment) => {
            return {
                id: comment.id,
                name: comment.author.name,
                date: comment.date,
                text: comment.text,
                likes: comment.likes,
                isLiked: comment.isLiked,
            };
        });

        setComments(preparedComments);
    });
}

export function addComment(name, text) {
    return postCommentToApi(name, text).then(() => {
        return loadComments();
    });
}

export function toggleLike(commentIndex) {
    const comment = comments[commentIndex];

    comment.likes += comment.isLiked ? -1 : 1;
    comment.isLiked = !comment.isLiked;
}
