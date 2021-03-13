
import { Router } from 'express';
import itemsRouter from './itemsRouter/itemsRouter';

class MasterRouter {
  private _router = Router();
  private _subRouterItems = itemsRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching routers.
   */
  private _configure() {
    this._router.use('/items', this._subRouterItems);
  }
}

export = new MasterRouter().router;