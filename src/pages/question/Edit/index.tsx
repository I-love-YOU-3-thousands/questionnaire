import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useTitle } from 'ahooks'
import useGetPageInfo from '../../../hooks/useGetPageInfo.ts'
import { changeSelectedId } from '../../../store/componentsReducer'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData.ts'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas.tsx'
import EditHeader from './EditHeader.tsx'
import LeftPanel from './LeftPanel.tsx'
import RightPanel from './RightPanel.tsx'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const { title } = useGetPageInfo()
  const dispatch = useDispatch()
  useTitle(`问卷统计 - ${title}`)
  function clearSelectedId() {
    console.log('clearSelectedId')
    dispatch(changeSelectedId(''))
  }
  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: '#fff', height: '50px' }}>
        <EditHeader />
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
