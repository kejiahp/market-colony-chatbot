# Facebook Ecommerce ChatBot

#### Description
An ecommerce chatbot created for the facebook messenger platform. This server was built upon the following techonolgies:
1. NodeJS
2. TypeScript
3. Express
4. EJS
5. Mongoose
6. FaceBooks Graph Api

## Folder Structure
A basic explanation of how I structured the folders and their content

### app file
Acts as the general entry point into the application, the express server is instantiated here. 

### routes file
This is a function that receives the instance of the express server and uses it to create routes to all other endpoint of the application.

### controller folder
1. **homepage-controller**: Contains the controller that renders the home page template
2. **profile-controller:** Contains the controller to render the profile ejs template and set up the messenger bot.
3. **webhook-controller**: Contains the controller to receive post and get webhook request from facebook

### model folder
1. **cart-model**: contains the cart schema.

### public folder
contains the static files

### service folder
1. **cart-service**: Functions that communicate with the database and return data

### utils folder
1. **db-connect**: Functions that connects the server with the database
2. **fb-req-interface**: It tried to create interfaces to give the facebook responses type inferencing but that didn't go well🥲, so i left them there🤷‍♂️.
3. **helpers**: Functions that get data from [fakestoreapi](https://fakestoreapi.com/) api, show the user the server is responding on messenger and get userdata from the facebook.
4. **messaging-utils**: Controls the sending of responses to the messenger platform, the handling of messages(attachments.e.g files,images,documents) and the handling of psotback responses.
5. **template-responses**: Controls the generation of messenger response templates

### views
contains the html templates