import { Request, Response } from "express";
import dotenv from 'dotenv'
import { handleMessage, handlePostback } from "../utils/messaging-utils";
dotenv.config()

const VERIFY_TOKEN = process.env.VERIFY_TOKEN
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

export const getWebHook = (req: Request, res: Response) => {    
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];
    
        if (mode && token) {
        
          if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
          
          } else {
            res.sendStatus(403);      
          }
        }
        else{
          res.sendStatus(403)
        }
}

export const postWebHook = (req: Request, res: Response) => {
    const body = req.body
    if (body.object === 'page') {
      
        body.entry.forEach((entry:any) => {
    
          let webhook_event = entry.messaging[0];
  
          //get the sender psid - page scoped id
          let sender_psid = webhook_event.sender.id
          
          if (webhook_event.message) {
            handleMessage(sender_psid, webhook_event.message)
          } else if (webhook_event.postback) {
            handlePostback(sender_psid, webhook_event.postback)
          }
        });
  
        res.status(200).send('EVENT_RECEIVED');
    
      } else {
        res.sendStatus(404);
      }
}