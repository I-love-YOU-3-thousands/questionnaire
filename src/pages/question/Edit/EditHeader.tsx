import React, { FC, useState, ChangeEvent } from 'react'
import { Button, Typography, Space, Input, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import { LeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import EditToolbar from './EditToolbar'
import { changePageTitle } from '../../../store/pageInfoReducer'
import { updateQuestionService } from '../../../services/question'
import styles from './EditHeader.module.scss'
const { Title } = Typography

// 显示和修改标题
const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
  const [editState, setEditState] = useState(false)
  const dispatch = useDispatch()
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    dispatch(changePageTitle(newTitle))
  }
  if (editState) {
    return (
      <Input
        value={title}
        onChange={handleChange}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
      ></Input>
    )
  }
  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined />} type="text" onClick={() => setEditState(true)}></Button>
    </Space>
  )
}

// 保存按钮
const SaveButton: FC = () => {
  // pageInfo, componentList
  const { id } = useParams()
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(Number(id), { ...pageInfo, componentList })
    },
    { manual: true }
  )
  // 快捷键保存
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })

  // 发生变化时自动保存  防抖
  useDebounceEffect(
    () => {
      save()
    },
    [componentList, pageInfo],
    {
      wait: 1000,
    }
  )
  return (
    <Button icon={loading ? <LoadingOutlined /> : null} onClick={save} disabled={loading}>
      保存
    </Button>
  )
}

const PublishButton: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()

  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(Number(id), { ...pageInfo, componentList, isPublished: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        nav('/question/stat/' + id) // 跳转到统计页面
      },
    }
  )
  return (
    <Button type="primary" onClick={pub} disabled={loading}>
      发布
    </Button>
  )
}
// 编辑器头部
const EditHeader: FC = () => {
  const nav = useNavigate()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}
export default EditHeader
