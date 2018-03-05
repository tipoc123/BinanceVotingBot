# binance

Bot for detecting new voting in the binance exchange. It supports email notification.

You need to update next lines (in the index.js file):
```
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '[your mail]@gmail.com',
    pass: '[password for email]'
  }
});

var mailOptions = {
  from: '[your mail]@gmail.com',
  to: 'email1, email2, email3',
  subject: 'Binance NEW VOTE',
  text: 'Link to the vote https://binance.com/vote.html'
};

```
