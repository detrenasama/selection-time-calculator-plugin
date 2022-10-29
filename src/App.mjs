import Interval, { MinusInterval } from "./Interval.mjs";
import IntervalParser from "./IntervalParser.mjs";

class App {
    parser;

    constructor() {
        this.parser = new IntervalParser();
    }
    run(document) {
        const result = document.createElement("div");
        result.style.position = "fixed";

        result.style.userEvents = "none";
        result.style.padding = "0.5em";
        result.style.background = "white";
        result.style.border = "1px solid #ddd";
        result.style.boxShadow = "0 2px 15px 5px #33333317";

        let resultTimer = null;

        function renderResult(position, total) {
            result.innerText = total;
            result.style.right = 0;
            result.style.bottom = 0;
            document.body.appendChild(result);

            resultTimer = setTimeout(() => {
                document.body.removeChild(result);
                resultTimer = null;
            }, 3000);
        }

        document.body.addEventListener("mouseup", (e) => {
            if (resultTimer) return;

            const selection = window.getSelection();
            const text = selection.toString();

            const interval = this.parser.parseString(text);
            const result = interval.toString();

            renderResult({ x: e.clientX, y: e.clientY }, result);
        });
    }
}

export default App;
