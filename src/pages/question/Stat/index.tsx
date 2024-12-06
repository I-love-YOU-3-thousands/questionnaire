import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData.ts'

const Stat: FC = () => {
  const { loading, data, error } = useLoadQuestionData()
  return (
    <div>
      <p>Stat page</p>
      {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  )
}

export default Stat
