import { getCustomRepository } from "typeorm"
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "@modules/products/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache"

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class UpdateProductService {

  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository)

    const product = await productRepository.findOne(id)

    if (!product) {
      throw new AppError('Produto não encontrado.', 404)
    }

    const productExists = await productRepository.findByName(name)

    if (productExists && name !== product.name) {
      throw new AppError('Já existe um produto com este nome.')
    }

    const redisCache = new RedisCache()

    await redisCache.invalidate('PRODUCT-LIST')

    productRepository.merge(product, { name, price, quantity })

    await productRepository.save(product)

    return product;
  }
}