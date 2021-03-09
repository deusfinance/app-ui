const Token = "1671542807:AAGpWB9TktHkaJlE_RiU3yrpggSqX5fGtg0"
const ChatId = "-1001163527818"

export async function sendMessage(msg) {
    const url = `https://api.telegram.org/bot${Token}/sendMessage?parse_mode=HTML&chat_id=${ChatId}&text=${encodeURI(msg)}`
    try {
        await fetch(url)
    } catch (error) {
        console.log(error);
    }
}