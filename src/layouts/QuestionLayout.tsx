import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import useLoadUserData from '../hooks/useLoadUserData.ts'
import useNavPages from '../hooks/useNavPages.ts'
const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPages(waitingUserData)
  return (
    <>
      <p>QuestionLayout</p>
      <div>
        {waitingUserData ? (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  )
}

export default QuestionLayout
