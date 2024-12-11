import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import useGetUserInfo from './useGetUserInfo'
import { getUserInfoService } from '../services/user'
import { loginReducer } from '../store/userReducer'

function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true)
  const dispatch = useDispatch()

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(res) {
      const { username, nickname } = res
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })
  const { username } = useGetUserInfo()
  useEffect(() => {
    if (username) {
      setWaitingUserData(false)
      return
    }
    run()
  }, [username])
  //   ajax加载完用户信息之后,放在redux中.不用返回信息,只返回一个状态
  return { waitingUserData }
}
export default useLoadUserData
