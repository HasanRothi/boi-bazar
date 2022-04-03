import { CacheModule, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductSchema } from './entities/product.entity';
import { OwnerSchema } from '../owner/entities/owner.entity';
import { AuthModule } from '../auth/auth.module';
import * as redisStore from 'cache-manager-redis-store';
@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        //ttl: 1000,
        password: process.env.REDIS_PASSWORD,
        ...(process.env.REDIS_USER && { username: process.env.REDIS_USER }),
        ...(process.env.REDIS_DB && { db: process.env.REDIS_DB }),
        showFriendlyErrorStack: true,
        lazyConnect: true,
        maxRetriesPerRequest: 0,
        ...(process.env.NODE_ENV !== 'development' && { tls: {} }),
      }),
    }),
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Owner', schema: OwnerSchema },
    ]),
    AuthModule,
  ],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
