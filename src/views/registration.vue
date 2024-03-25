<script>
    export default {
        name: 'register',
        methods: {
          async registration() {
            const response = await fetch('/registration', {
              method: 'post',
              body: JSON.stringify({
                username: document.querySelector('form').querySelector('[name="username"]').value,
                password: document.querySelector('form').querySelector('[name="password"]').value,
                email: document.querySelector('form').querySelector('[name="email"]').value,
                confirm_password: document.querySelector('form').querySelector('[name="confirm-password"]').value
              }),
              headers: {'Accept': 'application/json','Content-Type': 'application/json'},
              }).then(res => res.json()).catch(err => err).then(response => {
              if(response.status != 200) {
                return alert(response.message);
              }
              else {
                window.location.href = '/succ-register';
              }
            }).catch(err => {
              console.error(err)
            })
          },
        },
        mounted() {
            document.title = 'Clicker | Регистрация';
        }
    }
</script>
<template>
    <section id="registration-section" class="registration-section">
    <div class="registration-window">
        <div class="registration-title-container">
            <h2>Регистрация</h2>
        </div>
        <div class="registration-form">
            <form method="post" action="/registration" onsubmit="event.preventDefault();">
                <label for="username">Имя пользователя:</label><br>
                <input class='input' type="text" id="username" name="username" placeholder="Введите ник"><br>
                <label for="email">Электронная почта:</label><br>
                <input class='input' type="email" id="email" name="email" placeholder="example@example.ru"><br>
                <label for="password">Пароль:</label><br>
                <input class='input' type="password" id="password" name="password" placeholder="Введите пароль"><br>
                <label for="confirm-password">Подтвердите пароль:</label><br>
                <input class='input' type="password" id="confirm-password" name="confirm-password" placeholder="Повторите пароль"><br>
                <input class="button button-space" type="button" @click="registration" value="Зарегистрироваться">
            </form>
        </div>
        <div class="login-link">
            <a class='link' href="/auth">Уже зарегистрированы?</a>
        </div>
    </div>
</section>
</template>
<style>
  .registration-window {
    background: #1e1e2d;
    display: grid;
    height: 400px;
    width: 300px;
    border-radius: 25px;
    margin: 5% auto;
  }
  .registration-form {
    display: grid;
    text-align: center;
  }
  .registration-title-container {
    text-align: center;
    border-bottom: 1px solid gray;
    place-self: center;
  }
  .login-link {
    border-top: 1px solid gray;
    place-self: center;
  }
</style>