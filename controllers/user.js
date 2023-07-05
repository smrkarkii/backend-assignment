const pool = require("../queries")
const bcrypt= require("bcrypt")
const jwtgenerator = require("../utils/jwtgenerator")
exports.signin = async (req, res) => {
    const {username, user_password, email, phone} = req.body;
    try{
        
        const user = await pool.query("SELECT * FROM users  WHERE email = $1", [email] )
        const users = await pool.query("SELECT * FROM users" )
       

        if(user.rows.length > 0){
            //already exists
            console.log("user already exists")
            return res.status(401).json("user already exist")
        }
        //bcrypt the user password
       
        const salt = await bcrypt.genSalt(10);
         const bcryptpassword = await bcrypt.hash(user_password, salt);

          //save the user
         let newUser = await pool.query(
            "INSERT INTO users (username, user_password, email, phone) VALUES ($1,$2,$3,$4) RETURNING *", [username, bcryptpassword, email, phone])

             //jwt generation 
        const token = jwtgenerator(newUser.rows[0].user_id)
        console.log(token)
       
        return res.status(200).json({token});

        

    }catch(err) {
        console.log(err.message);
        res.status(500).send(err.message)
    }
}
exports.getusers = async (req, res) => {
    try{
        const user = await pool.query("SELECT * FROM users" )
        console.log(user.rows);
        res.send(user.rows)

    }catch(err) {
        console.log(err.message)
    }
}

exports.login = async(req,res) => {
    const {email, user_password} = req.body;
   
    try{
        //check if user exists
        const user = await pool.query("SELECT * FROM users  WHERE email = $1 ", [email] )
        if(user.rows.length === 0){
            return res.status(401).json("No user exists")
        }
        //check password
        const validPassword = await bcrypt.compare(user_password, user.rows[0].user_password)
        
        if(!validPassword ){ 
            return res.status(401).json("Incorrect")
        }
        const jwtToken = jwtgenerator(user.rows[0].id)
        return res.json({jwtToken})
    
        
        //
    }
    catch(err){
        console.log(err)
        res.status(500).json(err.message)
    }
}

