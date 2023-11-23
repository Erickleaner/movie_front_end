/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

//判断字符串是否全部由数字组成
export function isChineseStr(inputStr) {
  // 使用正则表达式匹配汉字
  const chineseRegex = /^[\u4e00-\u9fa5]+$/;
  return chineseRegex.test(inputStr);
}


//判断字符串全部由数字组成
export function isNumericStr(inputStr) {
  const numericRegex = /^[0-9]+$/;
  return numericRegex.test(inputStr);
}

//判断字符串是否符号小数格式
export function isDecimalStr(inputStr) {
  const decimalRegex = /^[-+]?\d*\.?\d+$/;
  return decimalRegex.test(inputStr);
}
