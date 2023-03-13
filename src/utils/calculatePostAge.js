function calculatePostAge(post) {
    let postDateTime = new Date(post.created_at)
    let currentDateTime = new Date(Date.now())

    if ((currentDateTime.getFullYear() - postDateTime.getFullYear()) >= 1){
        return String(currentDateTime.getFullYear() - postDateTime.getFullYear()) + "y"
    } else if ((currentDateTime.getMonth() - postDateTime.getMonth()) >= 1) {
        return String(currentDateTime.getMonth() - postDateTime.getMonth()) + "mo"
    } else if ((currentDateTime.getDay() - postDateTime.getDay()) >= 1) {
        return String(currentDateTime.getDay() - postDateTime.getDay()) + "d"
    } else if ((currentDateTime.getHours() - postDateTime.getHours()) >= 1) {
        return String(currentDateTime.getHours() - postDateTime.getHours()) + "h"
    } else if ((currentDateTime.getMinutes() - postDateTime.getMinutes()) >= 1) {
        return String(currentDateTime.getMinutes() - postDateTime.getMinutes()) + "m"
    }else {
        return "1m"
    }
}

export {calculatePostAge};