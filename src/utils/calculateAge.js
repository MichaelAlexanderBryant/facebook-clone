function calculateAge(obj) {
    let objDateTime = new Date(obj.created_at)
    let currentDateTime = new Date(Date.now())
    let timeDifference = currentDateTime.getTime() - objDateTime.getTime() // Milliseconds
    const minutesConversion = (1/1000)*(1/60)
    const hoursConversion = minutesConversion*(1/60)
    const daysConversion = hoursConversion*(1/24)
    const monthsConversion = daysConversion*(1/30)
    const yearsConversion = monthsConversion*(1/365)

    if (Math.floor(timeDifference*yearsConversion) >= 1){
        return String(Math.floor(timeDifference*yearsConversion)) + "y"
    } else if (Math.floor(timeDifference*monthsConversion) >= 1) {
        return String(Math.floor(timeDifference*monthsConversion)) + "mo"
    } else if (Math.floor(timeDifference*daysConversion) >= 1) {
        return String(Math.floor(timeDifference*daysConversion)) + "d"
    } else if (Math.floor(timeDifference*hoursConversion) >= 1) {
        return String(Math.floor(timeDifference*hoursConversion)) + "h"
    } else {
        let minutes = Math.floor(timeDifference*minutesConversion)
        return String(minutes) + "m"
        }
}

export {calculateAge};