import { NextFunction, Request, Response, Router } from 'express';
import itemsController from '../../controllers/itemsControllers';

class itemsRouter {
  private _router = Router();
  private _controller = itemsController;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  private _configure() {
    this._router.get('/', async (req: Request, res: Response, next: NextFunction) => {
      const result = await this._controller.listAllItems(req.query.q?.toString());
      if(result.error){
        return res.status(500).send(result.error);
      }
      return res.status(200).json(result);
    });

    this._router.get('/:id', async (req: Request, res: Response, next: NextFunction) => { 
      if(!req.params.id){
        return res.status(401).send({
          message: 'item not found'
        })
      }

      const result = await this._controller.findById(req.params.id)
      if(result.error){
        return res.status(500).send(result.error)
      }
      return res.status(200).json(result);
    });
  }
}

export = new itemsRouter().router;