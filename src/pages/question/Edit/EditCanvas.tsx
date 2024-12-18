import React, { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import {
  ComponentInfoType,
  changeSelectedId,
  moveComponent,
} from '../../../store/componentsReducer'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'

// 静态展示
// import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'
// import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component'

type PropsType = {
  loading: boolean
}
function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null
  const { Component } = componentConf
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()
  function handleClick(event: MouseEvent, id: string) {
    console.log('click', id)
    event.stopPropagation()
    dispatch(changeSelectedId(id))
  }
  // 绑定快捷键
  useBindCanvasKeyPress()

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
  if (loading) {
    return (
      <div style={{ marginTop: '50px', textAlign: 'center' }}>
        <Spin />
      </div>
    )
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter(item => !item.isHidden)
          .map(item => {
            const { fe_id, isLocked } = item
            const wrapperDefaultClassName = styles['component-wrapper']
            const selectedClassName = styles.selected
            const lockedClassName = styles.locked
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id == selectedId,
              [lockedClassName]: isLocked,
            })
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
                  <div className={styles.component}>{genComponent(item)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
    //  {/* <div className={styles['component-wrapper']}>
    //     <div className={styles.component}>
    //       <QuestionTitle />
    //     </div>
    //   </div>
    //   <div className={styles['component-wrapper']}>
    //     <div className={styles.component}>
    //       <QuestionInput />
    //     </div>
    //   </div> */}
  )
}
export default EditCanvas
