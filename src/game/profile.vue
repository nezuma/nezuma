<script>
    export default {
        name: 'profile'
    }
</script>
<template>
    <div class="main-page">
        <div class="settings-page">
            <div class="settings-header"><h1>Настройки профиля</h1></div>
            <div class="main-wrapper">
                <div class="left-settings">
                    <a href="/game" class="button">Вернуться к игре</a>
                </div>
                <div class="main-settings">
                    test
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .main-page {
        display: flex;
        width: 100%;
        height: 100%;
    }
    .settings-page {
        height: 150px;
        width: 80%;
        background: #28283d;
        margin: 0 auto;
        margin-top: 2%;
        padding: 25px;
        border-radius: 25px;
    }
    .settings-header {
        text-align: center;
        border-bottom: 1px solid;
    }
    .main-wrapper {
        display: flex;
    }
    .left-settings {
        width: 20%;
        border-right: 1px solid;
        margin-top: 1%;
    }
    .main-settings {
        margin-top: 1%;
        margin-left: 1%;
    }
</style>