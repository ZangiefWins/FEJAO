export class User {
    constructor(name: string, status: string) {
        this.name = name;
        this.status = status;
    }

    id: string;
    name: string;
    status: string;
    winsInARow: number;
    lastUpdate: Date;
    connectionId: string;
}