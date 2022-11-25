import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate"
import CustomersController from "../controllers/CustomersController";

const customersRouter = Router();
const customersController = new CustomersController()

customersRouter.get('/', customersController.index)

customersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  customersController.show)

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required()
    }
  }),
  customersController.store)

customersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required()
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  customersController.update)

customersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  customersController.destroy)

export default customersRouter;