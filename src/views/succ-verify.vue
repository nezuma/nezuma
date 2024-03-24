<script>
    export default {
        name: 'succ-verify'
    }
</script>
<template>
    <div class="succ-verify-window">
        <h1 class="success">Успешная верификация</h1>
        <p class="psuccess">Ваш Email успешно подтвержден.</p>
        <a class="button button-under"href="/auth">Перейти к авторизации</a>
    </div>
</template>
<style>
    .succ-verify-window {
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
</style>