const express = require('express')
const graphqlHTTP = require('express-graphql')

app.use('/graphql', graphqlHTTP({
    
}))











const app = express()

app.listen(3000, () => {
    console.log("Server is successfully running on the port 3000 , Now make the Project")
})