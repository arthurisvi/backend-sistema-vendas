import { getCustomRepository } from "typeorm"
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache"

interface IRequest {
  id: string;
}

export default class DeleteProductService {

  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository)

    const product = await productRepository.findOne(id)

    if (!product) {
      throw new AppError('Produto não encontrado.', 404)
    }

    const redisCache = new RedisCache()

    await redisCache.invalidate('PRODUCT-LIST')

    await productRepository.remove(product)
  }

}