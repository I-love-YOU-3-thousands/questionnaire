import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import styles from './MainLayout.module.scss'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import useLoadUserData from '../hooks/useLoadUserData.ts'
import useNavPages from '../hooks/useNavPages.ts'
const { Header, Footer, Content } = Layout
const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPages(waitingUserData)
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Layout className={styles.main}>
        <Content>
          {waitingUserData ? (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <Spin />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
        {/* Outlet 根据当前路由渲染对应的组件 */}
      </Layout>
      <Footer className={styles.footer}>问卷 &copy;2024 - present. Created by Safety</Footer>
    </Layout>
  )
}

export default MainLayout
