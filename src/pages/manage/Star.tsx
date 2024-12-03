import React, { FC, useState } from 'react'
// import { useSearchParams } from 'react-router-dom'
import styles from './Common.module.scss'
import { Empty, Typography } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import { useTitle } from 'ahooks/' //第三方
const { Title } = Typography
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
    isStar: true,
    answerCount: 12,
    createdAt: '2022-03-22 13:23:23',
  },
]
const Star: FC = () => {
  useTitle('问卷-星标问卷')
  const [questionList] = useState(rawQuestionList)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map(item => {
            return <QuestionCard key={item._id} {...item} />
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Star
