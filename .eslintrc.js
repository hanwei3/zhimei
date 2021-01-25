module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    semi: [2, "always"], // 必须使用分号结尾
    indent: [0, 4], // 不校验缩进风格
    "object-curly-spacing": [0, "never"],
    "no-prototype-builtins": "off",
    "no-return-await": "off", // 可以返回await出的对象
    "require-await": 0, // 可以返回await出的对象
    "space-before-function-paren": [0, "never"], // 关闭函数括号前的空格校验
    "prefer-promise-reject-errors": "off",
    "no-unused-vars": 0, // 关闭不使用变量校验
    camelcase: 0, // 关闭驼峰校验

    "@typescript-eslint/no-explicit-any": "off", // 可以使用any
    "@typescript-eslint/no-unused-vars": "off", // 未使用变量不校验
    "@typescript-eslint/camelcase": "off", // 不校验变量是否是camelCase
    "@typescript-eslint/no-empty-function": "off", // 允许空函数
    "@typescript-eslint/ban-ts-ignore": "off", // 可以使用@ts-ignore
    "@typescript-eslint/no-var-requires": "off", // 可以使用require

    "standard/no-callback-literal": "off",

    //
    /* about vue */
    "vue/no-unused-vars": "off",
    // 'no-console': 'error',
    "vue/html-indent": [1, 4],
    // 禁止使用 var
    "no-var": "error",
    // 优先使用 interface 而不是 type
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"]
  }
};
