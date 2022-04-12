import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from '../entities/product.entitie';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/products.dtos';

@Injectable()
export class ProductsService {
  private counterID = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'desc',
      price: 122,
      image: '',
      stock: 12,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {

    const product = this.products.find((product) => product.id === id);
    if(!product){
      throw new NotFoundException(`Product #${id} not found`)
    }

    return product
  }

  create(payload: CreateProductDTO) {
    const newProduct = {
      id: ++this.counterID,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDTO){
    const product = this.findOne(id);
    console.log(product)
    if(product){
      const index = this.products.findIndex((product) => product.id === id)
      this.products[index] = {
        ...product,
        ...payload
      }
      return this.products[index]
    }

    return null;
  }

  delete(id: number){
    const product = this.findOne(id)
    if(product){
      const modifiedList = this.products.filter(product => product.id !== id)
      this.products = modifiedList
      return id
    }
    return null
  }
}
