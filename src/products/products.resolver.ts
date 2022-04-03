import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Owner } from '../owner/entities/owner.entity';
import { PubSub } from 'graphql-subscriptions';
import { GraphqlJwtAuthGuard } from '../utils/graphql-auth.guard';
import { UseGuards } from '@nestjs/common';
const pubSub = new PubSub();
@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  @UseGuards(GraphqlJwtAuthGuard)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    const data = await this.productsService.create(createProductInput);
    pubSub.publish('productAdded', { product: data });
    return data;
  }

  @Query(() => [Product], { name: 'products', complexity: 2 })
  findAll(@Args('limit', { type: () => Int, nullable: true }) limit: number) {
    return this.productsService.findAll(limit);
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }

  @ResolveField(() => Owner)
  owner(@Parent() product: Product) {
    return this.productsService.findOne(product.owner);
  }

  //subscriptions
  //1.Simple way
  @Subscription((returns) => Product)
  //2.filter way
  //@Subscription(returns => Product, {
  // filter data based on variables . For example return product for a specific owner .
  //  filter: (payload, variables) => {
  //    console.log(payload, variables)
  //    return payload.product.name === variables.name
  //  }
  //})
  product(@Args('name', { type: () => String, nullable: true }) name: string) {
    return pubSub.asyncIterator('productAdded');
  }
}
