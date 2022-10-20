import { randomUUID } from "crypto";

interface MessagesGroupAttributes {
	id?: string;
	title: string;
	user_id_fk: string;
}

class MessagesGroup {
	// Attributes
	private _id?: string | undefined;
	private _title: string;
	private _user_id_fk: string;

	// Constructor
	constructor(
        {
            id = randomUUID(),
            title,
            user_id_fk
        }: MessagesGroupAttributes

    ) {
        this.id = id;
        this.title = title;
        this.user_id_fk = user_id_fk;
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

	public get title(): string {
		return this._title;
	}

	public set title(value: string) {
		this._title = value;
	}

	public get user_id_fk(): string {
		return this._user_id_fk;
	}

	public set user_id_fk(value: string) {
		this._user_id_fk = value;
	}
}

export { MessagesGroup };
