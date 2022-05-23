;(function () {
    let Interval = function (hours, minutes) {
        this.hours = hours
        this.minutes = minutes

        this.add = function (other) {
            let hours = this.hours + other.hours
            let minutes = this.minutes + other.minutes

            if (minutes >= 60) {
                hours += Math.floor(minutes/60)
                minutes = minutes % 60
            }

            return new Interval(hours, minutes)
        }

        this.toString = function() {
            return this.hours + "h " + this.minutes + "m"
        }
    }
    Interval.from = function (fromString, toString) {
        const fromHM = fromString.split(':')
        const toHM = toString.split(':')

        const hours = parseInt(toHM[0]) - parseInt(fromHM[0])
        const minutes = parseInt(toHM[1]) - parseInt(fromHM[1])

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

        if (!text.match(/\d{2}:\d{2}/))
            return

        const matches = text.matchAll(/(?<from>\d{2}:\d{2})\s*-\s*(?<to>\d{2}:\d{2})/g)

        const intervals = []
        for (let time of matches){
            intervals.push(Interval.from(time.groups['from'], time.groups['to']))
        }

        const result = intervals.reduce((a, e) => {
            a = a.add(e)
            return a
        }, new Interval(0,0)).toString()


        renderResult({x: e.clientX, y: e.clientY}, result)
    })
})();