import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toogleComponentLock,
  copySelectedComponent,
  pasteCopiedComponent,
} from '../../../store/componentsReducer/index'
const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent, copiedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}
  //   删除
  function handleDelete() {
    dispatch(removeSelectedComponent())
  }
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }
  //   锁定
  function handleLock() {
    dispatch(toogleComponentLock({ fe_id: selectedId }))
  }
  //   复制
  function copy() {
    dispatch(copySelectedComponent())
  }
  function paste() {
    dispatch(pasteCopiedComponent())
  }
  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" onClick={handleDelete} icon={<DeleteOutlined />}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" onClick={handleHidden} icon={<EyeInvisibleOutlined />}></Button>
      </Tooltip>
      <Tooltip title={isLocked ? '解锁' : '锁定'}>
        <Button
          shape="circle"
          onClick={handleLock}
          icon={<LockOutlined />}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" onClick={copy} icon={<CopyOutlined />}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          onClick={paste}
          icon={<BlockOutlined />}
          disabled={copiedComponent == null}
        ></Button>
      </Tooltip>

      <Button shape="circle"></Button>
      <Button shape="circle"></Button>
      <Button shape="circle"></Button>
      <Button shape="circle"></Button>
    </Space>
  )
}
export default EditToolbar
