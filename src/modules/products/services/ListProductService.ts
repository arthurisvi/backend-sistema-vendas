import { getCustomRepository } from "typeorm"
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";
import Product from "@modules/products/infra/typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisCache"

export default class ListProductService{

  public async execute(): Promise<Product[]>{
    const productRepository = getCustomRepository(ProductRepository)

    const redisCache = new RedisCache()

    let products = await redisCache.recover<Product[]>('PRODUCT-LIST')

    if (!products) {
      products = await productRepository.find()
      await redisCache.save('PRODUCT-LIST', products)
    }
    
    return products
  }

}