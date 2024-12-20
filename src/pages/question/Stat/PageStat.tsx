import React, { FC, useState } from 'react'
import { Typography, Spin, Table } from 'antd'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getQuestionStatListService } from '../../../services/stat'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}
const { Title } = Typography
const PageStat: FC<PropsType> = (props: PropsType) => {
  const { id = '' } = useParams()
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])
  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, { page: 1, pageSize: 10 })
      return res
    },
    {
      onSuccess(res) {
        const { total, list = [] } = res
        setList(list)
        setTotal(total)
      },
    }
  )
  const { componentList } = useGetComponentInfo()

  const columns = componentList.map(c => {
    const { fe_id, title, props = {}, type } = c
    const colTitle = props!.title || title
    return {
      dataIndex: fe_id,
      //   title: colTitle,
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedComponentId(fe_id)
            setSelectedComponentType(type)
          }}
        >
          <span style={{ color: fe_id === selectedComponentId ? '#1890ff' : 'inherit' }}>
            {colTitle}
          </span>
        </div>
      ),
    }
  })
  const dataSource = list.map((item: any) => {
    return { ...item, key: item._id }
  })
  const TableElem = <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
  return (
    <div>
      <Title level={3}>答卷数量：{!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin></Spin>
        </div>
      )}
      {!loading && TableElem}
    </div>
  )
}
export default PageStat
