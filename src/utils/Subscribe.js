class Subscribe {
    constructor() {
        this.events = {};
    }
    $on(eventname, event) {
        if (!this.events[eventname]) {
            this.events[eventname] = [];
        }
        this.events[eventname].push(event)
    }
    $emit() {
        let key = Array.prototype.shift.call(arguments);
        let fns = this.events[key];
        if (!fns || fns.length == 0) { //没有订阅 则返回
            return false;
        }
        fns.forEach(fn => {
            fn.apply(this, arguments);
        });
    }
}
export default new Subscribe();