import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerResolver } from './owner.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { OwnerSchema } from '../owner/entities/owner.entity';
import { ProductSchema } from '../products/entities/product.entity'
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'Owner', schema: OwnerSchema },
      { name: 'Product', schema: ProductSchema }
    ]),
  ],
  providers: [OwnerResolver, OwnerService]
})
export class OwnerModule {}
