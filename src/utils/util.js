import moment from 'moment' // 数字格式化
const util = {}
util.numberSeparator = (value = 0, type) => {
  if (value == null) {
    value = 0
  }
  if (type == undefined) {
    type = 'int'
  }
  value = Number(value)
  let length = 2
  if (value) {
    if (type == 'price') {
      length = 4
      value = Math.round(value * 10000) / 10000
    } else {
      length = 2
      value = Math.round(value * 100) / 100
    }
  }
  // 填充小数位数
  let s = value.toString()
  let rs = s.indexOf('.')
  if (type !== 'int') {
    if (rs < 0) {
      rs = s.length
      s += '.'
    }
    while (s.length <= rs + length) {
      s += '0'
    }
  }
  value = s
  // 三位逗号隔开分开
  const arr = value.toString().split('.')
  if (value && value % 1 === 0 && type === 'int') {
    arr[1] = ''
  }
  return arr[0].replace(/\B(?=(\d{3})+$)/g, ',') + (arr[1] ? '.' + arr[1] : '')
}

// 格式化日期
util.formatDate = function (time, pattern = 'YYYY-MM-DD') {
  if (time) {
    return moment(time).format(pattern)
  } else {
    return ''
  }
}
// 小数点四舍五入
util.formatToFixed = function (number, count) {
  if (!count) {
    count = 4
  }
  const perm = Math.pow(10, count)
  if (number) {
    return Math.round(number * perm) / perm
  } else {
    return 0
  }
}

export default util
