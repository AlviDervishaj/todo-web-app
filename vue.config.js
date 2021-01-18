const path = require('path');

module.exports = {
    devServer: {
        proxy: {
            '/user': {
                target: "https://todo-web-api.herokuapp.com/"
            },
            '/todo': {
                target: "https://todo-web-api.herokuapp.com/"
            }
        }
    }
}