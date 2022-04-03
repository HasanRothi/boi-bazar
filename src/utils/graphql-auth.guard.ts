import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class GraphqlJwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const token =
      (req.cookies &&
        req.cookies.length > 0 &&
        req.cookies['token'].split(' ')[1]) ||
      req.headers['token'].split(' ')[1];
    if (token) {
      const verify = await this.authService.verify(token);
      if (verify) {
        return true;
      }
    }
    return false;
  }
}
//import { ExecutionContext, Injectable } from '@nestjs/common';
//import { GqlExecutionContext } from '@nestjs/graphql';
//import { AuthGuard } from '@nestjs/passport';

//@Injectable()
//export class JwtAuthGuard extends AuthGuard('jwt') {
//  getRequest(context: ExecutionContext) {
//    const ctx = GqlExecutionContext.create(context);
//    //console.log('gql simple context: ', context);
//    //console.log('gqlContext: ', ctx.getContext());
//    const { req } = ctx.getContext();
//    console.log(req.headers['token']);
//    return ctx.getContext().req;
//  }
//}
