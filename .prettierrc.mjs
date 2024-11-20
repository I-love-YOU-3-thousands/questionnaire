export default {
  arrowParens: "avoid", // 箭头函数只有一个参的时候忽略括号
  bracketSpacing: true, // 括号内不要出现空格
  endOfLine: "lf", // 行结束使用Unix格式
  jsxBracketSameLine: false, // 格式化JSX元素时不将大括号放在同一行，换行放
  printWidth: 100, // 行宽
  proseWrap: "preserve", // 换行方式
  semi: false, // 分号
  singleQuote: true, // 使用单引号
  tabWidth: 2, // 缩进
  useTabs: false, // 使用tab缩进
  trailingComma: "es5", // 后置逗号，多行对象、数组最后一行加逗号
  parser: "typescript", // 用ts解析器去解析ts
};
