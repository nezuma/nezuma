<script>
    export default {
        name: 'env',
        mounted() {
          document.title = "Clicker | На верификации"
        }
    }
</script>
<template>
    <div class="env-window">
      <h1 class="success">Подтвердите почту</h1>
      <p class="psuccess">Мы отправили письмо с ссылкой для подтверждения вашей почты.</p>
      <p class="psuccess">Проверьте свою почту и перейдите по ссылке для завершения регистрации.</p>
      <p class="psuccess">Если вы не смогли найти во входящих, проверьте СПАМ.</p>
      <a class="button button-under" href="/main">Вернуться на главную страницу</a>
    </div>
</template>
<style>
  .env-window {
    background: #1e1e2d;
    height: 300px;
    width: 650px;
    border-radius: 25px;
    padding: 1%;
    margin: 5% auto;
    text-align: center;
    display: flex;
    align-content: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>