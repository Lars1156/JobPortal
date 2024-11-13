const monggose = require ('mongoose');
async function connection(uri){
   await monggose.connect(uri);
}
module.exports = {connection}