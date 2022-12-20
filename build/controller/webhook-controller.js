"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postWebHook = exports.getWebHook = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const getWebHook = (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        }
        else {
            res.sendStatus(403);
        }
    }
    else {
        res.sendStatus(403);
    }
};
exports.getWebHook = getWebHook;
const postWebHook = (req, res) => {
    const body = req.body;
    if (body.object === 'page') {
        body.entry.forEach((entry) => {
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
            //get the sender psid - page scoped id
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);
            //   if (webhook_event.message) {
            //     handleMessage(sender_psid, webhook_event.message)
            //   } else if (webhook_event.postback) {
            //     handlePostback(sender_psid, webhook_event.postback)
            //   }
        });
        res.status(200).send('EVENT_RECEIVED');
    }
    else {
        res.sendStatus(404);
    }
};
exports.postWebHook = postWebHook;
