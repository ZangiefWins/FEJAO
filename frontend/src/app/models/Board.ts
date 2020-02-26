import { Bean } from './Bean';

export class Board {

    constructor() {
        this.beanLots = [];
    }

    beanLots: Array<Array<Bean>>;
}