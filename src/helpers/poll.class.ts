import { Options, Buttons } from '../entities/poll';

class Poll {
    private options: Options;
    private listOfEmojis: string[];
    private title: string;

    constructor (message: string) {
        this.formatMessage(message);
        this.listOfEmojis = [
            ':zero:',
            ':one:',
            ':two:',
            ':three:',
            ':four:',
            ':five:',
            ':six:',
            ':seven:',
            ':eight:',
            ':nine:',
            ':ten:',
        ];
    }

    postMessage () {
        const elements = this.makeButtons();
        const options = this.addEmojiToOptions();
        return [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `>*_${this.title}_*`,
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `>>>${options.join('')}`,
                },
            },
            {
                type: 'actions',
                elements,
            },
        ];
    }

    private formatMessage (message: string): void {
        const cleanedMessage = message.substr(1);
        const messageArray = cleanedMessage.split(' ‘');
        const options: Options = messageArray.map(x => x.slice(0, -1));
        if (options.length > 0) {
            const shiftedOptions = options.shift();
            if (typeof shiftedOptions === 'undefined') {
                throw new Error('Unrecognized message format');
            }
            this.title = shiftedOptions;
            this.options = options;
        } else {
            throw new Error(
                'Incorrect message format. Please see the help for info on how to structure.'
            );
        }
    }

    private addEmojiToOptions (): string[] {
        return this.options.map((item, i) => {
            const emoji = this.listOfEmojis[i];
            return `${emoji} - ${item}\n\n`;
        });
    }

    private makeButtons (): Buttons {
        return this.options.map((item, i) => ({
            type: 'button',
            text: {
                type: 'plain_text',
                text: `${this.listOfEmojis[i]}`,
                emoji: true,
            },
            value: `${this.listOfEmojis[i].substr(1).slice(0, -1)}`,
        }));
    }
}
module.exports = Poll;
