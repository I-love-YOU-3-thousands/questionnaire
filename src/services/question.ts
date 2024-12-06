import axios, { ResDataType } from './ajax'
// import type ResDataType from './ajax'
type SearchOptions = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}
// 获取单个问卷信息
export async function getQuestionService(id: number): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.get(url)) as ResDataType
  return data
}

// 创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.post(url)) as ResDataType
  return data
}

// 获取所有问卷列表
export async function getQuestionListService(
  opt: Partial<SearchOptions> = {}
): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.get(url, { params: opt })) as ResDataType
  return data
}

// 更新单个问卷
export async function updateQuestionService(
  id: number,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.patch(url, opt)) as ResDataType
  return data
}

export async function duplicateQuestionService(id: number): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`
  const data = (await axios.post(url)) as ResDataType
  return data
}
export async function deleteQuestionService(ids: number[]): Promise<ResDataType> {
  const url = `/api/question`
  const data = (await axios.delete(url, { data: ids })) as ResDataType
  return data
}
