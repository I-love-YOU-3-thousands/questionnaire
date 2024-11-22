import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
const Edit: FC = () => {
  const { id = '' } = useParams()
  return (
    <div>
      <p>Edit</p>
      <div>{id}</div>
    </div>
  )
}

export default Edit
