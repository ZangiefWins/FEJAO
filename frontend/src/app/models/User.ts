export class User {
    constructor(name: string, connectionId: string) {
        this.name = name;
        this.connectionId = connectionId;
    }

    id: string;
    name: string;
    winsInARow: number;
    lastUpdate: Date;
    connectionId: string;
}