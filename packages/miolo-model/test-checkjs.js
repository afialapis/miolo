/**
 * @template T
 * @extends {Array<T>}
 * @property {() => void} reset_cache
 */
class MioloArray extends Array {
    constructor() {
        super();
        this.reset_cache();
    }
}
let m = new MioloArray();
m.push(1);
m.reset_cache();
