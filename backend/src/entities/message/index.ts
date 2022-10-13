import { randomUUID } from "crypto";

interface MessageAttributes {
	id?: string;
	message: string;
	messages_group_id_fk: string;
}

class Message {
	// Attributes
	private _id?: string | undefined;
	private _message: string;
	private _messages_group_id_fk: string;

	// Constructor
	constructor(
        {
            id = randomUUID(),
            message,
            messages_group_id_fk
        }: MessageAttributes

    ) {
        this.id = id;
        this.message = message;
        this.messages_group_id_fk = messages_group_id_fk;
    }

    // Methods
    // ...

	// Getters and setters
	public get id(): string | undefined {
		return this._id;
	}

    public set id(value: string | undefined)  {
        this.id = value;
    }

	public get message(): string {
		return this._message;
	}

	public set message(value: string) {
		this._message = value;
	}

	public get messages_group_id_fk(): string {
		return this._messages_group_id_fk;
	}

	public set messages_group_id_fk(value: string) {
		this._messages_group_id_fk = value;
	}
}

export { Message };
