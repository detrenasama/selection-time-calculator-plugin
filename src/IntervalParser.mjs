import Interval from "./Interval.mjs";

class IntervalParser {
  parseString(text) {
    const intervals = [];
    if (text.match(/\d{1,2}:\d{1,2}/)) {
      const regex = /(?<from>\d{1,2}:\d{1,2})\s*-\s*(?<to>\d{1,2}:\d{1,2})/g;
      const matches = text.matchAll(regex);

      for (let time of matches) {
        intervals.push(this.getIntervalFromRange(time.groups["from"], time.groups["to"]));
      }
    }

    const additionalRegex = /(?<sign>[\+\-])?\s*((?<hours>\d+)h)?\s*((?<minutes>\d+)m)/;
    if (text.match(additionalRegex)) {
      const regexp = new RegExp(additionalRegex.source, additionalRegex.flags + "g");
      const matches = text.matchAll(regexp);

      for (let time of matches) {
        const signPlus = time.groups["sign"] !== "-";
        if (signPlus) {
          intervals.push(
            new Interval(
              parseInt(time.groups["hours"] || 0),
              parseInt(time.groups["minutes"] || 0)
            )
          );
        } else {
          intervals.push(
            new MinusInterval(
              parseInt(time.groups["hours"] || 0),
              parseInt(time.groups["minutes"] || 0)
            )
          );
        }
      }
    }

    if (intervals.length === 0) 
      return new Interval(0, 0);

    const result = intervals.reduce((a, e) => {
      return a.add(e);
    }, new Interval(0, 0));

    return result;
  }

  getIntervalFromRange(fromString, toString) {
    const fromHM = fromString.split(":");
    const toHM = toString.split(":");

    let hours = parseInt(toHM[0]) - parseInt(fromHM[0]);
    let minutes = parseInt(toHM[1]) - parseInt(fromHM[1]);

    if (hours < 0) {
      hours += 24;
    }

    if (minutes < 0) {
      hours -= 1;
      minutes += 60;
    }

    return new Interval(hours, minutes);
  }
}

export default IntervalParser;
