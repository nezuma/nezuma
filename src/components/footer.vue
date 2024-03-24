<script>
    export default {
        name: 'footer'
    }
</script>
<template>
    <footer>
        <div class="bottom-column">
            <div class="developers-link">
                <a href="https://rimworlda.ru/">Сайт разработчиков</a>
            </div>
            <div class="main-link">
                <a href="https://mistral.com/">Главная страница Mistral</a>
            </div>
        </div>
    </footer>
</template>
<style>
    footer {
      background-color: #333;
      color: #fff;
      padding: 20px;
      text-align: center;
    }

    .bottom-column {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }

    .developers-link a,
    .main-link a {
      color: #fff;
      text-decoration: none;
      font-weight: bold;
      padding: 5px 10px;
      border-radius: 5px;
      transition: all 0.3s ease;
    }

    .developers-link a:hover,
    .main-link a:hover {
      background-color: #555;
    }
</style>