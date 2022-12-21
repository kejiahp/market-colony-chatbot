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

export const getJewelries = async () => {
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
// {"id":9,"title":"WD 2TB Elements Portable External Hard Drive - USB 3.0 ","price":64,"description":"USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system","category":"electronics","image":"https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg","rating":{"rate":3.3,"count":203}}
export const getElectronics = () => {
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
export const getMensClothing = () => {
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
export const getWomensClothing = () => {
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
