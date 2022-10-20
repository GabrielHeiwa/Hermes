import { randomUUID } from "crypto";

interface PhoneNumberAttributes {
	id?: string;
	phone_number: string;
	description?: string;
	session: string;
}

class PhoneNumber {
	// Attributes
	private _id?: string | undefined;
	private _phone_number: string;
	private _description?: string | undefined;
	private _session: String;

	// Constructor
	constructor(
        {
            id = randomUUID(),
            phone_number,
            description = "",
            session
        }: PhoneNumberAttributes

    ) {
        this.id = id;
        this.phone_number = phone_number;
        this.description = description;
        this.session = session;
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

	public get phone_number(): string {
		return this._phone_number;
	}

	public set phone_number(value: string) {
		this._phone_number = value;
	}

	public get description(): string | undefined {
		return this._description;
	}

	public set description(value: string | undefined) {
		this._description = value;
	}

	public get session(): String {
		return this._session;
	}

	public set session(value: String) {
		this._session = value;
	}
}

export { PhoneNumber }
