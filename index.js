const express = require("express")
const app = express();
const pool = require("./queries");
const bodyParser = require("body-parser");
const cors = require("cors");
const user_routes = require("./routes/users")
const product_routes = require("./routes/product")
const order_routes = require("./routes/order")
const bcrypt = require("bcrypt")
const swaggerjsdoc = require("swagger-jsdoc")
const swaggerui = require("swagger-ui-express")


const port = 3000;
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.get("/", (req,res) => {
    res.send("Hello")
})
//using routes
app.use(user_routes);
app.use(product_routes);
app.use(order_routes);

const options = {

    apis:[
        "./routes/*.js"
    ],
    info:{
        title:"Sales Management System",
        
    },
    definition: {
        openapi:"3.0.0",
        servers:[
            {
                url:"https://localhost:3000/",
            },
        ]

    }
}

const spacs = swaggerjsdoc(options)
app.use("/api-docs", swaggerui.serve, swaggerui.setup(spacs))

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})