import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { Owner } from '../owner/entities/owner.entity'
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly ProductModel: Model<Product>,
    @InjectModel('Owner') private readonly OwnerModel: Model<Owner>
  ) {}
  async create(createProductInput: CreateProductInput) {
    const data = new this.ProductModel(createProductInput)
    const result = await data.save();
    await this.OwnerModel.findOneAndUpdate({
      _id : createProductInput.owner
    } , {
      $addToSet : { 
        products : result._id
      }
    })
    return result;
  }

  async findAll(limit : number) {
    return await this.ProductModel.find().limit(limit);
  }

  async findOne(id: any) {
    const data = await this.OwnerModel.findById(id)
    return data;
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
