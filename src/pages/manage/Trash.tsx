import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks/' //第三方
import styles from './Common.module.scss'
import { Empty, Typography, Table, Tag, Button, Space, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
const { Title } = Typography
const { confirm } = Modal
const rawQuestionList = [
  {
    _id: 1,
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 12,
    createdAt: '2022-01-01 13:23:23',
  },
  {
    _id: 2,
    title: '问卷2',
    isPublished: true,
    isStar: true,
    answerCount: 12,
    createdAt: '2022-11-21 13:23:23',
  },
  {
    _id: 3,
    title: '问卷3',
    isPublished: false,
    isStar: false,
    answerCount: 12,
    createdAt: '2022-03-22 13:23:23',
  },
]

const Trash: FC = () => {
  useTitle('问卷-回收站')
  const [questionList] = useState(rawQuestionList)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]
  const TableElem = (
    <>
      <div style={{ marginBottom: '20px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        columns={tableColumns}
        dataSource={questionList}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            console.log(selectedRowKeys, 'selectedRowKeys')
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      />
    </>
  )
  function del() {
    confirm({
      title: '确认彻底删除吗？',
      content: '删除后不可恢复',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        message.success(`已删除${selectedIds}`)
      },
    })
  }
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Trash
