var configValues = require('./config');

module.exports = {
    
    getDbConnectionString: function() {
        return `mongodb://${ configValues.uname }:${ configValues.pwd }@ds013456.mlab.com:13456/nodetodo`;
    }    
}