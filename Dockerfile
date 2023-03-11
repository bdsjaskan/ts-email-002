# FROM node:14

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .


# CMD ["npm", "run", "start"]

# 使用 Node.js v14 作为基础镜像
FROM node:14

# 在容器中创建工作目录
WORKDIR /app

# 将 NestJS 应用程序源代码复制到容器中
COPY . .

# 安装应用程序所需的依赖项
RUN npm install

# 暴露应用程序所监听的端口
EXPOSE 3000

# 在容器启动时运行应用程序
CMD [ "npm", "run", "start:prod" ]
