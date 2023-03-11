// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'userandemail' })
export class User {
  
  

  @Prop()
  originalname: string;

  @Prop()
  buffer: Buffer;

  @Prop()
  name: string;//用户的名字

  @Prop()
  age: number;//用户的年龄

  @Prop()
  email: string;//用户的账号

  @Prop()
  text: string;//文案（后续可能会更改---决定模板的字段）

  // @Prop()
  // intoDb: boolean;

  @Prop()
  filename: string;//文件名字
  @Prop()
  mimetype: string;


  @Prop()
  size: number;//文件size

  @Prop()
  data: string;
  set(...args: [o:string, b: Buffer]): void {
    this.originalname = args[0];
    this.buffer = args[1]
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
