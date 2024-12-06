import React, { FC, useEffect, useState, useRef, useMemo } from 'react'
// import { useSearchParams } from 'react-router-dom'
import styles from './Common.module.scss'
import { Typography, Spin, Empty } from 'antd'
import { useSearchParams } from 'react-router-dom'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import { getQuestionListService } from '../../services/question'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { useTitle, useRequest, useDebounceFn } from 'ahooks/' //第三方
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant/index'
// const rawQuestionList = [
//   {
//     _id: 1,
//     title: '问卷1',
//     isPublished: false,
//     isStar: false,
//     answerCount: 12,
//     createdAt: '2022-01-01 13:23:23',
//   },
//   {
//     _id: 2,
//     title: '问卷2',
//     isPublished: true,
//     isStar: true,
//     answerCount: 12,
//     createdAt: '2022-11-21 13:23:23',
//   },
//   {
//     _id: 3,
//     title: '问卷3',
//     isPublished: false,
//     isStar: false,
//     answerCount: 12,
//     createdAt: '2022-03-22 13:23:23',
//   },
//   {
//     _id: 4,
//     title: '问卷4',
//     isPublished: true,
//     isStar: false,
//     answerCount: 12,
//     createdAt: '2022-02-11 13:23:23',
//   },
//   {
//     _id: 5,
//     title: '问卷5',
//     isPublished: false,
//     isStar: true,
//     answerCount: 12,
//     createdAt: '2022-03-01 13:23:23',
//   },
// ]
const { Title } = Typography
const List: FC = () => {
  useTitle('问卷-我的问卷')
  const [started, setStarted] = useState(false) //是否已经开始加载

  // const [list, setList] = useState([])
  // const [total, setTotal] = useState(0)
  // useEffect(() => {
  //   async function load() {
  //     const data = await getQuestionListService()
  //     const { list = [], total = 0 } = data
  //     setList(list)
  //     setTotal(total)
  //   }
  //   load()
  // }, [])

  // const { data = {}, error, loading } = useRequest(getQuestionListService)
  // const { list = [], total = 0 } = data

  // const { data = {}, loading } = useLoadQuestionListData()
  // const { list = [], total = 0 } = data

  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  // keyword变化时重置数据
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword: keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess(res) {
        const { list: l = [], total = 0 } = res
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  // 触发加载更多
  // function tryLoadMore() {
  //   console.log('tryLoadMore')
  // }
  // 触发加载,防抖
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem == null) return
      const domRect = elem.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        load()
        setStarted(true)
      }
    },
    { wait: 1000 }
  )
  // 当页面加载或keyworrd变化时触发加载
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多数据了</span>
    return <span>开始加载下一页</span>
  }, [started, loading, haveMoreData])
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
        {/* {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin></Spin>
          </div>
        )} */}
        {/* 问卷列表 */}
        {/* <div style={{ height: '2000px' }}></div> */}
        {list.length > 0 &&
          list.map((item: any) => {
            return <QuestionCard key={item._id} {...item} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  )
}

export default List
