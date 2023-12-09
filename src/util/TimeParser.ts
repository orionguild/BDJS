/** Custom time parser. */
export class TimeParser {
    /**
     * Parses human time to milliseconds.
     * @param time 
     */
    parse(time: string) {
        const now = new Date
        const monthDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
        /** Util conversion constants. */
        const milliseconds = {
            second: 1000,
            minute: 60 * 1000,
            hour: 60 * 60 * 1000,
            day: 24 * 60 * 60 * 1000,
            week: 7 * 24 * 60 * 60 * 1000,
            month: monthDays * 24 * 60 * 60 * 1000
        }
        if (!time.match(new RegExp(`\\d+(${this.suffixes.join('|')})+`)))
            return null
        let total = 0, compiledTime = '', compiledKind = ''
        const suffixes = {
            milliseconds: this.suffixes.slice(this.suffixes.indexOf('ms'), this.suffixes.lastIndexOf('milli')),
            seconds: this.suffixes.slice(this.suffixes.indexOf('s'), this.suffixes.indexOf('seconds') + 1),
            minutes: this.suffixes.slice(this.suffixes.indexOf('m'), this.suffixes.indexOf('minutes') + 1),
            hours: this.suffixes.slice(this.suffixes.indexOf('h'), this.suffixes.indexOf('hours') + 1),
            days: this.suffixes.slice(this.suffixes.indexOf('d'), this.suffixes.indexOf('days') + 1),
            weeks: this.suffixes.slice(this.suffixes.indexOf('w'), this.suffixes.indexOf('weeks') + 1),
            months: this.suffixes.slice(this.suffixes.indexOf('mo'))
        }
        for (let i = 0; i < time.length; i++) {
            const char = time[i], next = time[i + 1]
            if (char === ' ') continue
            if (!isNaN(Number(char))) {
                compiledTime += char    
            } else if (isNaN(Number(char))) {
                compiledKind += char
                if (compiledKind !== '') {
                    const parsedValue = Number(compiledTime.trim())
                    let newTime: number, kind = compiledKind.trim().toLowerCase()
                    if (suffixes.seconds.includes(kind)) {
                        newTime = milliseconds.second * parsedValue
                    } else if (suffixes.minutes.includes(kind)) {
                        newTime = milliseconds.minute * parsedValue
                    } else if (suffixes.hours.includes(kind)) {
                        newTime = milliseconds.hour * parsedValue
                    } else if (suffixes.days.includes(kind)) {
                        newTime = milliseconds.day * parsedValue
                    } else if (suffixes.weeks.includes(kind)) {
                        newTime = milliseconds.week * parsedValue
                    } else if (suffixes.months.includes(kind)) {
                        newTime = milliseconds.month * parsedValue
                    } else newTime = 1000 * parsedValue
                    total = total + newTime
                    compiledKind = '', compiledTime = ''
                }
            }
        }
        return total
    }

    /**
     * Returns an array of time suffixes.
     */
    get suffixes() {
        return [
            'ms',
            'milliseconds',
            'milli',
            's',
            'secs',
            'sec',
            'second',
            'seconds',
            'm',
            'min',
            'mins',
            'minute',
            'minutes',
            'h',
            'hr',
            'hrs',
            'hour',
            'hours',
            'd',
            'day',
            'days',
            'w',
            'week',
            'weeks',
            'mo',
            'month',
            'months'
        ]
    }
}