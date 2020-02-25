import { User } from './User';

export class ChallengeAcceptance {
    constructor(user: User, acceptance: boolean) {
        this.user = user;
        this.acceptance = acceptance;
    }

    user: User;
    acceptance: boolean;
}