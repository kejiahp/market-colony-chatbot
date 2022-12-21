import request from "request";
import { MessagingPostback } from "./fb-req-interfaces";
import { getElectronics, getJewelries, getMensClothing, getUserDetails, getWomensClothing } from "./helpers";
import { categoryProducts, imageAttachments, viewCategories } from "./template-responses";

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
export const handlePostback = async (sender_psid:string, received_postback: MessagingPostback) => {
    let response;
  
    // Get the payload for the postback
    let payload = received_postback.payload;
  
    // Set the response based on the postback payload
    switch(payload) {
      case "yes":
        response = { "text": "Thanks!" }
        callSendAPI(sender_psid, response);
        break
      case "no":
        response = { "text": "Oops, try sending another image." }
        callSendAPI(sender_psid, response);
        break
      case "GET_STARTED":
        const body:any = await getUserDetails(sender_psid)
        const username = `${body.last_name} ${body.first_name}`
  
        //first message
        response = {"text": `Welcome ${username}, thanks for checking out Market Colony's Ecommerce ChatBot`}
        callSendAPI(sender_psid, response);

        //second message
        response = {"text": "At any time, use the menu below to navigate through the features."}
        callSendAPI(sender_psid, response);

        //third message
        response = viewCategories
        callSendAPI(sender_psid, response);
        break
      case "ELECTRONICS":
        const electronicProducts = await getElectronics()

        response = categoryProducts(electronicProducts)
        callSendAPI(sender_psid, response);

        break
      case "JEWELERY":
        const jeweleryProducts = await getJewelries()

        response = categoryProducts(jeweleryProducts)
        callSendAPI(sender_psid, response);

        break
      case "MENS_CLOTHING":
        const mensProducts = await getMensClothing()

        response = categoryProducts(mensProducts)
        callSendAPI(sender_psid, response);

        break
      case "WOMENS_CLOTHING":
        const womensProducts = await getWomensClothing()

        response = categoryProducts(womensProducts)
        callSendAPI(sender_psid, response);

        break
      case "VIEW_CART":
        break
      case "EMPTY_CART":
        break
      default:
        response = {'text': "Command was not recognized"}
        callSendAPI(sender_psid, response);
    }
}
