import { CartItemsInterFace } from "../model/cart-model"
import { getUserDetails, ProductType } from "./helpers"
import dotenv from 'dotenv'
dotenv.config()

export const imageAttachments = (attachment_url: string) => {
    return {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "Don't send picture's to us!",
              "subtitle": "Tap a button to answer.",
              "image_url": attachment_url,
              "buttons": [
                {
                  "type": "postback",
                  "title": "OKAY",
                  "payload": "yes",
                },
                {
                  "type": "postback",
                  "title": "I WANT TO BE STUBBORN",
                  "payload": "no",
                }
              ],
            }]
          }
        }
      }
}

export const setupProfileResponse = () => {
    return {
      "get_started": {
          "payload": "GET_STARTED"
      },
      "greeting": [
        {
          "locale":"default",
          "text":"Market Colony Retail Bot, to give the user a wonderful buying and selling experience😊" 
        }
      ],
      "persistent_menu": [
          {
              "locale": "default",
              "composer_input_disabled": false,
              "call_to_actions": [
                  {
                      "type": "postback",
                      "title": "View cart",
                      "payload": "VIEW_CART"
                  },
                  {
                      "type": "postback",
                      "title": "Empty cart",
                      "payload": "EMPTY_CART"
                  },
                  {
                      "type": "postback",
                      "title": "View categories",
                      "payload": "VIEW_CATEGORIES"
                  }
              ]
          }
      ],
      "whitelisted_domains":[process.env.WHITE_LISTED_DOMAINS]    
  }
}

export const viewCategories =  {
    "text": "Would you like to view our categories?",
    "quick_replies":[
      {
        "content_type":"text",
        "title":"Electronics",
        "payload":"ELECTRONICS",
      },
      {
        "content_type":"text",
        "title":"Jewelery",
        "payload":"JEWELERY",
      },
      {
        "content_type":"text",
        "title":"Men's Clothing",
        "payload":"MENS_CLOTHING",
      },
      {
        "content_type":"text",
        "title":"Women's Clothing",
        "payload":"WOMENS_CLOTHING",
      }
    ]
}

export const categoryProducts = (body: ProductType[]) => {
  const elements = body.map((item:ProductType) => {
    return JSON.stringify({
      "title": item.title,
      "image_url": item.image,
      "subtitle": `$ ${item.price}`,
      "buttons":[
        {
          "type": "postback",
          "title": "Add to cart",
          "payload": `ADD_TO_CART_${item.id}_${item.category}_${item.price}_${item.title}`,
        },
      ]      
    })
  })

  return {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements": elements
        }
      }
  }

}

export const showCartElements = {
  "title":"Classic Gray T-Shirt",
  "subtitle":"100% Soft and Luxurious Cotton",
  "quantity":1,
  "price":25,
  "currency":"USD",
  "image_url":"http://originalcoastclothing.com/img/grayshirt.png"
}

export const receipt_template = async (sender_psid: string, cartItems:CartItemsInterFace[]) => {
  try{

    const body:any = await getUserDetails(sender_psid)
    const username = `${body.last_name} ${body.first_name}`
  
    let subtotal = 0
    cartItems.forEach((item:CartItemsInterFace)=>{
      subtotal += (Number(item.price) * item.quantity)
    })
  
    const shipping_cost = 5.00
    const total_tax = 5.00
    const total_cost = subtotal - (shipping_cost + total_tax)
  
    const elements = cartItems.map((item:CartItemsInterFace)=>{
      return {
        "title":item.title,
        "quantity": item.quantity,
        "price": item.price,
        "currency":"USD",
      }
    })
  
    return JSON.stringify({
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"receipt",
          "recipient_name": username,
          "order_number":"00000",
          "currency":"USD",
          "payment_method":"Visa 12345", 
          "address":{
            "street_1":"Abeokuta Street",
            "street_2":"",
            "city":"Lagos",
            "postal_code":"202021",
            "state":"Lagos",
            "country":"Nigeria"
          },
          "summary":{
            "subtotal": subtotal,
            "shipping_cost": shipping_cost,
            "total_tax": total_tax,
            "total_cost": total_cost
          },
          "elements": elements
        }
      }
    })
  }catch(e:any){
    console.log(e)
  }
}