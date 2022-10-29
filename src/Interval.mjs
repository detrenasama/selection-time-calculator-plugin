class Interval {
    _minutes = 0;

    get hours() {
        const roundFunc = this._minutes < 0 ? Math.ceil : Math.floor;
        return roundFunc(this._minutes / 60);
    }

    get minutes() {
        return this._minutes % 60;
    }

    constructor(hours = 0, minutes = 0) {
        if (hours < 0) {
            this._minutes = hours * 60 - minutes;
        } else {
            this._minutes = hours * 60 + minutes;
        }
    }

    add(other) {
        return new Interval(0, this._minutes + other._minutes);
    }

    toString() {
        const h = this.hours;
        const m = Math.abs(this.minutes);

        const parts = [h !== 0 && `${h}h `, m !== 0 && `${m}m`].filter((e) => !!e);
        return parts.join("").trim();
    }
}

class MinusInterval extends Interval {
    constructor(hours, minutes) {
        super(-1 * hours, -1 * minutes);
    }
}

export default Interval;
export { MinusInterval };
