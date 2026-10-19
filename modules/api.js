const commentsUrl =
    'https://wedev-api.sky.pro/api/v1/alexander-kovbas/comments';

export async function getCommentsFromApi() {
    const response = await fetch(commentsUrl);

    if (!response.ok) {
        throw new Error('Не удалось загрузить комментарии');
    }

    const data = await response.json();

    return data.comments;
}

export async function postCommentToApi(name, text) {
    const response = await fetch(commentsUrl, {
        method: 'POST',

        body: JSON.stringify({
            name,
            text,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Не удалось добавить комментарий');
    }

    return data;
}
