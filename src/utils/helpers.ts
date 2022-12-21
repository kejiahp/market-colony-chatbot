import request from 'request'
import dontenv from 'dotenv'
dontenv.config()

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

export const getUserDetails = (sender_psid: string) => {
    return new Promise((resolve, reject)=>{

        const uri = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`
        request({
            uri,
            method: "GET",
        }, (err, res, body)=>{
            if (!err) {
                body = JSON.parse(body)
                resolve(body)
            } else {
                reject(err)
            }
        })

    })
}