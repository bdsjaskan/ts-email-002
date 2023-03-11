import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model, Schema } from 'mongoose';
import { Cron } from '@nestjs/schedule';
import { EmailService } from 'src/modules/email/email.service';

@Injectable()
export class UserService {
  
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>,private readonly emailService: EmailService,) {}

  // @Cron('0 15 10 ? * MON')//定时查询，发送邮件 .每周一上午10点15分执行任务
  @Cron('59 * 1 * * *') //定时查询，发送邮件
  async handleCron() {
    this.logger.debug('该方法将在45秒标记处每分钟运行一次');

    const list: User[] = await this.selectemail(); //查询语句：将数据库email和那么返回
    const list1: User[] = await this.selectemailfile();

    // const emails = list.map((u) => u.email).join(',');
    // //展示数据库邮箱信息
    // console.log(emails);

    // console.log('定时任务查询了数据库');
    // console.log('准被发送邮件');

    // this.emailService.sendEmail(emails);

    let count = 0;
    for (count; count < list1.length; count++) {
      if(list1[count].buffer != null||list1[count].filename != null){
        this.emailService.emailtextFile1(list1[count]);
      }else{
        this.emailService.sendEmailUser(list1[count]);
      }
    }

  }
 
  /**
   * 
   * @param userDto 实体存入数据库
   * @returns 
   */
  async add(userDto) {
    return await this.userModel.create(userDto); //想调用添加方法
  }

  async select() {
    return await this.userModel.find().exec(); ///查询
  }
  async selectemail() {
    return await this.userModel.find({}, { email: 1, name: 1 }); ///查询 给定的文档 返回   
  }

  /**
   * 
   * @returns 定时查询
   */
  async selectemailfile() {
    return await this.userModel.find({}, {}); ///查询 给定的文档 返回   
  }
 
  /***
   *  实体和文件存入到数据库
   */
  async sqlemail(_userDto: User, file: Express.Multer.File) {
    // _userDto.set(file.originalname,file.buffer)
    const newFile = new this.userModel({
      name:_userDto.name,
      age:_userDto.age,
      email:_userDto.email,
      text:_userDto.text,
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      data: file.buffer,
    });
    console.log('newFile'+newFile)
    return newFile.save();
  }
}
