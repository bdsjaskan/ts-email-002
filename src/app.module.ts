import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailMiddleware } from './middleware/email.middleware';
import { EmailModule } from './modules/email/email.module';
import { UserModule } from './server/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';
import databaseConfig from './config/database.config';
import configuration from './config/configuration';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule } from './cache/cache.module';
// import { CacheService } from './cache/cache.service';
// import { CacheModule } from './cache/cache.module';


dotenv.config();
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

//工具模块
const arrays1 = [
  // TypeOrmModule.forRoot({
  //   type: 'mysql',
  //   port: 3306,
  //   host: process.env.MYSQL_HOST,
  //   username: process.env.MYSQL_USERNAME,
  //   password: process.env.MYSQL_PASSWORD,
  //   database: process.env.MYSQL_DATABASE,
  //   entities: [User], //对象  实体
  //   synchronize: false,
  // }),
  MongooseModule.forRoot(process.env.MONGODB),// // 指定 MongoDBB 数据库连接地址'mongodb://127.0.0.1:27017/database'
  // MongooseModule.forRoot(process.env.MONGODBB),// // 指定 MongoDBB 数据库连接地址'mongodb://127.0.0.1:27017/cache-db'
 
  // CacheModule.register({
  //   ttl: 60, // 设置缓存过期时间为 60 秒
  //   max: 1000, // 设置最大缓存条目数为 1000 条
  //   store: mongooseStore, // 使用 mongoose 存储缓存数据
  //   mongoose: mongoose,
  //   url: process.env.MONGODB, // 指定 MongoDBB 数据库连接地址'mongodb://127.0.0.1:27017/cache-db'
  //   collection: 'cache', //指定用于存储缓存数据的集合名称
  //   // options:{
  //   //   model: 'Cache',
  //   //   scheam: CacheSchema
  //   // }
  // }),
  ScheduleModule.forRoot(),
  ConfigModule.forRoot({
    load: [databaseConfig,configuration],
  }),
  MailerModule.forRoot({
    transport: {
      host: process.env.EMAIL_HOST, //邮箱服务器地址
      port: process.env.EMAIL_PORT, //服务器端口 默认 465
      auth: {
        user: process.env.AUTH_USER, //你的邮箱地址
        pass: process.env.AUTH_PASS,
      },
    },
    preview: true, //是否开启预览，开启了这个属性，在调试模式下会自动打开一个网页，预览邮件
    defaults: {
      from: process.env.DEFAULTS_FROM, //发送人 你的邮箱地址
    },

    template: {
      dir: join(process.cwd(), process.env.TEMPLATE_DIR), //这里就是你的模板文件夹路径
      // dir: process.cwd() + 'template',//这里就是你的模板文件夹路径
      // dir: __dirname + '/template',
      adapter: new EjsAdapter(),
      options: {
        strict: true, //严格模式
      },
    },
  })
];
export default arrays1;
@Module({
  imports: [
    ...arrays1,
    UserModule,
    EmailModule,
    ConfigModule,
    MongooseModule,
    CacheModule,
  
        
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggingInterceptor,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,//全局拦截器
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,//全局缓存
    // },
],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer //在email模块
      .apply(EmailMiddleware)
      .forRoutes('/*');
  }
}



