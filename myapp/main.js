const express = require('express');
const moviesRouter = require('./routers/movies')
const membersRouter = require('./routers/Members')
const SubscriptionsRouter = require('./routers/Subscriptions')
var cors = require('cors')

let app = express()

app.use(cors())

require('./configs/database');

app.use(express.json())

app.use('/api/movies',moviesRouter)
app.use('/api/Members',membersRouter)
app.use('/api/Subscriptions',SubscriptionsRouter)

app.listen(8000)