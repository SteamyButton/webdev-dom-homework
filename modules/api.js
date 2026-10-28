const commentsUrl =
    'https://wedev-api.sky.pro/api/v1/alexander-kovbas/comments';

export function getCommentsFromApi() {
    return fetch(commentsUrl)
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер сломался');
            }

            return response.json();
        })
        .then((data) => {
            return data.comments;
        });
}

export function postCommentToApi(name, text) {
    return fetch(commentsUrl, {
        method: 'POST',
        body: JSON.stringify({
            name,
            text,
        }),
    }).then((response) => {
        if (response.status === 500) {
            throw new Error('Сервер сломался');
        }

        if (response.status === 400) {
            throw new Error('Плохой запрос');
        }
        return response.json();
    });
}
