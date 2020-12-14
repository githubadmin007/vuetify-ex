## 更新日志
### v0.4.7
时间：*2020-12-14*
- types/**/*.d.ts的路径问题（使用@types路径别名会出错）
----------
### v0.4.6
时间：*2020-12-14*
- 点击右上角的“×”关闭`VPopupWindow`组件时，不传值给afterClose事件处理函数
----------
### v0.4.5
时间：*2020-12-12*
- `VPopupWindow`组件新增`componentEvents`参数
----------
### v0.4.2 - v0.4.4
时间：*2020-12-11*
- 修改`VPopupWindow`组件的`Close()`方法
- 尝试解决.d.ts文件的问题
----------
### v0.4.1
时间：*2020-12-11*
- 修复了`$VMessage()`方法直接传入数字报错的问题
- `VPopupWindow`组件新增`afterClose`参数
- `VPopupWindow`组件增加滚动条
-----------
### v0.3.2 - v0.3.11
时间：*2020-12-02*
- 尝试解决.d.ts文件的问题
-----------
### v0.3.1
时间：*2020-12-02*
- 将`VMessageHelper`组件中的`MessageOptions`接口暴露出来
- 将package.json的main改为"./src/core/index.ts"
- 添加了"./types/index.d.ts"文件
-----------
### v0.3.0
时间：*2020-12-02*
- 添加`VDateTime`组件  
-----------
### v0.2.1
时间：*2020-10-26*
- 修复了`VContextMenu`组件在路由发生变化后作用域错误的BUG
-----------
### v0.2.0
时间：*2020-10-24*  
- 修复了`VMessage`组件onClose函数无限循环调用的BUG  
- 添加`VNestList`组件  
- 添加了`VContextMenu`组件
-----------
### v0.1.0   
时间：*2020-9-30*  
- 创建工程  
- 添加`VMessage`组件  
- 添加`VPopupWindow`组件  