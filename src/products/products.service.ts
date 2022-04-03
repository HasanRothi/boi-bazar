import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { Owner } from '../owner/entities/owner.entity';
import { Cache } from 'cache-manager';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly ProductModel: Model<Product>,
    @InjectModel('Owner') private readonly OwnerModel: Model<Owner>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async create(createProductInput: CreateProductInput) {
    const data = new this.ProductModel(createProductInput);
    const result = await data.save();
    await this.OwnerModel.findOneAndUpdate(
      {
        _id: createProductInput.owner,
      },
      {
        $addToSet: {
          products: result._id,
        },
      },
    );
    return result;
  }

  async findAll(limit: number) {
    const cache = await this.cacheChecker(
      'off-koto-all-products',
      this.ProductModel,
    );
    if (cache) {
      console.log('cache hit');
      return cache;
    }
    const data = await this.ProductModel.find().limit(limit);
    this.cacheUpdater('off-koto-all-products', data, 10);
    console.log('cache miss');
    return data;
  }

  async findOne(id: any) {
    const data = await this.OwnerModel.findById(id);
    return data;
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
  async cacheChecker(key, Model) {
    const value = await this.cacheManager.get(key);
    if (value) {
      const parseData = await JSON.parse(value);
      return Array.isArray(parseData)
        ? parseData.map((doc) => new Model(doc))
        : new Model(parseData);
    }
    return value;
  }
  async cacheUpdater(key: string, data: any, ttl = 0) {
    await this.cacheManager.set(key, JSON.stringify(data), {
      ttl: ttl,
    });
  }
}
