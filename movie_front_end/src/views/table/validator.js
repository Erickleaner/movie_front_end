import {isChineseStr, isDecimalStr, isNumericStr} from "@/utils/validate";

const preValue = (value) =>{
  if (value === undefined) return ''
  if (value === null) return ''
  return value.toString().trim()
}

export const validateTitleCN = (rule, value, callback) => {
  value = preValue(value)
  if (value.length === 0) {
    callback(new Error('The titleCN can not be empty'))
  }
  if (!isChineseStr(value)){
    callback(new Error('The titleCN can only be composed of Chinese characters'))
  }
  callback()
}

export const validateDirector = (rule, value, callback) => {
  value = preValue(value)
  if (value.length === 0) {
    callback(new Error('The director can not be empty'))
  }
  callback()
}

export const validateActor = (rule, value, callback) => {
  value = preValue(value)
  if (value.length === 0) {
    callback(new Error('The actor can not be empty'))
  }
  callback()
}

export const validateReleaseTime = (rule, value, callback) => {
  value = preValue(value)
  const date = new Date();
  let year = date.getFullYear();
  if (!isNumericStr(value)){
    callback(new Error('The releaseTime can not be value of year'))
  }
  value = parseInt(value)
  if (value<1900||value>year){
    callback(new Error('The releaseTime is out of range'))
  }
  callback()
}

export const validateRating = (rule, value, callback) => {
  value = preValue(value)
  if (!isDecimalStr(value)){
    callback(new Error('The rating is not a decimal point'))
  }
  value = parseFloat(value)
  if (value<0||value>10){
    callback(new Error('The rating is out of range'))
  }
  callback()
}

export const validateJudgeNum = (rule, value, callback) => {
  value = preValue(value)
  if (!isNumericStr(value)){
    callback(new Error('The judgeNum is not an integer'))
  }
  value = parseInt(value)
  if (value<=0){
    callback(new Error('The judgeNum is out of range'))
  }
  callback()
}

export const validateInq = (rule, value, callback) => {
  value = preValue(value)
  if (value.length === 0){
    callback(new Error('The inq can not be empty'))
  }
  callback()
}
