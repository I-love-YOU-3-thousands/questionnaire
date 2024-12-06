import React, { FC, useState } from 'react'
import { useTitle, useRequest } from 'ahooks/' //第三方
import styles from './Common.module.scss'
import { Empty, Typography, Table, Tag, Button, Space, Modal, message, Spin } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/ListPage'
import { updateQuestionService, deleteQuestionService } from '../../services/question'
const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  useTitle('问卷-回收站')
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data
  const [selectedIds, setSelectedIds] = useState<number[]>([])
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
  const {
    run: recover,
    // loading,
  } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500, //防抖
      onSuccess: () => {
        message.success('恢复成功')
        refresh() //手动刷新列表
        setSelectedIds([])
      },
    }
  )
  const TableElem = (
    <>
      <div style={{ marginBottom: '20px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        columns={tableColumns}
        dataSource={list}
        pagination={false}
        rowKey={(q: any) => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            console.log(selectedRowKeys, 'selectedRowKeys')
            setSelectedIds(selectedRowKeys as number[])
          },
        }}
      />
    </>
  )

  const { run: deleteQuestion } = useRequest(async () => await deleteQuestionService(selectedIds), {
    manual: true,
    onSuccess: () => {
      message.success('删除成功')
      refresh()
      setSelectedIds([])
    },
  })
  function del() {
    confirm({
      title: '确认彻底删除吗？',
      content: '删除后不可恢复',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        deleteQuestion()
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
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin></Spin>
          </div>
        )}
        {/* 问卷列表 */}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Trash
