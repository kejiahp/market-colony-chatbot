import request from 'request'
import dontenv from 'dotenv'
dontenv.config()

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

export const getUserDetails = (sender_psid: string) => {
    return new Promise((resolve, reject)=>{

        const uri = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`
        request({
            uri,
            method: "GET",
        }, (err, res, body)=>{
            if (!err) {
                body = JSON.parse(body)
                resolve(body)
            } else {
                reject(err)
            }
        })

    })
}

export type ProductType = {
    id: number,
    title:string,
    price: number,
    description:string,
    category:string,
    image:string,
    rating:{
        rate: number,
        count: number
    }
}

export const getJewelries = async ():Promise<ProductType[]> => {
    return new Promise((resolve, reject)=>{
        const uri = "https://fakestoreapi.com/products/category/jewelery"
        request({
            uri,
            method: "GET"
        }, (err, res, body)=>{
            if(!err){
                body = JSON.parse(body)
                resolve(body)
            }
            else{
                reject(err)
            }
        })
    })
}

export const getElectronics = ():Promise<ProductType[]> => {
    return new Promise((resolve, reject)=>{
        const uri = "https://fakestoreapi.com/products/category/electronics"
        request({
            uri,
            method: "GET"
        }, (err, res, body)=>{
            if(!err){
                body = JSON.parse(body)
                resolve(body)
            }
            else{
                reject(err)
            }
        })
    })
}
export const getMensClothing = ():Promise<ProductType[]> => {
    return new Promise((resolve, reject)=>{
        const uri = "https://fakestoreapi.com/products/category/men's%20clothing"
        request({
            uri,
            method: "GET"
        }, (err, res, body)=>{
            if(!err){
                body = JSON.parse(body)
                resolve(body)
            }
            else{
                reject(err)
            }
        })
    })
}
export const getWomensClothing = ():Promise<ProductType[]> => {
    return new Promise((resolve, reject)=>{
        const uri = "https://fakestoreapi.com/products/category/women's%20clothing"
        request({
            uri,
            method: "GET"
        }, (err, res, body)=>{
            if(!err){
                body = JSON.parse(body)
                resolve(body)
            }
            else{
                reject(err)
            }
        })
    })
}
