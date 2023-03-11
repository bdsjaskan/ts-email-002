import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Caches, CachesDocument } from './cachedao';
import { Cache } from 'src/interfaces/cachecache.interface';
import { Data } from 'ejs';
import e from 'express';

@Injectable()
export class CacheService implements Cache{
  constructor(@InjectModel('Caches') private readonly cacheModel: Model<CachesDocument>) {}

  

  async set(key: string, value: any, ttl?: number): Promise<void> {
    const expiresAt = ttl ? new Date(Date.now() + ttl*1000) : undefined;
    await this.cacheModel
      .updateOne({ key }, { value, expiresAt }, { upsert: true })
      .exec();
  } 
  




  async setI(key: string, value: any,expireAt:Data, expireAtx:boolean): Promise<void> {

    if(expireAtx){
      expireAt = null;
    }

    // const expireAtx =  new Date(Date.now() + itt);
  
    await this.cacheModel.create({
      key,
      value,
      expireAt,
      expireAtx,
    });
  } 

  async getI(key: string): Promise<any> {
    const cacheDocument = await this.cacheModel
      .findOne({ key })
      .exec();
    
    if (!cacheDocument) {
      return null;
    }
  
    if (cacheDocument.expireAtx && cacheDocument.expireAtx > new Date()) {
      return cacheDocument.value;
    }
  
    if (cacheDocument.expireAt && cacheDocument.expireAt > new Date()) {
      return cacheDocument.value;
    }
  
    // 数据已过期
    await this.cacheModel.deleteOne({ key });
    return null;
  }
  

  async get(key: string): Promise<any> {
    const cacheDocument = await this.cacheModel
      .findOne({ key, expiresAt: { $gt: new Date() } })
      .exec();
    return cacheDocument?.value;
  }

  async getII(key:string): Promise<Caches>{


    const cacheDocument = await this.cacheModel.findOne({key}).exec();
    return cacheDocument;
    
  }

  async delete(key: string): Promise<void> {
    await this.cacheModel.deleteOne({ key }).exec();
  }

  async clear(): Promise<void> {
    await this.cacheModel.deleteMany({}).exec();
  }




  

  



}
