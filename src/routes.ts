import { Express } from "express"
import { getHomepage } from "./controller/homepage-controller"
import { getProfilePage, setUpProfile } from "./controller/profile-controller"
import { getWebHook, postWebHook } from "./controller/webhook-controller"

const routes = (app: Express) => {
    //homepage routes
    app.get('/', getHomepage)

    //webhook routes
    app.get('/webhook', getWebHook)
    app.post('/webhook', postWebHook)

    //setup profile routes
    app.get('/profile', getProfilePage)
    app.post('/profile/setup-profile', setUpProfile)
}

export default routes