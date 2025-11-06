
require("dotenv").config()
const express = require('express')
const cors = require('cors');
const analyzeRoute = require('./routes/analyze');
const grammerCheckRoute = require("./routes/grammerCheck");
const spellCheckRoute = require("./routes/spellCheck");
const app = express()
const PORT = process.env.PORT || 8000;

// MIDDLEWARE
app.use(cors())
app.use(express.json())

// routes
app.use("/api/analyze", analyzeRoute)
app.use("/api/grammercheck", grammerCheckRoute)
app.use("/api/spellcheck", spellCheckRoute)


// start server
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}...`)
})