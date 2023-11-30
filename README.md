

<h1>User Authorization Restful API</h1> 

<h2>RESTful API para autenticação de usuários, que permite operações de cadastro (sign up), autenticação (sign in) e recuperação de informações do usuário.</h2>

<br>

<p>This API uses <b>Express</b>, <b>MongoDB Atlas</b>, <b>Mongoose</b> and <b>JsonWebToken</b> as main dependencies</p>

<br>

<h3><b>Server.js</b> file contains the entry point of our API</h3>
<p>First we import the require packages of our application <b>Express</b> and <b>Mongoose</b></p>
<p>Then we import our routes module</p>
<p>We connect to Database an if connected we start listen 
on the port specified in the .env file</p>


<h3><b>User.js</b> file contains the routes used on this API</h3>
<p>We use Express router to define the paths of our application</p>
<p>In the begin we import the functions at userController.js</b>
<p>In the end we export the route const</b>


<h3><b>UserController.js</b> file contains the functions to <b>SignUp</b>, <b>SignIn</b> and <b>Search</b> Users</h3>
<p>We import json web token and our User Model at begin</p>

<p><b>Functions:</b></p>
<br>
<p><b>SignUp</b></p>
<p>The SignUp function receives from the requisition body the fields "nome", "email", "senha" e "telefones"</p>
<p>Then checks if the passed email already exists on database, if not the function Create a new User on database returning
a json with user information</p>
<br>

<p><b>SignIn</b></p>
<p>The SignIn function receives from the requisition body the fields "email" and "senha"</p>
<p>Then checks if the passed email is register on database:</p>
<p>If email is not registered it returns the message "Usuário e/ou senha inválidos"</p>
<p>If email is registered it continues the program by checking if the password given matches the same password defined for
this user instance on database, if is True return a json with user information including the Json web token</p>
<br>

<p><b>Search</b></p>
<p>Uses the Bearer token passed on headers and check the validation</p>
<p>If valid returns user information</p>
<p>If the token time has expired return "Sessão inválida"</p>
<p>If the token is not valid return "Não autorizado"</p>
<br>

<h3><b>UserModel.js</b> file contains the model used on this API</h3>
<p>We use <b>Mongoose</b> schema and define the fields "nome", "email", "senha" e "telefones"</p>
<p>In the end we export the User schema</b>