import { getCustomRepository } from "typeorm"
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "@modules/products/typeorm/entities/Product";

export default class ListProductService{

  public async execute(): Promise<Product[]>{
    const productRepository = getCustomRepository(ProductRepository)

    const products = await productRepository.find()

    return products
  }

}