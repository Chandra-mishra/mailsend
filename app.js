const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
//const nodemailer = require('nodemailer');
const path = require('path');
const app = express();


// view engine setup
app.engine('handlebars',exphbs());
app.set('view engine', 'handlebars');

//static folder
app.use('/public',express.static(path.join(__dirname,'public')));


// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.render('contact');
});

app.post('/send',(req,res)=>{
const output = `
<p>you have a new contact request</p>
<h3>Contact Details</h3>
<ul>
<li>Name:${req.body.name}</li>
<li>Company:${req.body.company}</li>
<li>Email:${req.body.email}</li>
<li>Phone: ${req.body.phone}</li>
</ul>
<h3>Message</h3>
<p>${req.body.message}</p>
`;

/*// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: typeyouremail, // generated ethereal user
        pass: TypePassword  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"chandra mishra" <prasadchandra18@gmail.com>', // sender address
      to: 'chandraprasad18@outlook.com', // list of receivers
      subject: 'checking', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });*/
  
  var api_key = 'ef0bec74c8983a3d6a870f7417ae2c17-9ce9335e-701db888';
  var domain = 'sandbox27ec048f83bb4913a6c3938258f69a19.mailgun.org';
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var data = {
  from: 'Excited User <postmaster@sandbox27ec048f83bb4913a6c3938258f69a19.mailgun.org>',
  to: 'prasadchandra18@gmail.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!',
  html:output
};
 
mailgun.messages().send(data, (error, body)=> {
  console.log(body);
  if(!error)
    res.render('contact', {msg:'Email has been sent'});
  else
      res.send('please correct the error!!');
  
});
  });

app.listen(3000,()=>{
    console.log('server connected!!!');
});
