import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "../entities/products.entity";
import { CreateProductDto, UpdateProductDto } from "../dtos/products.dto";


@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: "Product 1",
      description: "Product 1, bla bla",
      price: 123,
      stock: 1,
      image: "www.google.com"
    }
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id == id);
    if (!product){
      throw new NotFoundException(`Product with id #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(payload: UpdateProductDto, id: number) {
    const indexProduct = this.products.findIndex((item) => item.id == id);
    if (indexProduct != -1) {
      this.products[indexProduct] = {
        ...this.products[indexProduct],
        ...payload
      };
      return this.products[indexProduct]
    }
    throw new NotFoundException(`Product with id #${id} not found`);
  }

  delete(id: number) {
    const indexProduct = this.products.findIndex((item) => item.id == id);
    if (indexProduct != -1) {
      this.products.splice(indexProduct, 1);
    }
    throw new NotFoundException(`Product with id #${id} not found`);
  }
}
