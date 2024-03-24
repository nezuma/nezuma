<script>
    export default {
        name: 'main',
        mounted() {
            document.title = 'Clicker | Игра для всей семьи'
        }
    }
</script>
<template>
      <header>
        <div class="top-column">
            <div class="logo">
                <h1>Clicker Game</h1>
            </div>
            <div class="login-link">
                <a class='button' href="/auth">Login/Register</a>
            </div>
        </div>
    </header>
    <section id="game-description" class="game-description">
        <h2>Вас приветствует Clicker Game</h2>
        <p>
            Clicker Game - это захватывающая кликерная игра, в которой вы можете покупать улучшения и улучшать свой игровой опыт. Нажимайте на экран, чтобы зарабатывать очки и улучшать свои навыки. Испытайте увлекательный геймплей и погрузитесь в мир кликеров!
        </p>
    </section>
    <section id="project-description" class="project-description">
        <h2>О проекте</h2>
        <p>
            Этот проект был разработан компанией F9 Developers. При создании этой страницы применялся искусственный интеллект, который написал код для нее. Мы старались сделать ее максимально удобной и информативной для пользователей. Надеемся, что вы оцените нашу работу и будете наслаждаться игрой!
        </p>
    </section>
    <section id="start-game" class="start-game">
        <a class='button' href="/registration">Start Game</a>
    </section>
    <footer>
        <div class="bottom-column">
            <div class="developers-link">
                <a class='link' href="https://rimworlda.ru/">Сайт разработчиков</a>
            </div>
            <div class="main-link">
                <a class='link' href="https://mistral.com/">Главная страница Mistral</a>
            </div>
        </div>
    </footer>
</template>
<style>
  .logo {
    color: #fff;
    font-size: 15px;
  }
  .top-column {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 1%;
    margin-right: 1%;
  }
  .game-description {
    margin: 2%;
    text-align: center;
    display: grid;
    height: 30vh;
    align-items: center;
    align-content: center;
  }
  .project-description {
    margin: 2%;
    text-align: center;
    display: grid;
    height: 30vh;
    align-items: center;
    align-content: center;
  }
  .start-game {
    margin: 2%;
    text-align: center;
    height: 7vh;
    align-items: center;
    align-content: center;
  }
</style>