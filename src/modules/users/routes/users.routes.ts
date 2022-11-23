import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate"
import UsersController from "../controllers/UsersController";
import isAuthenticated from "../middlewares/isAuthenticated";

const usersRouter = Router();
const usersController = new UsersController()

usersRouter.get('/', isAuthenticated ,usersController.index)

usersRouter.post(
  '/register',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  usersController.store)


export default usersRouter;