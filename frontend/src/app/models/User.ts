export class User {
    constructor(name: string, status: string, connectionId: string) {
        this.name = name;
        this.status = status;
        this.connectionId = connectionId;
    }

    id: string;
    name: string;
    status: string;
    winsInARow: number;
    lastUpdate: Date;
    connectionId: string;
}