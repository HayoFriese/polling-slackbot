import {
    PollMessage,
    StringBlock,
    Buttons,
    OptionsMap
} from '../entities/poll';
import { Actions } from '../entities/data';

class Vote {
    private options: OptionsMap;
    private userId: string;
    private blockId: string;

    constructor (blocks: PollMessage, userId: string, action: Actions) {
        this.userId = userId;
        this.blockId = blocks[1].block_id;
        this.formatMessage(blocks[1]);
        this.vote(action);
    }

    newBlocks (titleBlock: StringBlock, actionBlock: Buttons) {
        const optionsList = this.mergeOptionsAndVotesToString();
        return [
            titleBlock,
            {
                type: 'section',
                block_id: this.blockId,
                text: {
                    type: 'mrkdwn',
                    text: `>>>${optionsList.join('')}`,
                },
            },
            actionBlock,
        ];
    }

    private formatMessage (message: StringBlock): void {
        const splitText: string[] = message.text.text
        .replace('&gt;&gt;&gt;', '')
        .split('\n');

        if (splitText.length < 1) {
            splitText.pop();
        }

        if (typeof splitText === 'undefined' || splitText.length === 0) {
            throw new Error('Looks like the message wasn\'t a poll!');
        }

        const dictionary = new Map();
        const options = splitText.filter((item: string) => item.indexOf(':') === 0);
        for (let i = 0; i < options.length; i++) {
            const voterKey = splitText.indexOf(options[i]) + 1;
            dictionary.set(i, {
                option: options[i],
                voters: splitText[voterKey],
            });
        }
        this.options = dictionary;
    }

    private vote (action: Actions) {
        const act = action.value;
        this.options.forEach((value, i) => {
            const { option, voters } = value;
            if (option.indexOf(act) >= 0) {
                if (voters.length > 0 && voters.indexOf(this.userId) >= 0) {
                    this.options.set(i, {
                        option,
                        voters: voters.replace(` <@${this.userId}>`, ''),
                    });
                } else {
                    this.options.set(i, {
                        option,
                        voters: ` <@${this.userId}>`,
                    });
                }
            }
        });
    }

    private mergeOptionsAndVotesToString () {
        return Array.from(this.options, ([i, element]) => {
            const { option, voters } = element;
            return `${option}\n${voters}\n`;
        });
    }
}
module.exports = Vote;
