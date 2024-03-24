<script>
    export default {
        name: 'auth',
        methods: {
          async authentification() {
            const response = await fetch('/auth', {
              method: 'post',
              body: JSON.stringify({
                username: document.querySelector('form').querySelector('[name="username"]').value,
                password: document.querySelector('form').querySelector('[name="password"]').value
              }),
              headers: {'Accept': 'applicax tion/json','Content-Type': 'application/json'},
            }).then(res => res.json()).catch(err => err).then(response => {
              if(response.status == 200) {
                window.location.href = '/game';
              } else if (response.status == 202) {
                window.location.href = '/env';
              } else {
                return alert(response.message);
              }
            }).catch(err => {
              console.error(err)
            });
          }
        },
        mounted() {
            document.title = 'Clicker | Авторизация'
        }
    }
</script>
<template>
    <section id="auth-section" class="auth-section">
        <div class="auth-window">
            <div class="auth-title-container">
                <h2>Авторизация</h2>
            </div>
            <div class="auth-form">
                <form method="post">
                    <label for="username">Имя пользователя:</label><br>
                    <input class='input' type="text" id="username" name="username" placeholder="Имя пользователя"><br>
                    <label for="password">Пароль:</label><br>
                    <input class='input' type="password" id="password" name="password" placeholder="Пароль"><br>
                    <input class="button button-space" type="button" value="Войти" @click="authentification">
                </form>
            </div>
            <div class="registration-link">
                <a class="link" href="/registration">Еще не зарегистрированы?</a>
            </div>
        </div>
    </section>
</template>
<style>
  .auth-window {
    background: #1e1e2d;
    display: grid;
    height: 300px;
    width: 300px;
    border-radius: 25px;
    margin: 5% auto;
  }
  .auth-form {
    display: grid;
    text-align: center;
  }
  .auth-title-container {
    text-align: center;
    border-bottom: 1px solid gray;
    place-self: center;
  }
  .button-space {
    margin-top: 20px;
    width: 61%;
    border-radius: 25px;
  }
  .registration-link {
    border-top: 1px solid gray;
    place-self: center;
  }
</style>