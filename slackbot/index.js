require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');
const { WebClient } = require('@slack/web-api');
const Oberpoll = require('./poll.js');

const token = process.env.SLACKBOT_OAUTH_TOKEN;

const rtm = new RTMClient(token);
const client = new WebClient(token);

rtm.on('error', (err) => {
    console.log(err)

    rtm.postMessageToChannel(
        process.env.SLACKBOT_CHANNEL_NAME,
        `${error.msg.toCapitalize()}. Exited with code ${code}`
    );
});

//Message Handler
rtm.on('message', async (data) => {
    // console.log(data);
    if(data.type !== 'message' || data.subtype === 'bot_message' || !data.text.includes('poll')) {
        return;
    }

    let params = {
        icon_emoji: ':bar_chart:'
    };

    try {
        const poll = new Oberpoll(data.text, data.ts);
        const blocks = poll.postMessage();
        const result = await client.chat.postMessage({
            icon_emoji: ':bar_chart:',
            blocks: blocks,
            channel: data.channel
        });
        console.log('Success!', result.ts);
    }
    catch (e) {
        console.log(e.data.response_metadata.messages);
    } 
});

(async () => {
    // Connect to Slack
    const { self, team } = await rtm.start();
    console.log(self, team);
})();
