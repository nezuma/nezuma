<script>
    export default {
        name: 'succ-register'
    }
</script>
<template>
    <div class="succ-register-window">
        <h1 class="success">Регистрация прошла успешно!</h1>
        <p class="psuccess">Ваш аккаунт успешно зарегистрирован, вам придет сообщение на почту, для подтверждения перейдите по ссылке в сообщении.</p>
        <a href="/auth" class="button button-under">Авторизоваться</a>
    </div>
</template>
<style>
    .succ-register-window {
        background: #1e1e2d;
        height: 300px;
        width: 600px;
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
    .button-under {
        margin-top: 50px
    }
    .success {
        margin-bottom: 25px;
    }
</style>