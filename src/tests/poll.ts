export {};

const example = '‘Title’ ‘a’ ‘b’ ‘c’';

const blockExamples = JSON.stringify([
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '>*_Title_*',
        },
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '>>>:zero: - a\n\n:one: - b\n\n:two: - c\n\n',
        },
    },
    {
        type: 'actions',
        elements: [
            {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: ':zero:',
                    emoji: true,
                },
                value: 'zero',
            },
            {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: ':one:',
                    emoji: true,
                },
                value: 'one',
            },
            {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: ':two:',
                    emoji: true,
                },
                value: 'two',
            },
        ],
    },
]);

function createPoll (message: string) {
    const Oberpoll = require('../helpers/poll.class');
    const poll = new Oberpoll(message);
    const postMessage = poll.postMessage();
    const jsonPoll = JSON.stringify(postMessage);
    return jsonPoll;
}

function countButtons (message: string): number {
    const poll = JSON.parse(createPoll(message));
    const buttons = poll[2].elements;
    return buttons.length;
}
function countOptions (message: string): number {
    const poll = JSON.parse(createPoll(message));
    const options = poll[1].text.text;
    const arrayOptions = options.split('\n\n');
    arrayOptions.pop();
    return arrayOptions.length;
}

module.exports = {
    example,
    blockExamples,
    createPoll,
    countButtons,
    countOptions,
};
