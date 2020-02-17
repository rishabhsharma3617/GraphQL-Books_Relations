const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const app = express()



///////////////////////////////Connecting with the database//////////////////////////////////////////////////
mongoose.connect('mongodb+srv://rishabh3617:rishabh3617@rishabhsharma-essaz.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(()=> { console.log('Connected wth mongodb')})
.catch(err => {
    console.log(err.message)
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////




app.use('/graphql', graphqlHTTP({
    schema,
    graphiql : true
}))


app.listen(3000, () => {
    console.log("Server is successfully running on the port 3000 , Now make the Project")
})