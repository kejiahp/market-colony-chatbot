import mongoose from "mongoose";

export interface CartItemsInterFace {
    itemId: string
    category: string
    quantity: number
    price: string
    title: string
}

export interface CartItemsDocument extends CartItemsInterFace, mongoose.Document{
    createdAt: Date
    updatedAt: Date
}

export interface CartInterFace {
    psid: string
    cartItems: CartItemsInterFace[]   
}

export interface CartDocument extends CartInterFace, mongoose.Document{
    createdAt: Date
    updatedAt: Date
}

const CartItems = new mongoose.Schema<CartItemsDocument>({
    itemId : {
        type: String,
        required: [true, "itemId is required"]
    },
    category: {
        type: String,
        required: [true, "category is required"]
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: String,
        required: [true, "price is required"]
    },
    title: {
        type: String,
        required: [true, "title is required"]
    }
},{timestamps: true})


const CartSchema = new mongoose.Schema<CartDocument>({
    psid: {
        type: String,
        required: [true, "psid is required"]
    },
    cartItems: [CartItems]
}, {timestamps: true})

const Cart = mongoose.model('Market-Colony-Cart',CartSchema)

export default Cart