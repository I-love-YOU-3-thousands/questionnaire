import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from './utils'
export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentsStateType = {
  //   componentList: ComponentInfoType[]
  selectedId: string
  componentList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
}

const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置组件列表
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    // 修改selectedId
    // changeSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
    //   state.selectedId = action.payload
    // },
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
      // react state 不可变数据，返回新的state   immer 可以直接修改state
    }),

    // 添加新组件
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload
        insertNewComponent(draft, newComponent)
      }
    ),

    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload
        const curComp = draft.componentList.find(item => item.fe_id === fe_id)
        if (curComp) {
          // curComp.props = newProps
          curComp.props = {
            ...curComp.props,
            ...newProps,
          }
        }
      }
    ),

    // 删除选中的组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentList = [], selectedId: removeId } = draft
      // 重新计算 selectedId
      const newSelectedId = getNextSelectedId(removeId, componentList)
      draft.selectedId = newSelectedId
      const index = componentList.findIndex(item => item.fe_id === removeId)
      componentList.splice(index, 1)
    }),
    // 隐藏，显示组件
    changeComponentHidden: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { componentList = [] } = draft
        const { fe_id, isHidden } = action.payload
        // 重新计算selectedId
        let newSelectedId = ''
        if (isHidden) {
          // 要隐藏
          newSelectedId = getNextSelectedId(fe_id, componentList)
        } else {
          // 要显示
          newSelectedId = fe_id
        }

        draft.selectedId = newSelectedId
        const curComp = componentList.find(item => item.fe_id === fe_id)
        if (curComp) {
          curComp.isHidden = isHidden
        }
      }
    ),

    // 锁定，解锁组件
    toogleComponentLock: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { componentList = [] } = draft
        const { fe_id } = action.payload
        const curComp = componentList.find(item => item.fe_id === fe_id)
        if (curComp) {
          curComp.isLocked = !curComp.isLocked
        }
      }
    ),

    // 拷贝当前选中的组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentList = [], selectedId } = draft
      const selectedComponent = componentList.find(item => item.fe_id === selectedId)
      if (selectedComponent == null) return
      draft.copiedComponent = cloneDeep(selectedComponent)
    }),

    // 粘贴组件
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft
      if (copiedComponent == null) return
      copiedComponent.fe_id = nanoid()
      insertNewComponent(draft, copiedComponent)
    }),

    // 选择上一个
    selectPrevComponent: produce((draft: ComponentsStateType) => {
      const { componentList = [], selectedId } = draft
      const selectedIndex = componentList.findIndex(item => item.fe_id === selectedId)
      if (selectedIndex < 0) return
      if (selectedIndex <= 0) return //选择第一个
      draft.selectedId = componentList[selectedIndex - 1].fe_id
    }),

    // 选择下一个
    selectNextComponent: produce((draft: ComponentsStateType) => {
      const { componentList = [], selectedId } = draft
      const selectedIndex = componentList.findIndex(item => item.fe_id === selectedId)
      if (selectedIndex < 0) return
      if (selectedIndex + 1 === componentList.length) return // 已经选择了最后一个,无法再向下
      draft.selectedId = componentList[selectedIndex + 1].fe_id
    }),

    // 修改组件标题
    changeComponentTitle: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; title: string }>) => {
        const { title, fe_id } = action.payload
        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComp) curComp.title = title
      }
    ),

    // 拖拽移动位置
    moveComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        const { componentList: curComponentList } = draft
        const { oldIndex, newIndex } = action.payload
        draft.componentList = arrayMove(curComponentList, oldIndex, newIndex)
      }
    ),
  },
})
export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toogleComponentLock,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions
export default componentsSlice.reducer
