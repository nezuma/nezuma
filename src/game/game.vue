<script>
export default {
    name: 'game',
    data() {
        return {
            coincount: 0,
            username: '',
            showChatIcon: true,
            showNewsIcon: true,
            showChat: false,
            showNews: false,
            popupProfile: false,
            usernames: [],
            texts: [],
            succmail: ''
        }
    },
    methods: {
        /*Коины из бд*/
        async coincountget() {
            const response = await fetch('/api/coinget', {
                method: 'post', 
                headers: {
                    'Accept': 'applicax tion/json','Content-Type': 'application/json'
                }
            }).then(res => res.json()).catch((err) => null);
            this.coincount = response.coins;
        },
        /*Счетчик+запись коинов*/
        async counter() {
            const response = await fetch('/api/coin', {
                method: 'post',
                body: JSON.stringify({
                    coins: this.coincount
                }),
                headers: {
                    'Accept': 'applicax tion/json','Content-Type': 'application/json'
                }
            }).then(res => res.json()).catch((err) => null);
            this.coincount = response.coins;
        },
        /*чат*/
        async sendmessage() {
            const response = await fetch('/game', {
                method: 'post', 
                body: JSON.stringify({
                    text: document.querySelector('form').querySelector('[name="text"]').value
                }),
                headers: {
                    'Accept': 'applicax tion/json','Content-Type': 'application/json'
                }
            }).then(res => res.json()).catch(err => err).then(response => {
                if(response.status == 200) return document.querySelector('form').querySelector('[name="text"]').value = "", alert(response.message);
            })
            this.getmessages();
        },
        async getmessages() {
            const response = await fetch('/api/getchat', {
                method: 'post', 
                headers: {
                    'Accept': 'applicax tion/json','Content-Type': 'application/json'
                }
            }).then(res => res.json()).catch((err) => null);
            this.usernames = response.username;
            this.texts = response.text;
        },
        toggleChat() {
            this.showChatIcon = !this.showChatIcon;
            this.showNewsIcon = !this.showNewsIcon;
            this.showChat = !this.showChat;
        },
        toggleNews() {
            this.showChatIcon = !this.showChatIcon;
            this.showNewsIcon = !this.showNewsIcon;
            this.showNews = !this.showNews;
        },
        hideChatandNews() {
            if(this.showChat) this.showChat = !this.showChat;    
            if(!this.showChatIcon) this.showChatIcon = !this.showChatIcon;
            if(this.showNews) this.showNews = !this.showNews;
            if(!this.showNewsIcon) this.showNewsIcon = !this.showNewsIcon;
        }, 
        toggleProfile() {
            this.popupProfile = !this.popupProfile;
        }
    },
    computed: {
        messages() {
            return this.usernames.map((username, index) => ({
                username,
                text: this.texts[index],
            }));
        }
    },
    created() {
        this.coincountget();
        this.getmessages();
    },
}
</script>
<template>
    <header class="header">
        <div class="top-column">
            <div class="logo">Clicker</div>
            <div class="coins" id="counter">
                <img src="../assets/coins-solid.svg" class="coin-icon">
                <span class="coins-count" id="counter1">{{ coincount }}</span>
            </div>
            <div class="profile-tile" id="profile-tile" @click="toggleProfile">
                <span class="username">nezuma</span>
                <div class="avatar"></div>
            </div>
            <div class="popup-profile" style="display:none" id="popup-profile" v-show="popupProfile">
                <a href="/profile" class="link">Настройки профиля</a>
                <a href="https://vk.com/f9dev" class="link">Связь с нами</a>
            </div>
        </div>
    </header>
    <section class="section-1">
        <div class="sns-block">
            <img src="../assets/comment-dots-solid.svg" class="chat-icon" id="chat-icon" v-show="showChatIcon" @click="toggleChat">
            <div class="chat" style="display:none" v-show="showChat">
                <div class="output">
                    <p v-for="(message, index) in messages" :key="index">
                        {{ message.username }}: {{ message.text }}
                    </p>
                </div>
                <div class="sendmessage">
                    <span class="close" @click="hideChatandNews">Х</span>
                    <form action="/game" method="post" onsubmit="event.preventDefault();">
                        <input type="text" name="text" class="input" placeholder="Сообщение"> 
                        <button class="button" @click="sendmessage">Send</button>
                    </form>
                </div>
            </div>
            <img src="../assets/newspaper-regular.svg" class="news-icon" id="news-icon" v-show="showNewsIcon" @click="toggleNews">
        </div>
        <div class="click-button-inner" @click="counter" onsubmit="event.preventDefault();" >
            <button class="click-button" onsubmit="event.preventDefault();">Click</button>
        </div>
    </section>
</template>
<style>
.coin-icon {
    height: 15px;
}
.chat-icon {
    position: absolute;
    left: 15px;
    height: 30px;
    cursor: pointer;
    z-index: 2;
}
.news-icon {
    position: absolute;
    left: 15px;
    height: 30px;
    margin-top: 45px;
    cursor: pointer;
    z-index: 3;
}
.section-1 {
    display: flex;
    justify-content: center;
    margin-top: 20%;
}
.click-button {
    border-radius: 100%;
    width: 120px;
    height: 120px;
}
.chat {
    background: #1c1c2c;
    width: 300px;
    height: 95%;
    position: absolute;
    left: 0;
    top: 25px;
    padding: 20px 10px;
}
.sendmessage {
    display: flex;
    justify-content: space-around;
}
.output {
    height: 90%;
    overflow: overlay;
    overflow-y: auto;
    scroll-behavior: smooth;
}
.close {
    position: absolute;
    top: 1px;
    left: 275px;
    cursor: pointer;
}
.profile-tile {
    display: flex;
    margin-top: 15px;
    margin-bottom: 15px;
    align-items: center;
    border-radius:15px;
    background: #1c1c2c;
    padding: 10px 25px;
    cursor: pointer;
    transition: all .3s !important;
    z-index: 1;
}
.profile-tile:hover {
    background: #26263b;
}
.avatar {
    height: 35px;
    border-radius: 100%;
    background: #333;
    width: 35px;
    
}
.username {
    margin-right: 25px;
}
.popup-profile {
    position: absolute;
    background: #1c1c2c;
    width: 250px;
    height: 200px;
    right: 15px;
    top: 85px;
    border-radius: 25px;
    padding: 25px;
    box-shadow: 0 0 5px #000;
}
</style>