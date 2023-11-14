import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class CustomerResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
