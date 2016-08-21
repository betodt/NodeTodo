var configValues = require('./config');

module.exports = {
    
    getDbConnectionString: function() {
        return 'mongodb://localhost:27017/nodetodosample';
    }
    
}