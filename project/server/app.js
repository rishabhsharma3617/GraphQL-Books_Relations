const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

//Allow cross-origin requests from diferent servers
app.use(cors())

///////////////////////////////Connecting with the database//////////////////////////////////////////////////
mongoose.connect('mongodb+srv://rishabh3617:rishabh3617@rishabhsharma-essaz.mongodb.net/Books_GrpahQL?retryWrites=true&w=majority',{
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


app.listen(4000, () => {
    console.log("Server is successfully running on the port 3000 , Now make the Project")
})