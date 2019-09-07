interface OptionsObject {
    option: string;
    voters: string;
}

export type OptionsMap = Map<number, OptionsObject>;

export type Options = string[];

interface Button {
    type: string;
    text: {
        type: string;
        text: string;
        emoji?: boolean;
    };
    value: string;
}
export type Buttons = Button[];

export interface ActionList {
    type: string;
    elements: Button[];
    block_id?: string;
}

export interface StringBlock {
    type: 'section';
    block_id: string;
    text: {
        type: 'mrkdwn';
        text: string;
        verbatim?: boolean;
    };
}

export type PollMessage = [StringBlock, StringBlock, Buttons];
export type PollVote = [StringBlock, StringBlock, ActionList];