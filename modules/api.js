const commentsUrl =
    'https://wedev-api.sky.pro/api/v2/alexander-kovbas/comments';

const authUrl = 'https://wedev-api.sky.pro/api/user/login';

export function getCommentsFromApi(token) {
    const requestOptions = {};

    if (token) {
        requestOptions.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    return fetch(commentsUrl, requestOptions)
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

export function postCommentToApi(text, token) {
    return fetch(commentsUrl, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text,
        }),
    }).then((response) => {
        if (response.status === 401) {
            throw new Error('Пользователь не авторизован');
        }

        if (response.status === 500) {
            throw new Error('Сервер сломался');
        }

        if (response.status === 400) {
            throw new Error('Плохой запрос');
        }
        return response.json();
    });
}

export function loginUser(login, password) {
    return fetch(authUrl, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        if (response.status === 400 || response.status === 401) {
            throw new Error('Неверный логин или пароль');
        }

        if (response.status === 500) {
            throw new Error('Сервер сломался');
        }

        return response.json();
    });
}

export function toggleLikeInApi(commentId, token) {
    return fetch(`${commentsUrl}/${commentId}/toggle-like`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        if (response.status === 401) {
            throw new Error('Пользователь не авторизован');
        }

        if (response.status >= 500) {
            throw new Error('Сервер сломался');
        }

        return response.json();
    });
}
