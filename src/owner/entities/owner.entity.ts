import { ObjectType, Field, Int ,ID } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity'

@ObjectType()
export class Owner {
  @Field(() => ID)
  id: string;
  
  @Field(() => [Product])
  products: [Product];
  
  @Field(() => String)
  name: string;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema ,Types } from 'mongoose';

@Schema({ timestamps: true })
export class OwnerModel extends Document {
  @Prop({ type: String, required: true })
  name: string;
 
  @Prop([
    { type: MongooseSchema.Types.ObjectId, ref: 'Product'},
  ])
  products: [Types.ObjectId];

  @Prop() createdAt: Date;
  @Prop() updatedAt: Date;
}
export const OwnerSchema = SchemaFactory.createForClass(OwnerModel);
//export interface Owner {
//  id: string;
//  name: string;
//}
