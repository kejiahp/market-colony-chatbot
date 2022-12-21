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
      "persistent_menu": [
          {
              "locale": "default",
              "composer_input_disabled": false,
              "call_to_actions": [
                  {
                      "type": "postback",
                      "title": "view cart",
                      "payload": "VIEW_CART"
                  },
                  {
                      "type": "postback",
                      "title": "empty cart",
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