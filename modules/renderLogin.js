export function renderLogin({ onLogin, onBack }) {
    const appEl = document.querySelector('#app');

    appEl.innerHTML = `
        <div class="container">
            <div class="login">
                <h2 class="login-title">Вход</h2>

                <form class="login-form">
                    <input
                        type="text"
                        class="login-input"
                        name="login"
                        placeholder="Логин"
                    />

                    <input
                        type="password"
                        class="login-input"
                        name="password"
                        placeholder="Пароль"
                    />

                    <button
                        type="submit"
                        class="login-button"
                    >
                        Войти
                    </button>
                </form>

                <button
                    type="button"
                    class="login-back-button"
                >
                    Вернуться к комментариям
                </button>
            </div>
        </div>
    `;

    const loginFormEl = document.querySelector('.login-form');
    const loginButtonEl = document.querySelector('.login-button');
    const backButtonEl = document.querySelector('.login-back-button');

    loginFormEl.addEventListener('submit', (event) => {
        event.preventDefault();

        const login = loginFormEl.elements.login.value.trim();
        const password = loginFormEl.elements.password.value.trim();

        onLogin(login, password, loginButtonEl);
    });

    backButtonEl.addEventListener('click', () => {
        onBack();
    });
}
