import moment from 'moment'
import { Message } from 'element-ui';
const util = {}

// 设置浏览器tab栏标题名称
util.title = title => {
  title = title ? title : '后台管理系统'
  window.document.title = title
}

// 格式化数字
util.numberSeparator = (value = 0, type) => {
  if (value == null) value = 0
  if (type == undefined) type = 'int'
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
  let s = value.toString(), rs = s.indexOf('.')
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
util.formatDate = (time, pattern = 'YYYY-MM-DD') => {
  if (time) {
    return moment(time).format(pattern)
  } else {
    return ''
  }
}

// 小数点四舍五入
util.formatToFixed = (number, count) => {
  if (!count) count = 4
  const perm = Math.pow(10, count)
  if (number) {
    return Math.round(number * perm) / perm
  } else {
    return 0
  }
}

// 对象拷贝 
util.cloneObj = obj => {
  let str,
    newobj = obj.constructor === Array ? [] : {}
  if (typeof obj !== 'object') {
    return
  } else if (window.JSON) {
    (str = JSON.stringify(obj)), (newobj = JSON.parse(str)) //序列化对象 //还原
  } else {
    for (let i in obj) {
      newobj[i] = typeof obj[i] === 'object' ? this.cloneObj(obj[i]) : obj[i]
    }
  }
  return newobj
}

// 判断空值
util.isEmpty = keys => {
  if (typeof keys === "string") {
    keys = keys.replace(/\"|&nbsp;|\\/g, '').replace(/(^\s*)|(\s*$)/g, "")
    if (keys == "" || keys == null || keys == "null" || keys === "undefined") {
      return true
    } else {
      return false
    }
  } else if (typeof keys === "undefined") {
    return true
  } else if (typeof keys === "number") {
    return false
  } else if (typeof keys === "boolean") {
    return false
  } else if (typeof keys == "object") {
    if (JSON.stringify(keys) == "{}") {
      return true
    } else if (keys == null) {
      // typeof null 返回 object
      return true
    } else if (keys instanceof Array && keys.length == 0) {
      // typeof Array 返回 object
      return true
    } else {
      return false
    }
  }

}

// 消息提示
util.showMsg = (message, type = "success") => {
  this.$message({
    showClose: true, Message: message, type: type
  })
}

// 弹框
util.showConfirm = (content, type = "success", title = '提示', confirmButtonText = "确定", cancelButtonText = "取消", confirmCallback, cancelCallback) => {
  this.$confirm(content, title, {
    confirmButtonText, cancelButtonText, type
  }).then(() => {
    // 点击确认
    confirmCallback && confirmCallback()
  }).catch(() => {
    // 点击取消
    cancelCallback && cancelCallback()
  });
}

// 通知
util.showNotice = (message, type = "success", title = "提示") => {
  this.$notify({
    title, message, type
  });
}


export default util
