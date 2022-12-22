import request from "request";
import { CartItemsInterFace } from "../model/cart-model";
import { addToCart, clearCart, createCart, findCart, findItemInCart, updateCart } from "../service/cart-service";
import { MessagingPostback } from "./fb-req-interfaces";
import { getElectronics, getJewelries, getMensClothing, getUserDetails, getWomensClothing, sendTypingOn } from "./helpers";
import { categoryProducts, imageAttachments, receipt_template, viewCategories } from "./template-responses";

// Sends response messages via the Send API
const callSendAPI = async (sender_psid:string, response:any) => {
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
export const handleMessage = async (sender_psid:string, received_message: any) => {
    let response;

    if (received_message && received_message.quick_reply && received_message.quick_reply.payload) {
        switch (received_message.quick_reply.payload) {
          case "ELECTRONICS":
            await sendTypingOn(sender_psid)
            const electronicProducts = await getElectronics()
            response = categoryProducts(electronicProducts)
            await callSendAPI(sender_psid, response);
            break

          case "JEWELERY":
            await sendTypingOn(sender_psid)
            const jeweleryProducts = await getJewelries()
            response = categoryProducts(jeweleryProducts)
            await callSendAPI(sender_psid, response);
            break

          case "MENS_CLOTHING":
            await sendTypingOn(sender_psid)
            const mensProducts = await getMensClothing()
            response = categoryProducts(mensProducts)
            await callSendAPI(sender_psid, response);
            break
          case "WOMENS_CLOTHING":
            await sendTypingOn(sender_psid)
            const womensProducts = await getWomensClothing()
            response = categoryProducts(womensProducts)
            await callSendAPI(sender_psid, response);
            break
        
          default:
            await sendTypingOn(sender_psid)
            response = {"text": `You sent the message: "${received_message.text}". Now send me an image!`}
            await callSendAPI(sender_psid, response);
            break;
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

        await callSendAPI(sender_psid, response);
      }
    else{
      response = {'text': "Command was not recognized🤷"}
      await callSendAPI(sender_psid, response);
    }
      
}

// Handles messaging_postbacks events
export const handlePostback = async (sender_psid:string, received_postback: MessagingPostback) => {
    let response;
  
    // Get the payload for the postback
    let payload = received_postback.payload;
  
    // Set the response based on the postback payload
 
      if(payload === "GET_STARTED"){
        const body:any = await getUserDetails(sender_psid)
        const username = `${body.last_name} ${body.first_name}`
  
        //first message
        response = {"text": `Welcome ${username}, thanks for checking out Market Colony's Ecommerce ChatBot`}
        await sendTypingOn(sender_psid)
        await callSendAPI(sender_psid, response);

        //second message
        response = {"text": "At any time, use the menu below to navigate through the features."}
        await sendTypingOn(sender_psid)
        await callSendAPI(sender_psid, response);

        //third message
        response = viewCategories
        await sendTypingOn(sender_psid)
        await callSendAPI(sender_psid, response);
      }
      else if(payload.startsWith("ADD_TO_CART")) {
        //ADD_TO_CART_${item.id}_${item.category}_${item.price}
        await sendTypingOn(sender_psid)
        const body:any = await getUserDetails(sender_psid)
        const username = `${body.last_name} ${body.first_name}`
        try{
          const [itemId, category, price, title] = payload.replace('ADD_TO_CART_', "").split("_")
          
          const hasCart = await findCart(sender_psid)
  
          if (!hasCart) {
            const createUserCart = await createCart({psid: sender_psid, cartItems: [{itemId, category, price, quantity:1,title}]})
            if(createUserCart) {
              response = {"text": `Cart created for ${username} and items added.`}
              await callSendAPI(sender_psid, response);
            }
          }else{
            const isItemInCart = await findItemInCart({itemId, category, price})

            if(!isItemInCart) {
              const addToUserCart = await addToCart(sender_psid, {itemId, category, price, quantity: 1,title})
              if(addToUserCart) {
                response = {"text": `Items added to ${username} cart`}
                await callSendAPI(sender_psid, response);
              }
            }else{
              const itemFromCart = isItemInCart.cartItems.find((item: CartItemsInterFace) => item.itemId === itemId && item.category === category && item.price === price)
              const quantity = itemFromCart.quantity + 1
              const addToUserCart = await updateCart(sender_psid, {itemId:itemFromCart.itemId, category:itemFromCart.category, price:itemFromCart.price}, quantity)

              if(addToUserCart) {
                response = {"text": `Items updated in ${username}'s cart`}
                await callSendAPI(sender_psid, response);
              }
            }
          }

        }catch(e:any){
          console.log("[ADD TO CART ERROR]",e)
          response = {"text": `Unable to update cart`}
          await callSendAPI(sender_psid, response);
        }
        
      }
      else if (payload === "VIEW_CART") {
        await sendTypingOn(sender_psid)
        //RECEIPT OR CART SUMMARY NEEDED HERE
        const cart = await findCart(sender_psid)
        if(!cart) {
          console.log("[CART WASN'T FOUND]")
          response = {"text": `Cant find cart`}
          await callSendAPI(sender_psid, response);
        } else {
          console.log("[CART WAS FOUND]")
          response = await receipt_template(sender_psid, cart.cartItems)
          await callSendAPI(sender_psid, response);
        }
      }
      else if (payload === "EMPTY_CART") {
        try{
          await sendTypingOn(sender_psid)
          const emptyCart = await clearCart(sender_psid)
          if(emptyCart) {
            response = {"text": `Cart as been emptied`}
            await callSendAPI(sender_psid, response);
          }
        }catch(e:any){
          console.log("[EMPTY CART ERROR]",e)
          response = {"text": `Unable to empty cart`}
          await callSendAPI(sender_psid, response);
        }
      }
      else if (payload === "VIEW_CATEGORIES") {
        await sendTypingOn(sender_psid)
        response = viewCategories
        await callSendAPI(sender_psid, response);
      }
      else if (payload === "yes") {
        response = { "text": "Thanks 😊(❁´◡`❁)" }
        await callSendAPI(sender_psid, response);
      }
      else if (payload === "no") {
        response = { "text": "I HAVE YOUR ADDRESS AND I WILL FIND YOU.😈😈😈" }
        await callSendAPI(sender_psid, response);
      }
      else{
        response = {'text': "Command was not recognized🤷"}
        await callSendAPI(sender_psid, response);
      }

}
