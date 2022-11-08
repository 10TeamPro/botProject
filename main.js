require('dotenv').config();
const {RTMClient} = require('@slack/rtm-api');
//process.env.
const TOKEN = require('./config/bot.json');

var rtm = new RTMClient(TOKEN.BOT_TOKEN);
rtm.start();

var greeting = require('./greeting');
var square = require('./square');

rtm.on('message', function(message){
	var channel = message.channel;
	var text = message.text;

	if (!isNaN(text)){
		square(rtm, text, channel);
	}
	else{
		switch(text)
		{
		case 'hi':
		case 'hello':
		case '안녕':
			greeting(rtm, channel);
			break;
		default:
			rtm.sendMessage('Im alive', channel);
		}
	}	
});
