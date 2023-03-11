import {
  Injectable,
  NestMiddleware,
  Param,
  Get,
  Query,
  Req,
  HttpException,
  HttpStatus,
  CacheManagerOptions,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class EmailMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  private secret = '123456'; //密钥 不能硬编码
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');

    const appkey = this.configService.get<string>('APPKEY');

    const dbHost = this.configService.get<string>('database.host', 'localhost');

    const zhengxifeng = this.configService.get<string>('ZXF');

    console.log(zhengxifeng + 'zhengxifeng');

    console.log(appkey + '从.env文件中获取的');
    console.log(dbHost + '从.env文件中获取的');
    const signature = req.headers['x-singsture']; //获取签名值
    const timestamp = req.headers['x-timestamp'] as string; //时间戳
    const nonce = req.headers['x-nonce']; //请求头获取随机数
    const params = req.query; //获取url后面？的信息  （查询参数）
    const params1 = req.body; //获取请求体信息  （post请求）

    console.log('时间戳');
    console.log(timestamp);
    console.log('当前时间');
    console.log(Date.now());
    console.log('随机数');
    console.log(nonce);
    console.log('post中的信息');
    console.log(params);
    console.log(params1);
    console.log('******************************');
    console.log(signature);
    console.log('******************************');

    const dateInt = parseInt(timestamp);
    console.log('前端时间戳信息' + dateInt);

    if (Date.now() - dateInt > 12000000) {
      //200分钟有效
      console.log('datade 信息' + Date.now());
      throw new HttpException('请求已过期', HttpStatus.UNAUTHORIZED);
    }

    //
    // const tt = //秒
    const paramList = Object.keys(params1)
      .sort()
      .map((key) => `${key}=${params1[key]}`);

    console.log('将请求携带的参数转换List');
    console.log(paramList);

    const paramString = paramList.join('&');

    console.log('拼接');
    console.log(paramString);

    const message = `${timestamp}${nonce}${paramString}`;

    console.log('将时间戳随机数请求信息转换成大的字符串');
    console.log(message);

    // 使用密钥对待签名的字符串进行HMAC-SHA256签名
    const hmac = crypto.createHmac('sha256', appkey);
    const signatureComputed = hmac.update(message).digest('hex');

    console.log('计算得到的签名');
    console.log(signatureComputed);

    // 验证签名是否正确
    if (signature === signatureComputed) {
      console.log('下一步');
      next(); // 签名验证通过，继续处理请求
    } else {
      console.log(0);
      res.status(401).send('Unauthorized'); // 签名验证失败，返回401错误
    }
  }
}
