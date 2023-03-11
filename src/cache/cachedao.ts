// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Data } from 'ejs';
import { Document } from 'mongoose';

export type CachesDocument = Caches & Document;

@Schema({ 
  collection: 'cache',
  timestamps:false, //为文档添加
})
export class Caches {
  /**
   * 我们通过在文档架构中使用@Prop({ type: Boolean, default: false })装饰器来定义了它的类型为Boolean，
   * 并设置了默认值为false。如果将文档的isPermanent属性设置为true，
   * 那么它将不会被过期自动删除。这个属性可以用来标记一些需要永久保存的文档。
   */
  
  @Prop()
  key: string;


  @Prop()
  value: number;


  @Prop({ type: Date,default:Date.now, expires: 0 }) // 设置TTL索引120s  
  expireAt: Date;

  @Prop({ type: Boolean, default:false}) // 
  expireAtx: Date;

}
export const CacheSchema = SchemaFactory.createForClass(Caches);

