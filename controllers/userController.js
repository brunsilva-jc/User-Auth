require('dotenv').config()

const User = require('../models/userModel')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

// user signup
const signupUser = async (req, res) => {
    const { nome, email, senha, telefones } = req.body
        
    try{
        //check if email already exists
        const emailExists = await User.findOne({ email: email });
        if(emailExists){
            return res.json({"mensagem": "E-mail já existente"}) 
        }

        //creating new user on DB
        const user = User.create({nome, email, senha, telefones})
        const userResponse = (await user)
        const userId = userResponse.id
        const token = jwt.sign({userId}, process.env.SECRET, {
                expiresIn: 1800
        })
        return res.json({
            "id": userResponse.id,
            "data_criacao": userResponse.createdAt,
            "data_atualizacao": userResponse.updatedAt,
            "ultimo_login": userResponse.updatedAt,
            "token": token
        })    
        }catch (error){
            res.status(400).json({error: error.message})
        }
}

// user signin
const signinUser = async (req, res) => {
    const { email, senha } = req.body
    try{
        const userCheck = await User.findOne({ email: email });
        if(userCheck){
            if(userCheck.senha == senha){
                const userId = userCheck.id
                const token = jwt.sign({userId}, process.env.SECRET, {
                    expiresIn: 1800
                })
                const lastLogin = new Date()
                console.log('SignIn sucess!')
                return res.json({
                "id": userCheck.id,
                "data_criacao": userCheck.createdAt,
                "data_atualizacao": userCheck.updatedAt,
                "ultimo_login": formatDate(lastLogin),
                "token": token
                })  
                }else{
                    res.status(401).json({"mensagem": "Usuário e/ou senha inválidos"})
                }
        }else{
            return res.json({"mensagem": "Usuário e/ou senha inválidos"}) 
        }
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

//user search
const searchUser = async (req,res) => {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    try{
        const tokenjwt = await jwt.verify(token, process.env.SECRET)
        return res.json({"token": tokenjwt})
    }catch (error) {
        jwt.verify(token, process.env.SECRET, (error, decode) => {
            if(error.name == 'TokenExpiredError'){
                return res.json({"mensagem": "Sessão inválida"})
            } else{
                return res.json({"mensagem": "Não autorizado"})
            }
        }) 
    }
}


//functions to format date
function numberPad(num) {
    return num.toString().padStart(2, '0');
}
  
function formatDate(date) {
    return (
      [
        numberPad(date.getDate()),
        numberPad(date.getMonth() + 1),
        date.getFullYear(),
      ].join('-') +
      ' ' +
      [
        numberPad(date.getHours()),
        numberPad(date.getMinutes()),
        numberPad(date.getSeconds()),
      ].join(':')
    );
}


module.exports = { signinUser, signupUser, searchUser}