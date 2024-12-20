import React, { FC, useState } from 'react'
import classNames from 'classnames'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { ComponentInfoType } from '../../../store/componentsReducer'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import styles from './ComponentList.module.scss'
type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

const ComponentList: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  const { componentList } = useGetComponentInfo()
  //   const [selectedComponentId, setSelectedComponentId] = useState('')
  return (
    <div className={styles.container}>
      {componentList
        .filter(item => !item.isHidden)
        .map((item: ComponentInfoType) => {
          const { fe_id, props, type } = item
          const componentConf = getComponentConfByType(type)
          if (componentConf == null) return null
          const { Component } = componentConf
          const wrapperDefaultClassName = styles['component-wrapper']
          const selectedClassName = styles.selected
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedComponentId, //是否选中
          })
          return (
            <div
              className={wrapperClassName}
              key={fe_id}
              onClick={() => {
                setSelectedComponentId(fe_id)
                setSelectedComponentType(type)
              }}
            >
              <div className={styles.component}>
                <Component {...props} />
              </div>
            </div>
          )
        })}
    </div>
  )
}
export default ComponentList
