import { Request, Response } from "express";
import request from "request";
import { setupProfileResponse } from "../utils/template-responses";
import dontenv from 'dotenv'
dontenv.config()

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

export const getProfilePage = (req: Request, res: Response) => {
    res.render("profile.ejs")
}

export const setUpProfile = (req: Request, res: Response) => {
    const uri = "https://graph.facebook.com/v15.0/me/messenger_profile"

    const data = setupProfileResponse()

    try{
        request({
            uri,
            qs: {"access_token":PAGE_ACCESS_TOKEN},
            method: "POST",
            json: data
        }, (err, res, body)=>{
            if(!err){
                console.log(res.statusCode, 'profile set up')
            } else {
                console.log(res.statusCode)
                throw new Error(err)
            }
        })

        return res.status(200).json({
            message: "ok"
        })
    }
    catch(e) {
        console.log(e)
        return res.status(500).json({
            message: e
        })
    }
}