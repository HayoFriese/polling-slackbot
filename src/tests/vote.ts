import { PollVote } from '../entities/poll';

// Will add voting test functions here
export {};
const Vote = require('../helpers/vote.class');

// Stringified as Slack sends data as a stringified JSON
const blockExamples = JSON.stringify([
    {
        type: 'section',
        block_id: '1234',
        text: {
            type: 'mrkdwn',
            text: '>*_Title_*',
        },
    },
    {
        type: 'section',
        block_id: 'abcd',
        text: {
            type: 'mrkdwn',
            text: `&gt;&gt;&gt;:zero: - a\n\n:one: - b\n\n:two: - c\n\n`,
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
        block_id: '1a2b',
    },
]);
const votedBlockExamples = JSON.stringify([
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '>*_Title_*',
        },
        block_id: '1234',
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `&gt;&gt;&gt;:zero: - a\n <@U4NFBBZT6>\n:one: - b\n\n:two: - c\n\n`,
        },
        block_id: 'abcd',
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
        block_id: '1a2b',
    },
]);

const userId = 'U4NFBBZT6';

function voteAction (body: PollVote, user: string) {
    const votePoll = new Vote(body, user, { value: 'zero' });
    return votePoll.newBlocks(body[0], body[2]);
}

function vote (user: string) {
    const newBlocks = voteAction(JSON.parse(blockExamples), user);
    const options = newBlocks[1];
    return options.text.text.includes('<@');
}

function removeVote (user: string) {
    const unvotedBlocks = voteAction(JSON.parse(votedBlockExamples), user);
    const unvotedOptions = unvotedBlocks[1];
    return unvotedOptions.text.text.includes('<@');
}

module.exports = { userId, vote, removeVote };
