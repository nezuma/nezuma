//*********************************************//
//  _ __    ___  ____ _   _  _ __ ___    __ _  //
// |  _ \  / _ \|_  /| | | ||  _   _ \  / _  | //
// | | | ||  __/ / / | |_| || | | | | || (_| | //
// |_| |_| \___|/___| \____||_| |_| |_| \____| //
//                                             //
//*********************************************//

// Подключение библиотек
const express = require('express');
const app = express();
const path = require('path');
const sessions = require('express-session');
const requestIp = require('request-ip');
const mysql = require('./data/mysql.js');
const bodyParser = require('body-parser');
const temp = path.join(__dirname, './index.html');
const hash = require('crypto-js');
const nodemailer = require('nodemailer');
// Подключение библиотек
/***********************************************************************/
app.set('trust proxy', 1);
app.use(express.static(path.join(__dirname, './')));
app.use(requestIp.mw());
app.use(bodyParser.json());     
app.use(bodyParser.urlencoded({extended: true}));
/***********************************************************************/
// Кукисы
app.use(sessions({
    secret: 'your_secret_code',
    cookie: { 
        secure: true, 
        maxAge: 86400000, 
        httpOnly: true,
        domain: 'clicker.rimworlda.ru',
        path: '/'
    },
    resave: false,
    saveUninitialized: false,
}));
// Кукисы
/***********************************************************************/
// GET (отображение страниц)
app.get('/:page', (req, res) => {
    switch (req.params.page) {
        case 'main':
            res.sendFile(temp);
            break;
        case 'registration':
            res.sendFile(temp);
            break;
        case 'auth':
            res.sendFile(temp);
            break;
        case 'succ-register':
            res.sendFile(temp);
            break;
        case 'game':
            if (req.session && !req.session.User) return res.redirect('/auth');
            res.sendFile(temp);
            break;
        case 'env':
            res.sendFile(temp);
            break;
        case 'succ-verify':
            res.sendFile(temp);
            break;
        default:
            res.redirect('/main');
            break;
    };
});
// GET (отображение страниц)
/***********************************************************************/
// Подключение почты
async function sendToken(email, token) {
    const transporter = nodemailer.createTransport({
        host: 'host',
        port: 465,
        secure: true,
        auth: {
            user: 'example@example.com',
            pass: 'pass',
        },
        tls: {
            // servername: 'rimworlda.ru',
            rejectUnauthorized: false,
        }
    });
    await transporter.sendMail({
        from: '"Rimworlda" <help@rimworlda.ru>',
        to: `${email}`,
        subject: 'Письмо с подтверждением',
        text: 'Перейдите по ссылке, для подтверждения почты...',
        html:
            `Нажмите на ссылку, чтобы подтвердить свою учетную запись: https://clicker.rimworlda.ru/verification/${token}`,
    });
}
// Подключение почты
/***********************************************************************/
// Регистрация
app.post('/registration', async (req, res) => {
    let data = req.body;
    const token_mass = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var token = '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!data.username) return res.status(422).send({message: 'Введите логин'});
    if(!data.email) return res.status(422).send({message: 'Введите почту'});
    if(!data.password) return res.status(422).send({message: 'Введите пароль'});
    if(data.password !== data.confirm_password) return res.status(422).send({message: 'Пароли не совпадают'});
    const existingUser = await mysql.Users.findOne({ where: {username: data.username}, raw: true});
    if (existingUser) return res.status(400).send({message: 'Пользователь с таким именем уже существует'});
    const existingEmail = await mysql.Users.findOne({ where: {email: data.email}, raw: true})
    if (existingEmail) return res.status(400).send({message: 'Пользователь с такой почтой уже существует'});
    if (!emailRegex.test(data.email)) return res.status(422).send({message: 'Формат почты: example@example.ru'});
    const hashedPassword = await hash.MD5(data.password).toString().toUpperCase();
    for(var i = 0; i < 24; i++) { 
      var x = Math.floor(Math.random() * token_mass.length);
      token += token_mass[x];
    }
    await sendToken(data.email, token);
    const newUser = await mysql.Users.create({
        username: data.username,
        password: hashedPassword,
        email: data.email,
        token: token
    });
    return res.status(200).send({status: 200});
});
// Регистрация
/***********************************************************************/
// Проверка авторизационных данных
async function PanelAuthorization(username, password) {
    let userauth = await mysql.Users.findOne({
        where: {
            username: username,
            password: hash.MD5(password).toString()
        }, attributes: ['*'], raw: true
    });
    if (!userauth) return {
        username: username,
        auth: false,
        reason: JSON.stringify({ message: 'Неверный логин или пароль'})
    };
    return {
        username: username,
        id: userauth.id,
        auth: true
    };
};
// Проверка авторизационных данных
/***********************************************************************/
// Авторизация
app.post('/auth', async (req, res) => {
    let data = req.body;
    if (!data.username) return res.status(404).send({message: 'Введите имя пользователя'});
    if (!data.password) return res.status(404).send({message: 'Введите пароль'});
    let userauth = await mysql.Users.findOne({where: {username: data.username}});
    if(!userauth) return res.status(404).send({message: 'Пользователь не найден'});
    const result = await mysql.Users.findOne({where:{username: data.username},attributes: ['*'],raw: true});
    const verify = await mysql.Users.findOne({where:{username: data.username},attributes: ['verification'], raw: true});
    let check = await PanelAuthorization(data.username, data.password);
    if(!check.auth) {
        return res.status(422).send(check.reason).end(); 
    } else if(verify.verification == 0) {
        res.status(202).send({status: 202});
    } else if(result && verify.verification == 1) {
        req.session.User = {
            name: check.username,
            uuid: hash.MD5(`RWHashtroll2033:)|${check.username}|PANELAUTH|${check.id}rwhashtroll:)`).toString(),
        };
        await req.session.save();
        res.status(200).send({status: 200});
    } else {
        return res.status(404).send({message: 'Пользователь не найден'});
    }
});
// Авторизация
/***********************************************************************/
// Подтверждение почты
app.get('/verification/:token', async (req, res) => {
    let urltoken = req.params.token;
    const token = await mysql.Users.findOne({ where: { token: urltoken }});
    if (token) {
        await mysql.sequelize.query(`UPDATE Users SET verification = 1 WHERE token = '${urltoken}'`);
        await mysql.sequelize.query(`UPDATE Users SET token = null WHERE token = '${urltoken}'`);
        res.redirect('/succ-verify');
    } else {
        res.redirect('/registration');
    }
});
// Подтверждение почты
/***********************************************************************/
// Отправка коинов клиенту
app.post('/api/coinget', async(req, res) => {
    let username = req.session.User.name
    var coins = await mysql.sequelize.query(`SELECT coins FROM Users WHERE username = '${username}'`);
    coins = coins.flat(Infinity);
    coins = coins[1].coins;
    return res.status(200).send({coins: coins});
});
// Отправка коинов клиенту
/***********************************************************************/
// Запись коинов по нажатию
app.post('/api/coin', async(req, res) => {
    let username = req.session.User.name;
    var coins = await mysql.sequelize.query(`SELECT coins FROM Users WHERE username = '${username}'`);
    coins = coins.flat(Infinity);
    coins = coins[1].coins;
    coins++
    await mysql.sequelize.query(`UPDATE Users SET coins = '${coins}' WHERE username = '${username}'`);
    return res.status(200).send({coins: coins})
});
// Запись коинов по нажатию 
/***********************************************************************/
// Создание сообщений в чате
app.post('/game', async(req, res) => {
    let data = req.body;
    let username = req.session.User.name;
    if(!data.text) return res.status(400).send({status: 400});
    const newNode = await mysql.Chat.create({
        username: username,
        text: data.text
    });
    return res.status(200).send({status: 'Сообщение успешно отправлено'});
});
// Создание сообщений в чате
/***********************************************************************/
// Подгрузка сообщений
app.post('/api/getchat', async(req, res) => {
    let messages = await mysql.sequelize.query(`SELECT * FROM Chat`);
    messages = messages[1];
    let username = {};
    let text = {}
    for(let i = 0; i < messages.length; i++) {
        username += messages[i].username + " ";
        text += messages[i].text + " ";
    }
    username = username.split(' ');
    username.shift();
    username.shift();
    username.pop();
    text = text.split(' ');
    text.shift();
    text.shift();
    text.pop();
    return res.status(200).send({username: username, text: text});
});
// Подгрузка сообщений
/***********************************************************************/
// Новост

// Новости
/***********************************************************************/









// Порт сервера
app.listen(5190, () => {
});