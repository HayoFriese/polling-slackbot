import { KnownBlock, Block } from './blocksAndActions';

interface MessageRequestBody {
    token: string;
    team_id: string;
    team_domain: string;
    channel_id: string;
    channel_name: string;
    user_id: string;
    user_name: string;
    command: string;
    text: string;
    response_url: string;
    trigger_id: string;
}

export interface MessageRequest {
    body: MessageRequestBody;
}

export interface ActionRequest {
    body: {
        payload: string;
    };
}

export interface Response {
    // tslint:disable-next-line
    send: (body?: any) => void;
    status (code: number): Response;
}

interface Channel {
    id: string;
    name: string;
}

interface User {
    id: string;
    username: string;
    name: string;
    team_id: string;
}

interface MessageType {
    type: string;
    subtype: string;
    text: string;
    ts: string;
    username: string;
    icons: {
        emoji: string;
        image_64: string;
    };
    bot_id: string;
    blocks: Array<KnownBlock | Block>;
}

export interface ActionPayload {
    type: string;
    user: User;
    api_app_id: string;
    token: string;
    container: {
        type: string;
        message_ts: string;
        channel_id: string;
        is_ephemeral: boolean;
    };
    trigger_id: string;
    channel: Channel;
    message: MessageType;
    response_url: string;
    actions: Actions[];
}
export interface Actions {
    action_id: string;
    block_id: string;
    text: object[];
    value: string;
    type: string;
    action_ts: string;
}
