import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductSchema } from './entities/product.entity';
import { OwnerSchema } from '../owner/entities/owner.entity';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Owner', schema: OwnerSchema },
    ]),
    AuthModule,
  ],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
