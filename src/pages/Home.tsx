import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '../router'
import styles from './Home.module.scss'
// import '../_mock/index.ts'
import axios from 'axios'
const { Title, Paragraph } = Typography
const Home: FC = () => {
  const nav = useNavigate()
  useEffect(() => {
    // fetch('/api/test')
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data, 'fetch data')
    //   })
    // mock.js只能劫持 XMLHttpRequest 不能劫持fetch
    // axios内部使用XMLHttpRequest  API
    axios('/api/test').then(res => console.log(res, 'axios res'))
  }, [])
  // function clickHandler() {
  //   // nav('/login?b=20')
  //   nav({
  //     pathname: '/login',
  //     search: 'b=21',
  //   })
  // }
  return (
    // <div>
    //   <p>Home</p>
    //   <div>
    //     <Button type="primary" onClick={clickHandler}>
    //       登录
    //     </Button>
    //     <Link to="/register?a=10">注册</Link>
    //   </div>
    // </div>
    <div className={styles.container}>
      <div className={styles.info}>
        <Title level={1}>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980份</Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
