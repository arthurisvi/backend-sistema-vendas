import { Router } from "express";
import ProductsController from "../controllers/ProductsController";

const productsRouter = Router();
const productsController = new ProductsController()

productsRouter.get('/', productsController.index)
productsRouter.get('/:id', productsController.show)
productsRouter.post('/', productsController.store)
productsRouter.put('/:id', productsController.update)
productsRouter.delete('/:id', productsController.destroy)

export default productsRouter;