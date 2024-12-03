import React, { FC, useState } from 'react'
// import { useSearchParams } from 'react-router-dom'
import styles from './Common.module.scss'
import { Typography } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import { useTitle } from 'ahooks/' //第三方
const rawQuestionList = [
  {
    _id: 1,
    title: '问卷1',
    isPublished: false,
    isStar: false,
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
    isStar: false,
    answerCount: 12,
    createdAt: '2022-03-22 13:23:23',
  },
  {
    _id: 4,
    title: '问卷4',
    isPublished: true,
    isStar: false,
    answerCount: 12,
    createdAt: '2022-02-11 13:23:23',
  },
  {
    _id: 5,
    title: '问卷5',
    isPublished: false,
    isStar: true,
    answerCount: 12,
    createdAt: '2022-03-01 13:23:23',
  },
]
const { Title } = Typography
const List: FC = () => {
  useTitle('问卷-我的问卷')
  // const [searchParams] = useSearchParams()
  // console.log(searchParams.get('keyword'), 'keyword')
  const [questionList] = useState(rawQuestionList)
  // const [questionList, setQuestionList] = useState(rawQuestionList)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {questionList.length > 0 &&
          questionList.map(item => {
            return <QuestionCard key={item._id} {...item} />
          })}
      </div>
      <div className={styles.footer}>loadMore... 上滑加载更多</div>
    </>
  )
}

export default List
