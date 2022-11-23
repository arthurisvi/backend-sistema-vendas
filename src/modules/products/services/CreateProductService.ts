import { getCustomRepository } from "typeorm"
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "@modules/products/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

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
      
    const product: Product = productRepository.create({
      name,
      price,
      quantity,
    });

    await productRepository.save(product)

    return product;
  }
}