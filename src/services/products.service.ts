import { Injectable } from '@nestjs/common';

import {Product} from '../entities/product.entitie'

@Injectable()
export class ProductsService {
  private counterID = 1
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

  findAll(){
    return this.products;
  }

  findOne(id: number){
    return this.products.find((product) => product.id === id);
  }

  create(payload : any){
   const newProduct = {
     id: ++this.counterID,
     ...payload
   };
   this.products.push(newProduct)
   return newProduct;
  }
}
