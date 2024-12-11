import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { LOGIN_PATHNAME } from '../router/index'
// import { getUserInfoService } from '../services/user' //接口请求获取
// import { useRequest } from 'ahooks' //接口请求获取
import { removeToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../store/userReducer'

const UserInfo: FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()

  // const { data } = useRequest(getUserInfoService) //接口请求获取
  // const { username, nickname } = data || {} //接口请求获取
  const { username, nickname } = useGetUserInfo() // redux获取
  function logout() {
    removeToken()
    dispatch(logoutReducer())
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }
  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined></UserOutlined>
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )
  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>
  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
