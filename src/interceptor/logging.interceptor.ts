import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from 'src/cache/cache.service';
// import { CacheService } from 'src/cache/cache.service';




@Injectable()
export class LoggingInterceptor implements NestInterceptor {



  constructor(private readonly cache:CacheService){}
  

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    console.log('Before...');
    const request = context.switchToHttp().getRequest();
    const timestamp = request.headers['x-timestamp'] as string; //时间戳
    //进行缓存功能
    const now = Date.now();


    let keycount :any = null;
    let key : any = null;
    

    // this.cache.set("h","s");
    // this.cache.set("key",timestamp);

    keycount =await this.cache.getII("keycount");
    key =await this.cache.getII("key");

    console.log("count找到了" + keycount);
    console.log("key" + key);
    if(keycount !=null){
      if(key != null){
        
        console.log('我找到缓存啦')
        console.log(Date.now())
        //成功
        // this.cache.set("zxf",22,1200000000000000000);
         return next
          .handle()
          .pipe(
            tap(() => console.log(`After... ${Date.now() - now}ms`)),
          );
      }else{
        //失败
        throw new HttpException("请求失效",HttpStatus.UNAUTHORIZED);
      }
    }else{
      // 存储
      console.log('我要存储缓存啦')
      this.cache.setI("keycount",1,new Date,true);
      this.cache.setI('key',timestamp,new Date,false);
       return next
          .handle()
          .pipe(
            tap(() => console.log(`After... ${Date.now() - now}ms`)),
          ); 
    }
   
  }
}
