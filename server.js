// 'use stric'
const http = require('http')
const debug = require('debug')('nodestr:server')
const express = require('express')

const app = express()
const port = normalizaPort(process.env.PORT || '3000')
app.set('port', port)

const server = http.createServer(app)
const router = express.Router()

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title:"node Store API",
        version: "0.0.1",
        alunos:[
                {"name": "joao"},
                {"name": "pedro"},
                {"name": "rafael"}
        ]
        
    })
})

app.use('/', route)

server.listen(port)

console.log("server runing port" + port)

function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

function onError(error){
    if(error.syscall !== 'listen'){
        throw error
    }

    const bind = typeof port === 'string'?
    'Pipe ' + port :
    'Port ' + port

    switch(error.code){
        case 'EACCES':
            console.error(bind + 'requires elevanted privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + 'is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}