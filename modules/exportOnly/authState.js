export const authState = {
    token: null,
    user: null,
};

export function setAuth(token, user) {
    authState.token = token;
    authState.user = user;
}
