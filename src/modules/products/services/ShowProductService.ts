import { getCustomRepository } from "typeorm"
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";
import Product from "@modules/products/infra/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

interface IRequest{
  id: string;
}

export default class ShowProductService {

  public async execute({ id }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository)

    const product = await productRepository.findOne(id)

    if (!product) {
      throw new AppError('Produto não encontrado.', 404)
    }

    return product;
  }

}