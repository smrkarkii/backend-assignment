
const pool = require("../queries");
const bcrypt= require("bcrypt")
const jwtgenerator = require("../utils/jwtgenerator")
exports.signin = async (req, res) => {
    const {username, user_password, email, phone,role} = req.body;
    console.log(username)
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
            "INSERT INTO users (username, user_password, email, phone, role) VALUES ($1,$2,$3,$4, $5) RETURNING *", [username, bcryptpassword, email, phone,role])

             //jwt generation 
       
       
        return res.status(200).json({Success:newUser.rows});

        

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
    const user = await pool.query("SELECT * FROM users  WHERE email = $1 ", [email] )
   
    try{
        //check if user exists
        
        console.log(user.rows)
        if(user.rows.length === 0){
            return res.status(401).json("No user exists")
        }
        //check password
        const validPassword = await bcrypt.compare(user_password, user.rows[0].user_password)
        
        if(!validPassword ){ 
            return res.status(401).json("Incorrect")
        }
        const jwtToken = jwtgenerator({id: user.rows[0].user_id, role: user.rows[0].role})
        return res.json({jwtToken,user})
    
        
        //
    }
    catch(err){
        console.log(err)
        res.status(500).json(err.message)
    }
}

