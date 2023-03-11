class Utils {
  /**
   * 生成指定长度的随机字符串
   * @param length 随机字符串的长度
   * @returns 生成的随机字符串
   */
  static generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * 将对象转换为查询字符串
   * @param params 对象参数
   * @returns 转换后的查询字符串
   */
  static objectToQueryString(params: Record<string, any>): string {
    const esc = encodeURIComponent;
    return Object.keys(params)
      .map((key) => esc(key) + '=' + esc(params[key]))
      .join('&');
  }

  /**
   * 从 URL 中解析出查询参数对象
   * @param url URL
   * @returns 查询参数对象
   */
  static parseQueryParamsFromUrl(url: string): Record<string, string> {
    const searchParams = new URLSearchParams(new URL(url).search);
    const queryParams: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });
    return queryParams;
  }

  /**
   *  
   * @param date 日期
   * @param format 格式字符串
   * @returns 格式化后的日期字符串
   */
  static formatDate(date: Date, format: string): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const padLeftZero = (num: number): string => {
      return num < 10 ? '0' + num : num.toString();
    };
    return format
      .replace('yyyy', year.toString())
      .replace('MM', padLeftZero(month))
      .replace('dd', padLeftZero(day))
      .replace('HH', padLeftZero(hours))
      .replace('mm', padLeftZero(minutes))
      .replace('ss', padLeftZero(seconds));
  }
}

// 示例用法
const randomString = Utils.generateRandomString(10);
console.log(randomString);

const queryParams = { foo: 'bar', baz: 'qux' };
const queryString = Utils.objectToQueryString(queryParams);
console.log(queryString);

const url = 'https://www.example.com/?foo=bar&baz=qux';
const parsedParams = Utils.parseQueryParamsFromUrl(url);
console.log(parsedParams);

const date = new Date();
const formattedDate = Utils.formatDate(date, 'yyyy-MM-dd HH:mm:ss');
console.log(formattedDate);
