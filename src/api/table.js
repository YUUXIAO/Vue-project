import request from '@/libs/request'

export function getTableList(params) {
  // return request({
  //   url: '/table/list',
  //   method: 'get',
  //   params
  // })

  return new Promise((resolve, reject) => {
    let data = {
      list: [
        {
          id: 1,
          name: 'vicky',
          auditStatus: "IN_APPROVAL",
          createTime: 1564019197000,
          orderNumber: "CG2019072501",
          paymentAmount: 1059840,
          delete: 0,
          customer: 'AAA科技有限公司',
          customerCode: 'S5',
          address: '广东省深圳市南山区XXXX街道YYY栋ZZZ单元MM号'
        },
        {
          id: 2,
          name: 'vicky',
          auditStatus: "REGISTERED",
          createTime: 1563952941000,
          orderNumber: "CG2019072201",
          paymentAmount: 540000,
          delete: 1,
          customer: 'BBB科技有限公司',
          customerCode: 'C1',
          address: '广东省深圳市福田区XXXX'
        },
        {
          id: 3,
          name: 'jasmine',
          auditStatus: "IN_APPROVAL",
          createTime: 1563874681000,
          orderNumber: "CG2019072501",
          paymentAmount: 65050,
          delete: 0,
          customer: 'CCCC科技有限公司',
          customerCode: 'S5',
          address: '广东省深圳市罗湖区XXXX'
        },
        {
          id: 4,
          name: 'vicky',
          auditStatus: "IN_APPROVAL",
          createTime: 1563871844000,
          orderNumber: "CG2019072501",
          paymentAmount: 112758.64,
          delete: 1,
          customer: 'DDD科技有限公司',
          customerCode: 'A3',
          address: '广东省深圳市宝安区XXXX'
        }
      ],
      totalElement: 230
    }
    resolve(data)
  })
}
