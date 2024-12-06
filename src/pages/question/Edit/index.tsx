import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData.ts'

const Edit: FC = () => {
  const { loading, data, error } = useLoadQuestionData()
  return (
    <div>
      <p>Edit page</p>
      {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  )
}

export default Edit
