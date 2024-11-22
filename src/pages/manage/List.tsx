import React, { FC, useState } from 'react'
// import { useSearchParams } from 'react-router-dom'
import styles from './List.module.scss'
import QuestionCard from '../../components/QuestionCard'
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
    isStar: false,
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
    isStar: false,
    answerCount: 12,
    createdAt: '2022-03-01 13:23:23',
  },
]
const List: FC = () => {
  // const [searchParams] = useSearchParams()
  // console.log(searchParams.get('keyword'), 'keyword')
  const [questionList] = useState(rawQuestionList)
  // const [questionList, setQuestionList] = useState(rawQuestionList)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>（搜索）</div>
      </div>
      <div className={styles.content}>
        {questionList.map(item => {
          return <QuestionCard key={item._id} {...item} />
        })}
      </div>
      <div className={styles.footer}>list page footer</div>
    </>
  )
}

export default List
