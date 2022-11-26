import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';
import customersRouter from '@modules/customers/routes/customers.routes';
import ordersRouter from '@modules/orders/routes/order.routes';
import authRouter from '@modules/users/routes/auth.routes';
import passwordRouter from '@modules/users/routes/password.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);
routes.use('/auth', authRouter);
routes.use('/password', passwordRouter);

export default routes;