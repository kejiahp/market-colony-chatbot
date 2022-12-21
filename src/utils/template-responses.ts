import { ProductType } from "./helpers"

export const imageAttachments = (attachment_url: string) => {
    return {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "Is this the right picture?",
              "subtitle": "Tap a button to answer.",
              "image_url": attachment_url,
              "buttons": [
                {
                  "type": "postback",
                  "title": "Yes!",
                  "payload": "yes",
                },
                {
                  "type": "postback",
                  "title": "No!",
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
          "text":"Market Colony Retail Bot" 
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
                  }
              ]
          }
      ],
      "whitelisted_domains":[
          "https://fondible.com/",
      ]    
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
      "subtitle": item.price,
      "buttons":[
        {
          "type": "postback",
          "title": "Add to cart",
          "payload": `ADD_TO_CART_${item.id}_${item.category}_${item.price}`,
        },
      ]      
    })
  })

  console.log("[THIS ARE THE ELEMENTS]",elements)

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
