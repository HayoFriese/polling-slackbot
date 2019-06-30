class Oberpoll {
    constructor(message, timestamp) {
        this._formatMessage(message);
        this.timestamp = timestamp;
        this.listOfEmojis = [":zero:", ":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:"];
    }

    _formatMessage(message) {
        let options = message.split(' \‘').map(x => x.slice(0, -1));
        this.title = options.shift(0).split('“')[1];
        this.options = this._createOptions(options);
    }
    
    _createOptions(arr) {
        let dictionary = {};
        for(let i = 0; (i < arr.length && i < 9); i++) {
            dictionary[i] = {
                "option": arr[i],
                "voters": []
            }
        }
        return dictionary;
    }

    _formatOptionsToArray () {
        let messageArr = [];
        for (let i = 0; i < Object.values(this.options).length; i++) {
            let message = `${this.listOfEmojis[i]} - ${this.options[i].option}\n${this.options[i].voters.map(a => `@${a}`)}\n`;
            messageArr.push(message);
        }
        return messageArr;
    }

    _makeButtons () {
        let buttonArr = [];
        for (let i = 0; i < Object.values(this.options).length; i++) {
            let buttonObj = {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": `${this.listOfEmojis[i]}`,
                    "emoji": true
                },
                "value": `select_${this.listOfEmojis[i].substr(1).slice(0, -1)}`
            }
            buttonArr.push(buttonObj);
        }
        return buttonArr;
    }
    
    vote (user, num) {
        let { voters } = this.options[num];
        if (!voters.includes(user)) {
            voters.push(user);
        } else {
            voters = voters.filter((a, b) => a !== user);
        }
    }

    postMessage () { 
        const elements = this._makeButtons();
        const options = this._formatOptionsToArray();
        return [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `>*_${this.title}_*`
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `>>>${options.join('')}`
                }
            },
            {
                "type": "actions",
                "elements": elements
            }
        ];
    };
}

module.exports = Oberpoll;