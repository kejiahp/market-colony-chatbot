import request from "request";
import { MessagingPostback } from "./fb-req-interfaces";
import { imageAttachments } from "./template-responses";

// Sends response messages via the Send API
const callSendAPI = (sender_psid:string, response:any) => {
    let request_body = {
        "recipient": {
          "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
        console.log('message sent!')
        } else {
        console.error("Unable to send message:" + err);
        }
    }); 
}

// Handles messages events
export const handleMessage = (sender_psid:string, received_message: any) => {
    let response;
    // const received_message = received_message.message

    // Check if the message contains text
    if (received_message.text) {    
  
      // Create the payload for a basic text message
      response = {
        "text": `You sent the message: "${received_message.text}". Now send me an image!`
      }
    } else if (received_message.attachments) {
      //get the payload.url
      let attachment_urls = []
  
        // Gets the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url;

        received_message.attachments.forEach((item: any) =>{
          attachment_urls.push(item.payload.url)
        })
        
        response = imageAttachments(attachment_url)
      }
    
    // Sends the response message
    callSendAPI(sender_psid, response);  
}

// Handles messaging_postbacks events
export const handlePostback = (sender_psid:string, received_postback: MessagingPostback) => {
    let response;
  
    // Get the payload for the postback
    let payload = received_postback.payload;
  
    // Set the response based on the postback payload
    if (payload === 'yes') {
      response = { "text": "Thanks!" }
    } else if (payload === 'no') {
      response = { "text": "Oops, try sending another image." }
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}
