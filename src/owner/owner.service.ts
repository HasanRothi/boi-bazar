import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Owner } from './entities/owner.entity';
import { Product } from '../products/entities/product.entity'

@Injectable()
export class OwnerService {
  constructor(
    @InjectModel('Owner') private readonly OwnerModel: Model<Owner>,
    @InjectModel('Product') private readonly ProductModel: Model<Product>
  ) {}
  async create(createOwnerInput: CreateOwnerInput) {
    const data = new this.OwnerModel(createOwnerInput)
    const result = await data.save();
    return result;
  }

  async findAll(limit: number){
    return await this.OwnerModel.find().limit(limit);
  }

  async findOne(id: any) {
    //console.log(id)
    const data = await this.ProductModel.find({
      _id : {
        $in : id
      }
    })
    //console.log(data)
    return data
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
