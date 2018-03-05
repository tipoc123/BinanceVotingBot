var fetch = require('node-fetch');
var nodemailer = require('nodemailer');

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

let coins = ["RaiBlocks (XRB)", "Experience Points (XP)", "DragonChain (DRGN)",
"DeepBrain Chain (DBC)", "ReddCoin (RDD)", "Storm (STORM)", "Civic (CVC)", "ZenCash (ZEN)",
"BLOCKv (VEE)", "Rise (RISE)", "Ubiq (UBQ)", "CloakCoin (CLOAK)", "WeTrust (TRST)",
"Augur (REP)", "Aventus (AVT)", "SIBCoin (SIB)", "Blocknet (BLOCK)"];

//coins = ["1", "2", "3"];

function sendEmail() {
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function getVote() {
  fetch('https://www.binance.com/vote/getVote.html', {method: 'GET'})
    .then(result => {
      if (result.status != 200) return;

      return result.json();
    })
    .then(function(json) {
      const optionList = json.voteList[0].optionList;
      let array = [];
      for (var i = 0; i < optionList.length; i++) {
        array.push(optionList[i].optionName);
      }

      if (array.length != coins.length) {
        console.log("VOTE changed 1");
        coins = array;
        sendEmail();
        return;
      }

      for (var k = 0; k < array.length; k++) {
        if (coins.indexOf(array[k]) < 0) {
          console.log("VOTE changed 2");
          coins = array;
          sendEmail();
          return;
        }
      }

      console.log("VOTE the same")
    })
    .catch(error => {
      console.log('error:');
      console.log(error);
    });
}

var timerId = setInterval(getVote, 60 * 1000);
getVote();

console.log("START getVote...")
