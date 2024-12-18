import React, { ChangeEvent, FC, useState } from 'react'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import styles from './Layers.module.scss'
import { useDispatch } from 'react-redux'
import {
  changeSelectedId,
  changeComponentTitle,
  toogleComponentLock,
  changeComponentHidden,
  moveComponent,
} from '../../../store/componentsReducer'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'
import classNames from 'classnames'
import { Button, Input, message, Space } from 'antd'
const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()
  //   记录当前正在修改标题的组件
  const [changingTitleId, setChangingTitleId] = useState('')
  //   点击选中组件
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件')
      return
    }
    // 执行选中该组件后的逻辑
    if (fe_id !== selectedId) {
      dispatch(changeSelectedId(fe_id))
      setChangingTitleId('')
      return
    }
    // 点击修改标题
    setChangingTitleId(fe_id)
  }
  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    if (!selectedId) return
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
  }

  // 切换隐藏显示

  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }
  // 切换 锁定、解锁
  function changeLocked(fe_id: string) {
    dispatch(toogleComponentLock({ fe_id }))
  }

  // 为SortableContext 组件的items添加id属性
  const componentListWithId = componentList.map(item => {
    return {
      ...item,
      id: item.fe_id, // SortableContext 组件的items需要id属性
    }
  })
  // 拖拽排序结束回调
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      {componentList.map(item => {
        const { fe_id, title, isHidden, isLocked } = item
        // 拼接className
        const titleDefaultClassName = styles.title
        const selectedClassName = styles.selected
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: selectedId === fe_id,
        })
        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div className={styles.wrapper}>
              <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
                {fe_id === changingTitleId && (
                  <Input
                    value={title}
                    onChange={changeTitle}
                    onPressEnter={() => setChangingTitleId('')}
                    onBlur={() => setChangingTitleId('')}
                  />
                )}
                {fe_id !== changingTitleId && title}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    onClick={() => changeHidden(fe_id, !isHidden)}
                    size="small"
                    shape="circle"
                    className={!isHidden ? styles.btn : ''}
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? 'primary' : 'text'}
                  ></Button>
                  <Button
                    onClick={() => changeLocked(fe_id)}
                    size="small"
                    shape="circle"
                    className={!isLocked ? styles.btn : ''}
                    icon={<LockOutlined />}
                    type={isLocked ? 'primary' : 'text'}
                  ></Button>
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}
export default Layers
