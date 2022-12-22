import { FilterQuery, UpdateQuery } from "mongoose"
import Cart, { CartItemsInterFace } from "../model/cart-model"
import { CartInterFace } from "../model/cart-model"

export const createCart = async (input: CartInterFace) => {
    try{
        const cart = await Cart.create(input)
        return cart.toJSON()
    }catch(e:any){
        throw new Error(e)
    }
}
export const findCart = async (psid:string) => {
    try{
        const cart = await Cart.findOne({psid})
        return cart?.toJSON()
    }catch(e:any){
        return false
    }
}
export const findItemInCart = async (input: FilterQuery<CartItemsInterFace>) => {
    try{
        const cart = await Cart.findOne({cartItems:input})
        console.log("[FOUND ITEM]",cart)
        return cart?.toJSON()
    }catch(e:any){
        return false
    }
}
export const addToCart = async (psid: string, input:UpdateQuery<CartItemsInterFace>) => {
    try{
        const cart = await Cart.findOneAndUpdate({psid}, {$push: {cartItems: input}}, {new: true})
        return cart?.toJSON()
    }catch(e:any){
        throw new Error(e)
    }
}
export const clearCart = async (psid:string) => {
    try{
        const cart = await Cart.findOneAndUpdate({psid}, {cartItems: []}, {new: true})
        return cart?.toJSON()
    }catch(e:any){
        throw new Error(e)
    }
}