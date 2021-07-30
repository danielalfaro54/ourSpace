// module.exports ={
//     MONGOURI:"mongodb+srv://DanielA:ucpKyFKVYA7vv5OW@cluster0.e5fxk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//     JWT_SECRET:"effecghasdf3efa"
// }

if(process.env.NODE_ENV=='production'){
    module.exports = require('./prod')
} else {
    module.exports = require('./dev')
}