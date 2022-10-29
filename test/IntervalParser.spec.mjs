import IntervalParser from "../src/IntervalParser.mjs";
import test, { eq } from "./support.mjs";

test("Parse empty string", () => {
  const parser = new IntervalParser();

  const result = parser.parseString("");
  eq(0, result._minutes);
});

test("Parse one time passed", () => {
  const parser = new IntervalParser();

  const result = parser.parseString("03:00");
  eq(0, result._minutes);
});

test("Parse zero minute", () => {
  const parser = new IntervalParser();

  const result = parser.parseString("03:00 - 03:00");
  eq(0, result._minutes);
});

test("Parse one minute", () => {
  const parser = new IntervalParser();

  const result = parser.parseString("03:00 - 03:01");
  eq(1, result._minutes);
});

test("Parse one hour", () => {
  const parser = new IntervalParser();

  const result = parser.parseString("02:00 - 03:00");
  eq(60, result._minutes);
});

test("Parse wrong direction", () => {
  const parser = new IntervalParser();

  const result = parser.parseString("23:00 - 02:00");
  eq(60 * 3, result._minutes);
});

test("Parse many ranges", () => {
  const parser = new IntervalParser();

  const result = parser.parseString("01:00-02:00 02:00-04:00");
  eq(60 * 3, result._minutes);
});

test("Parse interval", () => {
  const parser = new IntervalParser();

  const result = parser.parseString("1h03m");
  eq(63, result._minutes);
});

test("Parse interval sum", () => {
  const parser = new IntervalParser();

  const result = parser.parseString("1h3m 27m");
  eq(90, result._minutes);
});
