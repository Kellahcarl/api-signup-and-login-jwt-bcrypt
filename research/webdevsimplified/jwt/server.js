require('dotenv').config()
const express = require ('express')
const app =express()


const jwt =require('jsonwebtoken')

app.use(express.json())

const posts = [
    {
        username:'kyle',
        title: 'post1'
    },
    {
        username:'caleb',
        title: 'post2'
    },
]


app.get('/posts',authenticateToken,(req,res)=> {
    res.json(posts.filter (post => post.username === req.user.name))
    // res.json(posts)
})

app.post('/login',(req,res )=> {
    //authenticate user
    const username = req.body.username
    const user ={ name:username }

    const accessToken = jwt.sign(user , process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken})
})

function authenticateToken(req,res,next) {
    const authHeader = req.headers['authorization']
    //ensuring we have a valid token
    const token =authHeader && authHeader.split(' ')[1]
    
    if (token == null ) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err ,user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })

}


app.listen(3000)