import test, { eq } from "./support.mjs";
import Interval from "../src/Interval.mjs";

test("Interval creation no parameters", () => {
    let int = new Interval();
    eq(0, int.hours);
    eq(0, int.minutes);
});

test("Interval creation zeros", () => {
    let int = new Interval(0, 0);
    eq(0, int.hours);
    eq(0, int.minutes);
});

test("Interval creation normal", () => {
    let int = new Interval(2, 14);
    eq(2, int.hours);
    eq(14, int.minutes);
});

test("Interval creation negative hours", () => {
    let int = new Interval(-2, 14);
    eq(-2, int.hours);
    eq(-14, int.minutes);
});

test("Interval creation minutes out of bounds", () => {
    let int = new Interval(1, 64);
    eq(2, int.hours);
    eq(4, int.minutes);
});

test("Interval creation minutes out of bounds 2", () => {
    let int = new Interval(1, 120);
    eq(3, int.hours);
    eq(0, int.minutes);
});

test("Interval creation negative minutes", () => {
    let int = new Interval(1, -15);
    eq(0, int.hours);
    eq(45, int.minutes);
});

test("Interval creation negative minutes out of bound", () => {
    let int = new Interval(1, -65);
    eq(0, int.hours);
    eq(-5, int.minutes);
});

test("Intervals adding simple", () => {
    let a = new Interval(0, 0);
    let b = new Interval(0, 15);
    let result = a.add(b);
    eq(0, result.hours);
    eq(15, result.minutes);
});

test("Intervals adding with hours", () => {
    let a = new Interval(2, 0);
    let b = new Interval(4, 0);
    let result = a.add(b);
    eq(6, result.hours);
    eq(0, result.minutes);
});

test("Intervals adding minutes out of bound", () => {
    let a = new Interval(0, 0);
    let b = new Interval(0, 70);
    let result = a.add(b);
    eq(1, result.hours);
    eq(10, result.minutes);
});

test("Intervals adding hours negative", () => {
    let a = new Interval(-1, 0);
    let b = new Interval(0, 15);
    let result = a.add(b);
    eq(0, result.hours);
    eq(-45, result.minutes);
});

test("Intervals to string simple", () => {
    let a = new Interval(0, 12);
    eq("12m", a.toString());
});

test("Intervals to string simple 2", () => {
    let a = new Interval(3, 0);
    eq("3h", a.toString());
});

test("Intervals to string negative hours", () => {
    let a = new Interval(-3, 12);
    eq("-3h 12m", a.toString());
});
