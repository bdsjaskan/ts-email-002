import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheSchema, Caches } from './cachedao';

@Module({
    
    imports:[
      MongooseModule.forFeature([
        {
          name: Caches.name,
          schema: CacheSchema,
        },
      ]),
    ],

    providers: [CacheService],
    exports:[CacheService]
})
export class CacheModule {}
