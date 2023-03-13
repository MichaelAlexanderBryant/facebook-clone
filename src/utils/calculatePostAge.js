function calculatePostAge(post) {
    let postDateTime = new Date(post.created_at)
    let currentDateTime = new Date(Date.now())

    if ((postDateTime.getFullYear()-currentDateTime.getFullYear() ) >= 1){
        return String(currentDateTime.getFullYear() - postDateTime.getFullYear()) + "y"
    } else if ((currentDateTime.getMonth() - postDateTime.getMonth()) >= 1) {
        return String(currentDateTime.getMonth() - postDateTime.getMonth()) + "mo"
    } else if ((currentDateTime.getDate() - postDateTime.getDate()) >= 1) {
        return String(currentDateTime.getDate() - postDateTime.getDate()) + "d"
    } else if ((currentDateTime.getHours() - postDateTime.getHours()) >= 1) {
        return String(currentDateTime.getHours() - postDateTime.getHours()) + "h"
    } else {
        let minutes = Math.floor((currentDateTime.getTime() - postDateTime.getTime())/60000)
        return String(minutes) + "m"
        }
}

export {calculatePostAge};