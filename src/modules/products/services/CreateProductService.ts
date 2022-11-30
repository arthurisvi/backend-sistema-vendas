import { getCustomRepository } from "typeorm"
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";
import Product from "@modules/products/infra/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache"

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService {

  public async execute({name, price, quantity}: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository)

    const productExists = await productRepository.findByName(name)

    if (productExists) {
      throw new AppError('Já existe um produto com este nome.')
    }

    const redisCache = new RedisCache()
      
    const product: Product = productRepository.create({
      name,
      price,
      quantity,
    });
    
    await redisCache.invalidate('PRODUCT-LIST')

    await productRepository.save(product)

    return product;
  }
}