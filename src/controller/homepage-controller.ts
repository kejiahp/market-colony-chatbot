import { Request, Response } from "express";

export const getHomepage = (req: Request, res: Response) => {
    res.render('homepage.ejs')
}