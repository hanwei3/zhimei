/* 获取编译时候的配置 */
const chalk = require("chalk");
const envConf = require("./env.json");

if (!envConf) {
  throw new Error("未找到根目录下env.json,请检查");
}

function getConfig(type, mode = "release", schema = {}) {
  if (!type) {
    console.log(chalk.red("请传入type类型"));
    return;
  }
  const configUnit = envConf[type];
  if (!configUnit) {
    console.log(chalk.red(`找不到的${type}配置`));
    return;
  }
  if (mode === "dev" || mode === "development") {
    mode = "dev";
  } else if (mode === "re" || mode === "release" || mode === "production") {
    mode = "release";
  }
  // console.log(configUnit[mode], mode);
  if (!configUnit[mode]) {
    console.log(chalk.red(`找不到的${type}-${mode}配置`));
    return;
  }
  return configUnit[mode];
}

function getCommonConfig() {
  const configUnit = envConf.common;
  if (!configUnit) {
    console.log(chalk.red("找不到的common配置"));
    return;
  }
  return configUnit;
}

module.exports = {
  getConfig,
  getCommonConfig
};
