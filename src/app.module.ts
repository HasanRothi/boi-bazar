
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductsModule } from './products/products.module';
import { OwnerModule } from './owner/owner.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    ),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      //subscriptions: {
      //  'graphql-ws': true
      //},
      autoSchemaFile: 'schema.gql',
      buildSchemaOptions: {
        dateScalarMode: 'timestamp', // return fullDateTime ("2022-01-18T05:05:08.801Z") as milliseconds (1642482308801)
      },
    }),
    ProductsModule,
    OwnerModule
  ],
})
export class AppModule {}