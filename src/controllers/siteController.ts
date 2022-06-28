import express, {Application, Request, Response} from 'express';
 class siteController {
    public home(req: Request, res: Response){
        return res.render('home');
    }

    public about(req: Request, res: Response){
        return res.render('about');
    }
}

export = new siteController

