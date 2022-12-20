import { Express } from "express"
import { getHomepage } from "./controller/homepage-controller"
import { getWebHook, postWebHook } from "./controller/webhook-controller"

const routes = (app: Express) => {
    app.get('/', getHomepage)

    app.get('/webhook', getWebHook)
    app.post('/webhook', postWebHook)
}

export default routes