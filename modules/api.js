const commentsUrl =
    'https://wedev-api.sky.pro/api/v1/alexander-kovbas/comments';

export function getCommentsFromApi() {
    return fetch(commentsUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Не удалось загрузить комментарии');
            }

            return response.json();
        })
        .then((data) => {
            return data.comments;
        });
}

export function postCommentToApi(name, text) {
    let serverResponse;

    return fetch(commentsUrl, {
        method: 'POST',
        body: JSON.stringify({
            name,
            text,
        }),
    })
        .then((response) => {
            serverResponse = response;

            return response.json();
        })
        .then((data) => {
            if (!serverResponse.ok) {
                throw new Error(
                    data.error || 'Не удалось добавить комментарий',
                );
            }

            return data;
        });
}
