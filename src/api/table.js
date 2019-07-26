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
          customer: '宇隆电子香港有限公司',
          customerCode: 'S5',
          address: '香港新界葵涌工业街 24-28 号威信物流中心14楼A室 Room A,14/F, WILSON LOGISTICS CENTRE 24-28 KUNG YIP STREET KWAI CHUNG,New Territories,HongKong'
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
          customerCode: 'C1',
          address: '香港九龙湾常悦道9号企业广场二座1906室'
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
          customerCode: 'S5',
          address: 'Unit C,18/F., Block 1, Tai Ping Ind.Ctr.,57 Ting Kok Road, Tai Po,NT,Hong Kong'
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
          customerCode: 'A3',
          address: '香港湾仔湾仔道165-171号乐基中心1405室'
        }
      ],
      totalElement: 230
    }
    resolve(data)
  })
}
