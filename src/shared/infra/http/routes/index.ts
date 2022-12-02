import { Router } from 'express';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import ordersRouter from '@modules/orders/infra/http/routes/order.routes';
import authRouter from '@modules/users/infra/http/routes/auth.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);
routes.use('/auth', authRouter);
routes.use('/password', passwordRouter);

export default routes;