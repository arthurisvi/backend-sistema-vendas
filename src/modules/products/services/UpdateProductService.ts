import { getCustomRepository } from "typeorm"
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import { Product } from "@modules/products/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

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

    // product.name = name
    // product.price = price
    // product.quantity = quantity
    
    // await productRepository.save(product)

    productRepository.merge(product, { name, price, quantity })

    return product;
  }
}