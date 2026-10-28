import { setComments } from './exportOnly/comments.js';
import {
    getCommentsFromApi,
    postCommentToApi,
    toggleLikeInApi,
} from './api.js';

export function loadComments(token) {
    return getCommentsFromApi(token).then((apiComments) => {
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

export function addComment(text, token) {
    return postCommentToApi(text, token).then(() => {
        return loadComments(token);
    });
}

export function toggleLike(commentId, token) {
    return toggleLikeInApi(commentId, token).then(() => {
        return loadComments(token);
    });
}
