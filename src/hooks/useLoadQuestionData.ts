// useLoadQuestionData
// import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionService } from '../services/question'
function useLoadQuestionData() {
  const { id = '' } = useParams()
  const idNumber = Number(id)
  //   const [loading, setLoading] = useState(true)
  //   const [questionData, setQuestionData] = useState({})
  //   useEffect(() => {
  //     async function fn() {
  //       const data = await getQuestionService(id)
  //       setQuestionData(data)
  //       setLoading(false)
  //     }
  //     fn()
  //   }, [])
  //   return {
  //     loading,
  //     questionData,
  //   }

  async function load() {
    const data = await getQuestionService(idNumber)
    return data
  }
  const { loading, data, error } = useRequest(load)
  return { loading, data, error }
}
export default useLoadQuestionData