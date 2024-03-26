const { database } = require('data');
const { Sequelize, DataTypes, QueryTypes,Op } = require('sequelize');
const sequelize = new Sequelize(database.db_name, database.db_usr_name, database.db_pass, {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    logging: false
});
const queryInterface = sequelize.getQueryInterface();
sequelize.authenticate().then(() => {
    console.info('Подключение к DataBase.');
}).catch(err => {
    console.fatal(`Ошибка database:\nCode: ${err.parent.code}\nMessage: ${err.parent.sqlMessage}`);
    process.exit(1);
});
//Модели бд
const Users = sequelize.define('Users', {
    username: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    coins: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    verification: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});
const Chat = sequelize.define('Chat', {
    username: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});
let force = false;
let alter = false;
Users.sync({force: force, alter: alter});

module.exports = {Op,Sequelize,QueryTypes,DataTypes,sequelize,queryInterface,Users,Chat}