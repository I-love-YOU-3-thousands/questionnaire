import React, { FC, useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Input } from 'antd'
import { LIST_SEARCH_PARA_KEY } from '../constant'
const { Search } = Input

const ListSearch: FC = () => {
  const { pathname } = useLocation()
  const nav = useNavigate()
  const [searchParams] = useSearchParams()
  const [value, setValue] = useState('')
  useEffect(() => {
    console.log(searchParams.get(LIST_SEARCH_PARA_KEY), 'searchParams')
    const curVal = searchParams.get(LIST_SEARCH_PARA_KEY) || ''
    setValue(curVal)
  }, [searchParams])
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }
  function handleSearch(value: string) {
    // nav('/manage/list?keyword=xxx')

    nav({
      pathname,
      search: `${LIST_SEARCH_PARA_KEY}=${value}`,
    })
  }
  return (
    <Search
      size="large"
      placeholder="输入关键字"
      allowClear
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: '200px' }}
    />
  )
}
export default ListSearch
