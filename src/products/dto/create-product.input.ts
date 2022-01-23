import { InputType, Int, Field ,ID } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  
  @Field(() => String)
  name: string;
  
  @Field(() => ID)
  owner : typeof ID
}
