import { ObjectType, Field, Int , ID} from '@nestjs/graphql';
import { Owner } from '../../owner/entities/owner.entity'
@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;
  
  @Field(() => String)
  name: string;
  
  @Field(() => Owner)
  owner: Owner;
  
  @Field(() => Date)
  createdAt: Date;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema , Types  } from 'mongoose';

@Schema({ timestamps: true })
export class ProductModel extends Document {
  @Prop({ type: String, required: true })
  name: string;
  
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Owner', required: true })
  owner: Types.ObjectId;

  @Prop() createdAt: Date;
  @Prop() updatedAt: Date;
}
export const ProductSchema = SchemaFactory.createForClass(ProductModel);
//export interface Owner {
//  id: string;
//  name: string;
//}
