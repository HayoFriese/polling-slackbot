require('dotenv').config();

const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: process.env.SLACKBOT_OAUTH_TOKEN,
    name: process.env.SLACKBOT_NAME
});

// Start handler
bot.on('start', () => {
    let params = {
        icon_emoji: ':dog:'
    };

    bot.postMessageToChannel(
        process.env.SLACKBOT_CHANNEL_NAME,
        'Get Ready To Vote with @Oberpoll',
        params
    );
});

bot.on('error', (err) => console.log(err));

//Message Handler
bot.on('message', (data) => {
    console.log(data);
    if(data.type !== 'message') {
        return;
    }

    handleMessage(data.text);
});

const handleMessage = (message) =>{
    if(message.includes(' poll')) {
        chuckJoke();
    }
}

const chuckJoke = () => {
    const url = 'http://api.icndb.com/jokes/random/';

    axios.get('http://api.icndb.com/jokes/random/')
        .then(res => {
            const joke = res.data.value.joke;

            const params = {
                icon_emoji: ':laughing:'
            };
            
            bot.postMessageToChannel(
                process.env.SLACKBOT_CHANNEL_NAME,
                `Chuck Norris: ${joke}`,
                params
            );
        });
}