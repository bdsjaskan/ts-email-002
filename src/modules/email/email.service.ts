import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/server/user/user.schema';
import * as fs from 'fs';
import { buffer } from 'stream/consumers';

@Injectable()
export class EmailService {

 
  constructor(private readonly mailerService: MailerService) {}

  /**
   * email.sercice.ts
   */
  public async example() {
    console.log('执行之前');
    // const code = Math.random().toString().slice(-6);
    try {
      await this.mailerService.sendMail({
        to: '805333495@qq.com', // list of receivers
        from: '1731822242@qq.com', // sender address
        subject: '主题是键盘敲烂，月薪过万！！！', // Subject line
        // text:'你好，欢迎访问',//
        // html:'<b>welcome</b>',
        template: 'email', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
        // context: {//上下文
        //     //要发送到模板引擎的数据。
        //     code: code,
        //     // username: 'john doe',
        // },
      });
    } catch (error) {
      console.log(error);
    }
    console.log('执行之后');
  }

  /**
   * 发送邮件验证码       邮件主体信息
   * @param email
   */
  async sendEmail(email: string) {
    try {
      console.log('进入');
      console.log('准备发送');
      await this.mailerService.sendMail({
        to: email, // list of receivers
        from: '1731822242@qq.com', // sender address
        subject: '主题是键盘敲烂，月薪过万！！！', // Subject line
        // text:'你好，欢迎访问',
        // html:'<b>welcome</b>'
        template: 'email',
      });
      return { code: 200, message: '发送成功' };
    } catch (error) {
      console.error('发送邮件出错:', error);
      return { error };
    }
  }

  /**
   * 发送邮件验证码附加用户信息
   *
   */
  async sendEmailUser(user: User) {
    try {
      console.log('进入');
      console.log('准备发送');
      await this.mailerService.sendMail({
        to: user.email, // list of receivers
        from: '1731822242@qq.com', // sender address
        subject: '主题是键盘敲烂，月薪过万！！！', // Subject line
        // text:'你好，欢迎访问',
        // html:'<b>welcome</b>'
      
        template: 'email',
        context: {
          name: user.name, //将姓名传入模板中
          text: user.text,
        },
      });
      return { code: 200, message: '发送成功' };
    } catch (error) {
      console.error('发送邮件出错:', error);
      return { error };
    }
  }

  async emailtextFile(body: User, file: Express.Multer.File) {
    const attachments = [
      {
        filename: 'image.jpg', // 附件文件名
        path: 'src/小萝莉.jpeg', // 附件路径，可以是相对路径或绝对路径
      },
      {
        filename: file.originalname, // 附件文件名
        content: file.buffer,
      },
    ];

    console.log(attachments);
    console.log(body.email);
    console.log(attachments[1]);

    try {
      console.log('进入');
      console.log('准备发送');
      await this.mailerService.sendMail({
        to: '805333495@qq.com', // list of receivers
        from: '1731822242@qq.com', // sender address
        subject: '主题是键盘敲烂，月薪过万！！！', // Subject line
        // text:'你好，欢迎访问',
        // html:'<b>welcome</b>'
        template: 'email',
        context: {
          name: body.name, //将姓名传入模板中
          text: body.text,
        },
        attachments,
      });
      return { code: 200, message: '发送成功' };
    } catch (error) {
      console.error('发送邮件出错:', error);
      return { error };
    }
    
  }

  async emailtextFile1(body: User) {
    const attachments = [
      {
        filename: body.filename, // 附件文件名
        content: body.buffer
      },
    ];

    console.log(attachments);
    console.log(body.email);
    console.log(attachments[1]);

    try {
      console.log('进入');
      console.log('准备发送');
      await this.mailerService.sendMail({
        to: '805333495@qq.com', // list of receivers
        from: '1731822242@qq.com', // sender address
        subject: '主题是键盘敲烂，月薪过万！！！', // Subject line
        // text:'你好，欢迎访问',
        // html:'<b>welcome</b>'
        template: 'email',
        context: {
          name: body.name, //将姓名传入模板中
          text: body.text,
        },
        attachments,
      });
      return { code: 200, message: '发送成功' };
    } catch (error) {
      console.error('发送邮件出错:', error);
      return { error };
    }
    
  }
}
