// useLoadQuestionData
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { getQuestionService } from '../services/question'
import { resetComponents } from '../store/componentsReducer/index'
function useLoadQuestionData() {
  const { id = 0 } = useParams()
  const dispatch = useDispatch()
  const { data, loading, error, run } = useRequest(
    async (id: number) => {
      if (!id) throw new Error('没有问卷id')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
      debounceWait: 1000,
    }
  )

  useEffect(() => {
    if (!data) return
    const { componentList = [] } = data

    // 获取默认的selectedId
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id // 默认选中第一个
    }

    // 把componentList 存入 store
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))
  }, [data])

  useEffect(() => {
    run(Number(id))
  }, [id])
  return { loading, error }
}
export default useLoadQuestionData
