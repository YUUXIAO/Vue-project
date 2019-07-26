import moment from 'moment'
import util from './utils'

// 格式化时间
export function formatDate(time, pattern = 'YYYY-MM-DD HH:mm:ss') {
  if (time) {
    return moment(time).format(pattern)
  } else {
    return ''
  }
}
// 格式化时间距离
export function formatDateAgo(time) {
  moment.locale('zh-cn')
  if (time) {
    return moment(time).fromNow()
  } else {
    return ''
  }
}
// 格式化数字
export function numberSeparator(value = 0, type) {
  if (!type) {
    type = 'int'
  }
  return util.numberSeparator(value, type)
}

// 下拉框显示格式化
export function formatSelectData(select, list) {
  let item = ''
  for (const i in list) {
    if (list[i].value == select) {
      item = list[i].label
      return item
    }
  }
  return item
}

// 手机号格式化(中间四位用星号显示)
export function formatPhone(phone) {
  phone = phone.toString()
  return phone.substr(0, 3) + '****' + phone.substr(7, 11)
}

export function convertCurrency(money) {
  // 汉字的数字
  const cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖')
  // 基本单位
  const cnIntRadice = new Array('', '拾', '佰', '仟')
  // 对应整数部分扩展单位
  const cnIntUnits = new Array('', '万', '亿', '兆')
  // 对应小数部分单位
  const cnDecUnits = new Array('角', '分', '毫', '厘')
  // 整数金额时后面跟的字符
  const cnInteger = '整'
  // 整型完以后的单位
  const cnIntLast = '元'
  // 最大处理的数字
  const maxNum = 999999999999999.9999
  // 金额整数部分
  let integerNum
  // 金额小数部分
  let decimalNum
  // 输出的中文金额字符串
  let chineseStr = ''
  // 分离金额后用的数组，预定义
  let parts
  if (money == '') {
    return ''
  }
  money = parseFloat(money)
  if (money >= maxNum) {
    // 超出最大处理数字
    return ''
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  // 转换为字符串
  money = money.toString()
  if (money.indexOf('.') == -1) {
    integerNum = money
    decimalNum = ''
  } else {
    parts = money.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0
    const IntLen = integerNum.length
    for (let i = 0; i < IntLen; i++) {
      const n = integerNum.substr(i, 1)
      const p = IntLen - i - 1
      const q = p / 4
      const m = p % 4
      if (n == '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0]
        }
        // 归零
        zeroCount = 0
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q]
      }
    }
    chineseStr += cnIntLast
  }
  // 小数部分
  if (decimalNum != '') {
    const decLen = decimalNum.length
    for (let i = 0; i < decLen; i++) {
      const n = decimalNum.substr(i, 1)
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum == '') {
    chineseStr += cnInteger
  }
  if (chineseStr.indexOf('壹拾') == 0) {
    chineseStr = chineseStr.substr(1)
  }
  return chineseStr
}
