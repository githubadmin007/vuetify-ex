# vuetify-ex

## 组件库地址：
http://172.16.2.109/VuetifyEx/lib/`版本号`/VuetifyEx.css  
http://172.16.2.109/VuetifyEx/lib/`版本号`/VuetifyEx.umd.js  
注：如果始终要获取最新版本的组件库，版本号填`latest`

## npm安装方式
npm i vuetify-ex

## 在项目中引用
import 'vuetify-ex/lib/VuetifyEx.css'  
import VuetifyEx from 'vuetify-ex'  
Vue.use(VuetifyEx)  

## 依赖
1.vuetify  
2.axios  

## 修改
### 项目地址
    https://172.16.2.30/svn/01公用代码/VueComponents/vuetify-ex
### 部署地址
    http://172.16.2.109/VuetifyEx
### 新增/修改组件及文档
组件源码路径：src/core/components  
指令源码路径：src/core/directives  
组件文档路径：src/docs/components
### 新增组件步骤
1. 在src/core/components目录下创建新组件文件夹，名称建议`以V开头、单词首字母大写`  
2. 在新组件文件夹下创建src文件夹及index.ts文件，内容参考其他已存在的组件  
3. 功能开发完毕后，将新组件`按组件名排序`添加到src/core/index.ts中，内容为：export * from './新组件名称'  
4. 至此组件功能开发完毕，接下来是编写文档  
5. 在src/docs/components目录下新建`组件名.md`文件  
6. 在md文件内编写组件说明文档，支持常用md语法，具体内容可参考其他组件文档  
7. 本工程中md文档有一个自定义模块，支持测试组件的同时提供示例代码，用法如下：  
```
    :::demo 说明文字
    ```html  
        <!-- 组件测试及示例代码，把这部分代码当成.vue文件来写即可 -->
    ```  
    :::  
```
8. 完成md文档编写后，在src/demo/nav.config.json中增加导航配置，除“安装说明”和“更新日志”外，其他组件按`按组件名排序`
9. 在src/docs/components/UpdateLog.md文件中填写更新日志
10. 修改package.json中的version字段，将版本号+1
11. 编译及更新  
 - 使用build命令编译示例程序，并更新到指定服务器
 - 使用build-lib命令编译组件库，并更新到指定服务及npm服务器
 - 更新组件库到我们的服务器时，需要更新两个地方。
   1. 在lib文件夹下新建一个名为当前版本号的文件夹，将编译后的组件放进去
   2. 将latest文件夹中的内容替换为新的组件库
