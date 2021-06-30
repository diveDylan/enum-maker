<h1 style="text-align: center"> enum-maker </h1>

<p style="text-align: center">
<img src="https://img.shields.io/travis/diveDylan/enum-maker"/>
<img src="https://img.shields.io/codecov/c/github/diveDylan/enum-maker"/>
<p>
<br/>

<p style="text-align: center">
  单纯使用枚举和字典的场景不应该绑定太多依赖, 所以从 <a href="https://github.com/diveDylan/sandfish"><code>sandfish</code></a> 中抽出 <code>enum-maker</code>
</p>


### Install

```bash
npm install enum-maker
## or
yarn add enum-maker
## or 
pnpm install enum-maker

```

### Usage

我们认为用数字命名枚举是不合法且毫无可读性可言的行为，会使系统陷入迭代维护困境。插件会自动为你过滤用数字命名的枚举


```js
const { generateEnums } = require('enum-maker');

generateEnums({
  // 字典数据
  enums: yourEnumsData,
  outputPath: output,
  // 格式化字典格式
  formatterFn: (enumsItem) => {
    // do something
    return {
      label: someLabel,
      value: someValue,
    };
  },
  // 权限
  permissionKey: 'permissionKey'
});
```






