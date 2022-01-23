import { Resolver, Query, Mutation, Args, Int , ResolveField , Parent ,Subscription} from '@nestjs/graphql';
import { OwnerService } from './owner.service';
import { Owner } from './entities/owner.entity';
import { Product } from '../products/entities/product.entity'
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';

@Resolver(() => Owner)
export class OwnerResolver {
  constructor(private readonly ownerService: OwnerService) {}

  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    console.log(Owner)
    return this.ownerService.create(createOwnerInput);
  }

  @Query(() => [Owner], { name: 'owners' })
  findAll(@Args('limit', { nullable: true ,  defaultValue: 10 }) limit?: number) {
    //console.log(Owner)
    return this.ownerService.findAll(limit);
  }

  @Query(() => Owner, { name: 'owner' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.ownerService.findOne(id);
  }

  @Mutation(() => Owner)
  updateOwner(@Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput) {
    return this.ownerService.update(updateOwnerInput.id, updateOwnerInput);
  }

  @Mutation(() => Owner)
  removeOwner(@Args('id', { type: () => Int }) id: number) {
    return this.ownerService.remove(id);
  }
  
  @ResolveField(() => [Product])
  products(@Parent() owner: Owner) {
    return this.ownerService.findOne(owner.products)
  }
}
