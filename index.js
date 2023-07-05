const express = require("express")
const app = express();
const pool = require("./queries");
const bodyParser = require("body-parser");
const cors = require("cors");
const user_routes = require("./routes/users")
const bcrypt = require("bcrypt")


const port = 3000;
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.get("/", (req,res) => {
    res.send("Hello")
})
//using routes
app.use(user_routes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})