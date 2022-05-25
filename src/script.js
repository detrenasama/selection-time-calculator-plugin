;(function () {
    class Interval {
        hours
        minutes

        constructor(hours, minutes) {
            if (minutes >= 60) {
                hours += Math.floor(minutes / 60)
                minutes = minutes % 60
            }

            this.hours = hours
            this.minutes = minutes
        }

        add(other) {
            let hours = this.hours + other.hours
            let minutes = this.minutes + other.minutes

            if (minutes >= 60) {
                hours += Math.floor(minutes/60)
                minutes = minutes % 60
            }

            if (minutes < 0) {
                minutes += 60
                hours -= 1
            }


            return new Interval(hours, minutes)
        }

        toString() {
            return this.hours + "h " + this.minutes + "m"
        }
    }
    class MinusInterval extends Interval {
        constructor(hours, minutes) {
            super(-1*hours, -1*minutes);
        }
    }
    Interval.from = function (fromString, toString) {
        const fromHM = fromString.split(':')
        const toHM = toString.split(':')

        let hours = parseInt(toHM[0]) - parseInt(fromHM[0])
        let minutes = parseInt(toHM[1]) - parseInt(fromHM[1])

        if (hours < 0) {
            hours += 24
        }

        if (minutes < 0) {
            hours -= 1
            minutes += 60
        }

        return new Interval(hours, minutes)
    }

    const result = document.createElement('div')
    result.style.position = 'fixed'

    result.style.userEvents = 'none'
    result.style.padding = "0.5em"
    result.style.background = 'white'
    result.style.border = "1px solid #ddd"
    result.style.boxShadow = "0 2px 15px 5px #33333317"

    let resultTimer = null
    function renderResult(position, total) {
        result.innerText = total
        result.style.right = 0
        result.style.bottom = 0
        document.body.appendChild(result)

        resultTimer = setTimeout(() => {
            document.body.removeChild(result)
            resultTimer = null
        }, 3000)
    }

    document.body.addEventListener('mouseup', function (e) {
        if (resultTimer)
            return

        const selection = window.getSelection()
        const text = selection.toString()

        const intervals = []
        if (text.match(/\d{1,2}:\d{1,2}/)) {
            const matches = text.matchAll(/(?<from>\d{1,2}:\d{1,2})\s*-\s*(?<to>\d{1,2}:\d{1,2})/g)

            for (let time of matches){
                intervals.push(Interval.from(time.groups['from'], time.groups['to']))
            }
        }

        const additionalRegex = /(?<sign>[\+\-])\s*((?<hours>\d+)h)?\s*((?<minutes>\d+)m)/
        if (text.match(additionalRegex)) {
            const regexp = new RegExp(additionalRegex.source, additionalRegex.flags + "g");
            const matches = text.matchAll(regexp)

            for (let time of matches){
                const signPlus = time.groups['sign'] === '+'
                if (signPlus) {
                    intervals.push(new Interval(parseInt(time.groups['hours'] || 0), parseInt(time.groups['minutes'] || 0)))
                } else {
                    intervals.push(new MinusInterval(parseInt(time.groups['hours'] || 0), parseInt(time.groups['minutes'] || 0)))
                }
            }
        }

        if (intervals.length === 0)
            return

        const result = intervals.reduce((a, e) => {
            a = a.add(e)
            return a
        }, new Interval(0,0)).toString()


        renderResult({x: e.clientX, y: e.clientY}, result)
    })
})();