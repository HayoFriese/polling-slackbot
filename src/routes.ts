require('dotenv').config();
import {
    ActionPayload,
    MessageRequest,
    Response,
    ActionRequest
} from './entities/data';
import { WebClient } from '@slack/web-api/dist/WebClient';

module.exports = (client: WebClient) => {
    const Poll = require('./helpers/poll.class');
    const Vote = require('./helpers/vote.class');
    const express = require('express');
    const router = express.Router();

    // Polling Route
    router.post('/poll', async (req: MessageRequest, res: Response) => {
        if (req.body.command === '/poll') {
            try {
                const poll = new Poll(req.body.text);
                const blocks = poll.postMessage();
                await client.chat.postMessage({
                    icon_emoji: ':bar_chart:',
                    text: '',
                    blocks,
                    channel: req.body.channel_id,
                });
                return res.status(200).send();
            } catch (e) {
                console.error(e);
            }
        }
        return res.status(500).send(`Command doesn\'t exist`);
    });

    // Voting Route
    router.post('/action', async (req: ActionRequest, res: Response) => {
        try {
            const payload: ActionPayload = JSON.parse(req.body.payload);
            const {
                channel: { id },
                message: { ts, blocks },
                user: { id: userId },
                actions,
            } = payload;
            const votePoll = new Vote(blocks, userId, actions[0]);
            const newBlocks = votePoll.newBlocks(blocks[0], blocks[2]);
            await client.chat.update({
                ts,
                channel: id,
                text: '',
                blocks: newBlocks,
            });
            return res.status(200).send();
        } catch (e) {
            console.error(e);
        }
    });

    return router;
};