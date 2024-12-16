import { ComponentInfoType, ComponentsStateType } from './index'

/**
 *
 * @param fe_id 当前选中的组件id
 * @param componentList 组件列表
 * @returns
 */
export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  const visibleComponentList = componentList.filter(item => !item.isHidden)
  const index = visibleComponentList.findIndex(item => item.fe_id === fe_id)
  if (index < 0) return ''
  //   重新计算 selectedId
  let newSelectedId = ''
  const length = visibleComponentList.length
  if (length <= 1) {
    newSelectedId = ''
  } else {
    // 组件长度>1
    if (index + 1 === length) {
      // 当前选中组件为最后一个,删除的话则选中上一个
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }
  return newSelectedId
}

/**
 *
 * @param draft 组件列表
 * @param newComponent 新组件
 */

export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = draft
  const index = componentList.findIndex(item => item.fe_id === selectedId)
  if (index < 0) {
    // 未选中任何组件
    draft.componentList.push(newComponent)
  } else {
    // 选中了组件
    draft.componentList.splice(index + 1, 0, newComponent)
  }
  draft.selectedId = newComponent.fe_id
}
