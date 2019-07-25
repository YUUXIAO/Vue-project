import request from '@/utils/request'

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
          customer: '宇隆电子香港有限公司',
          customerCode: 'S5'
        },
        {
          id: 2,
          name: 'vicky',
          auditStatus: "REGISTERED",
          createTime: 1563952941000,
          orderNumber: "CG2019072201",
          paymentAmount: 540000,
          delete: 1,
          customer: '华憶科技股份有限公司',
          customerCode: 'C1'
        },
        {
          id: 3,
          name: 'jasmine',
          auditStatus: "IN_APPROVAL",
          createTime: 1563874681000,
          orderNumber: "CG2019072501",
          paymentAmount: 65050,
          delete: 0,
          customer: '金癸有限公司',
          customerCode: 'S5'
        },
        {
          id: 4,
          name: 'vicky',
          auditStatus: "IN_APPROVAL",
          createTime: 1563871844000,
          orderNumber: "CG2019072501",
          paymentAmount: 112758.64,
          delete: 1,
          customer: '隽朗实业有限公司',
          customerCode: 'A3'
        }
      ],
      totalElement: 230
    }
    resolve(data)
  })
}
