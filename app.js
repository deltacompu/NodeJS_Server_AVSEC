const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
var bodyParser = require('body-parser');
const app= module.exports = express();
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);


const connection = mysql.createConnection({
	host: 'localhost',
  user: 'userAVSEC',
  password: 'Amazon2023!',
  database: 'avsec' 
});


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));


app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/views/login.html'));
});

connection.connect(function(err) {
	if (err) {
	  console.log(err);
	  throw err;
	}
	console.log('Database is connected successfully !');
});

global.connection = connection;

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use(bodyParser.urlencoded({extended: false}));

  app.post('/auth', function(request, response) {
    
    let username = request.body.username;
    let password = request.body.password;
   
    if (username && password) {
     
      connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
       
        if (error) throw error;
        
        if (results.length > 0) {          
          
          request.session.loggedin = true;
          request.session.username = username;
          
          response.redirect('/assesment.html');
        } else {
          response.render(path.join(__dirname+'/views/errorValidation.html'));
        }			
        response.end();
      });
    } else {
      response.send('Please enter Username and Password!');
      response.end();
    }
  });

  app.get("/assesment.html", function(request, response){  
    if (request.session.loggedin ) {
      response.render(path.join(__dirname+'/views/assesment.html'));
    }
    else{      
      response.render(path.join(__dirname+'/views/errorValidation.html'));
    }
    response.end();
  });
  
  app.get("/tickets.html", function(request, response){  
    if (request.session.loggedin ) {
      response.render(path.join(__dirname+'/views/tickets.html'));
    }
    else{      
      response.render(path.join(__dirname+'/views/errorValidation.html'));
    }
    response.end();
  });
  
  app.get("/dthree.html", function(request, response) { 
    if (request.session.loggedin ) {
      response.render(path.join(__dirname+'/views/dthree.html'));
    }
    else{      
      response.render(path.join(__dirname+'/views/errorValidation.html'));
    }
    response.end();
  });
  
  app.get("/index.html", (req, res) => {  
	res.sendFile(path.join(__dirname, 'views/index.html'))
  });
  
  app.get("/education.html", function(request, response) {  
    if (request.session.loggedin ) {
      response.render(path.join(__dirname+'/views/education.html'));
    }
    else{      
      response.render(path.join(__dirname+'/views/errorValidation.html'));
    }
    response.end();
  });
  
  app.get("/violation.html",  function(request, response) {  
    if (request.session.loggedin ) {
      response.render(path.join(__dirname+'/views/violation.html'));
    }
    else{      
      response.render(path.join(__dirname+'/views/errorValidation.html'));
    }
    response.end();
  });
  
  app.get("/projects.html", function(request, response) {  
    if (request.session.loggedin ) {
      response.render(path.join(__dirname+'/views/projects.html'));
    }
    else{      
      response.render(path.join(__dirname+'/views/errorValidation.html'));
    }
    response.end();
  });
  
  app.get("/credentialing.html", function(request, response) {  
    if (request.session.loggedin ) {
      response.render(path.join(__dirname+'/views/credentialing.html'));
    }
    else{      
      response.render(path.join(__dirname+'/views/errorValidation.html'));
    }
    response.end();
  });
  
  app.get("/gemba.html", function(request, response) {  
    if (request.session.loggedin ) {
      response.render(path.join(__dirname+'/views/gemba.html'));
    }
    else{      
      response.render(path.join(__dirname+'/views/errorValidation.html'));
    }
    response.end();
  });
  
  app.get("/ddd.html", function(request, response) {  
    if (request.session.loggedin ) {
      response.render(path.join(__dirname+'/views/ddd.html'));
    }
    else{      
      response.render(path.join(__dirname+'/views/errorValidation.html'));
    }
    response.end();
  });

  app.get("/errorValidation.html", (req, res) => {  
    res.sendFile(path.join(__dirname, 'views/errorValidation.html'))
  });

  app.listen(8000, () => {
	console.log('Listening on port ' + 8000);
  });