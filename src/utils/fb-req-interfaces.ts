/*
TRIED TO CREATE INTERFACES FOR THE PAYLOADS OR RESPONSES FROM THE WEBHOOK, MOST OF THE INTERFACES DONT WORK AND ARE NOT IN USE
*/

export interface MessagingReferral {
    source: string;
    type: string;
    ref: string;
    referer_uri: string;
  }
  export interface MessagingPostback {
    title: string;
    payload:string;
    referral: MessagingReferral;
   }
  
   export interface MessagingDelivery {
    mids: string[];
    watermark: number;
    seq?: number;
  }
  export interface MessagingEvent {
    message: {
      is_echo: boolean;
      app_id: string;
      metadata: string;
      mid: string;
      text: string;
      attachments: MessageAttachment;
      quick_reply: MessageQuick_Reply;
    };
    delivery: MessagingDelivery;
    postback: MessagingPostback;
    read: {
      watermark: number;
      seq?: number;
    }
    optin: {
      ref: string;
      user_ref: string;
    };
    account_linking: {
      status: 'linked' | 'unlinked',
      authorization_code: string;
    };
    sender: {
      id: string;
    }
    recipient: {
      id: string;
    };
    timestamp: string;
  }
  export interface PageEntry {
    id: string;
    time: string;
    messaging: [];
  }
  export interface MessagesSender {
    id: string;
  }
  export interface MessagesRecipient {
    id: string;
  }
  export interface MessageAttachment {
    type: string;
    payload: string;
  }
  export interface MessageQuick_Reply {
    payload: string;
  }
  export interface Message {
    mid: string;
    text: string;
    attachments: Array<MessageAttachment>;
    quick_reply: MessageQuick_Reply;
  }