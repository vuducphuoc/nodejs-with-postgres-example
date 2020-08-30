const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    'todos', // database name
    'postgres', // username
    'loveyou0205', // password
    {
        dialect: 'postgres', // tên cơ sở dữ liệu
        host: 'localhost', // địa chỉ IP
        operatorsAliases: false, // bỏ lỗi warning
        pool: {
            max: 5, // số lượt truy cập max
            min: 0,
            require: 30000,
            idle: 10000
        }
    }
)

const Op = Sequelize.Op;

module.exports = {
    sequelize, Op
}