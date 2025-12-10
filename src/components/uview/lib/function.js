import {
  array as testArray,
  empty as testEmpty,
  number as testNumber,
} from './test'

/**
 * @description 添加单位，如果有rpx，upx，%，px等单位结尾或者值为auto，直接返回，否则加上px单位结尾
 * @param {string|number} value 需要添加单位的值
 * @param {string} unit 添加的单位名 比如px
 */
export function addUnit(value = 'auto', unit = 'px') {
  if (unit == 'rpx' && testNumber(String(value))) {
    value = value * 2
  }
  value = String(value)
  // 用内置验证规则中的number判断是否为数值
  return testNumber(value) ? `${value}${unit}` : value
}

export function addStyle(customStyle, target = 'object') {
  // 字符串转字符串，对象转对象情形，直接返回
  if (testEmpty(customStyle) || typeof (customStyle) === 'object' && target === 'object' || target === 'string'
    && typeof (customStyle) === 'string') {
    return customStyle
  }
  // 字符串转对象
  if (target === 'object') {
    // 去除字符串样式中的两端空格(中间的空格不能去掉，比如padding: 20px 0如果去掉了就错了)，空格是无用的
    customStyle = trim(customStyle)
    // 根据";"将字符串转为数组形式
    const styleArray = customStyle.split(';')
    const style = {}
    // 历遍数组，拼接成对象
    for (let i = 0; i < styleArray.length; i++) {
      // 'font-size:20px;color:red;'，如此最后字符串有";"的话，会导致styleArray最后一个元素为空字符串，这里需要过滤
      if (styleArray[i]) {
        const item = styleArray[i].split(':')
        style[trim(item[0])] = trim(item[1])
      }
    }
    return style
  }
  // 这里为对象转字符串形式
  let string = ''
  if (typeof customStyle === 'object') {
    customStyle.forEach((val, i) => {
      // 驼峰转为中划线的形式，否则css内联样式，无法识别驼峰样式属性名
      const key = i.replace(/([A-Z])/g, '-$1').toLowerCase()
      string += `${key}:${val};`
    })
  }
  // 去除两端空格
  return trim(string)
}

/**
 * @description 去除空格
 * @param String str 需要去除空格的字符串
 * @param String pos both(左右)|left|right|all 默认both
 */
export function trim(str, pos = 'both') {
  str = String(str)
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, '')
  }
  if (pos == 'left') {
    return str.replace(/^\s*/, '')
  }
  if (pos == 'right') {
    return str.replace(/(\s*$)/g, '')
  }
  if (pos == 'all') {
    return str.replace(/\s+/g, '')
  }
  return str
}

/**
 * @description JS对象深度合并
 * @param {object} target 需要拷贝的对象
 * @param {object} source 拷贝的来源对象
 * @returns {object|boolean} 深度合并后的对象或者false（入参有不是对象）
 */
export function deepMerge(targetOrigin = {}, source = {}) {
  const target = deepClone(targetOrigin)
  if (typeof target !== 'object' || typeof source !== 'object')
    return false
  for (const prop in source) {
    if (!source.hasOwnProperty(prop))
      continue
    if (prop in target) {
      if (source[prop] == null) {
        target[prop] = source[prop]
      }
      else if (typeof target[prop] !== 'object') {
        target[prop] = source[prop]
      }
      else if (typeof source[prop] !== 'object') {
        target[prop] = source[prop]
      }
      else if (target[prop].concat && source[prop].concat) {
        target[prop] = target[prop].concat(source[prop])
      }
      else {
        target[prop] = deepMerge(target[prop], source[prop])
      }
    }
    else {
      target[prop] = source[prop]
    }
  }
  return target
}

/**
 * @description 深度克隆
 * @param {object} obj 需要深度克隆的对象
 * @returns {*} 克隆后的对象或者原值（不是对象）
 */
export function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, Number.NaN, false].includes(obj))
    return obj
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    // 原始类型直接返回
    return obj
  }
  const o = testArray(obj) ? [] : {}
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
  }
  return o
}

/**
 * @description 用于获取用户传递值的px值  如果用户传递了"xxpx"或者"xxrpx"，取出其数值部分，如果是"xxxrpx"还需要用过uni.rpx2px进行转换
 * @param {number|string} value 用户传递值的px值
 * @param {boolean} unit
 * @returns {number|string}
 */
export function getPx(value, unit = false) {
  if (testNumber(value)) {
    return unit ? `${value}px` : Number(value)
  }
  // 如果带有rpx，先取出其数值部分，再转为px值
  if (/(rpx|upx)$/.test(value)) {
    return unit ? `${uni.upx2px(Number.parseInt(value))}px` : Number(uni.upx2px(Number.parseInt(value)))
  }
  return unit ? `${Number.parseInt(value)}px` : Number.parseInt(value)
}

export function guid(len = 32, firstU = true, radix = null) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  radix = radix || chars.length

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  }
  else {
    let r
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift()
    return `u${uuid.join('')}`
  }
  return uuid.join('')
}

export function getDeviceInfo() {
  let ret = {}
  // #ifdef APP || H5 || MP-WEIXIN
  ret = uni.getDeviceInfo()
  // #endif
  // #ifndef APP || H5 || MP-WEIXIN
  ret = sys()
  // #endif
  return ret
}

/**
 * @description 运行期判断平台
 * @returns {string} 返回所在平台(小写)
 * @link 运行期判断平台 https://uniapp.dcloud.io/frame?id=判断平台
 */
export function os() {
  // #ifdef APP || H5 || MP-WEIXIN
  return uni.getDeviceInfo().platform.toLowerCase()
  // #endif
  // #ifndef APP || H5 || MP-WEIXIN
  return uni.getSystemInfoSync().platform.toLowerCase()
  // #endif
}

export function $uGetRect(selector, all) {
  return new Promise((resolve) => {
    // #ifndef APP-NVUE
    uni.createSelectorQuery()
      .in(this)[all ? 'selectAll' : 'select'](selector)
      .boundingClientRect((rect) => {
        if (all && Array.isArray(rect) && rect.length) {
          resolve(rect)
        }
        if (!all && rect) {
          resolve(rect)
        }
      })
      .exec()
    // #endif

    // #ifdef APP-NVUE
    sleep(30).then(() => {
      const selectorNvue = selector.substring(1) // 去掉开头的#或者.
      const selectorRef = this.$refs[selectorNvue]
      if (!selectorRef) {
        // console.log('不存在元素，请检查是否设置了ref属性' + selectorNvue + '。')
        resolve({
          with: 0,
          height: 0,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        })
      }
      dom.getComponentRect(selectorRef, (res) => {
        // console.log(res)
        resolve(res.size)
      })
    })
    // #endif
  })
}
