export interface SingleMessageInterface {
    _id?: string;
    sender: string;
    content: string;
    chatId: string;
    createdAt: string;
    updatedAt?: string;
}

export interface GetMessagesInterface {
    status: string;
    message:string;
    data:SingleMessageInterface[]|[]
}

