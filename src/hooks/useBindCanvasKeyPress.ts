import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  removeSelectedComponent,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} from '../store/componentsReducer/index'
// 判断activeElement是否是body
function isActiveElementValid() {
  const activeElem = document.activeElement

  // 没有增加dnd-kit之前
  // if (activeElem === document.body) return true

  // 增加dnd-kit之后
  if (activeElem === document.body) return true
  if (activeElem?.matches('div[role="button"]')) return true
  return false
}
function useBindCanvasKeyPress() {
  const dispatch = useDispatch()
  // 删除
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })

  //   复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })
  //   复制
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })

  //   选择上一个
  useKeyPress('uparrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })
  //   选择下一个
  useKeyPress('downarrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })
}
export default useBindCanvasKeyPress
