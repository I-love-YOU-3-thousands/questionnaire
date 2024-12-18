import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer/index'
import PageInfoReducer, { PageInfoType } from './pageInfoReducer'
export type StateType = {
  user: UserStateType
  components: ComponentsStateType
  pageInfo: PageInfoType
}
export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,
    pageInfo: PageInfoReducer,
    // ...
  },
})
