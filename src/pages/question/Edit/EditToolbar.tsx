import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toogleComponentLock,
  copySelectedComponent,
  pasteCopiedComponent,
  moveComponent,
} from '../../../store/componentsReducer/index'
const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, componentList, selectedComponent, copiedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}
  const length = componentList.length
  const selectedIndex = componentList.findIndex(item => item.fe_id === selectedId)
  const isFirst = selectedIndex <= 0
  const isLast = selectedIndex + 1 >= length
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
  //   粘贴
  function paste() {
    dispatch(pasteCopiedComponent())
  }
  //   上移
  function moveUp() {
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
  }
  //   下移
  function moveDown() {
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
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
      <Tooltip title="上移">
        <Button shape="circle" onClick={moveUp} icon={<UpOutlined />} disabled={isFirst}></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          onClick={moveDown}
          icon={<DownOutlined />}
          disabled={isLast}
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
