import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {


  // constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}


  getHello(): string {
    return 'Hello World!';
  
  }
  

}
