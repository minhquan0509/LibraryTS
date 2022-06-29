import express, { Application, Request, Response } from 'express';
class siteController {
    public home(req: Request, res: Response) {
        return res.render('home');
    }

    public about(req: Request, res: Response) {
        return res.render('about');
    }
}

export = new siteController

// export class SiteController {
//     private static singleton: SiteController;

//     private constructor() {}

//     public static get instance(): SiteController {
//         if (!SiteController.singleton) {
//             SiteController.singleton = new SiteController();
//         }
//         return SiteController.singleton;
//     }

//     public home(req: Request, res: Response){
//         return res.render('home');
//     }

//     public about(req: Request, res: Response){
//         return res.render('about');
//     }
// }


// ////
// import { SiteController } from '..';


// SiteController.getInstance.home();

