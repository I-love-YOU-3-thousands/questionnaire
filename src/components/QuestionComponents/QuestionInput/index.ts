/**
 * @description 问卷 输入框
 */
import Component from './Component'
import { QuestionInputDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'
export default {
  title: '输入框',
  type: 'questionInput',
  Component, //画布显示的组件
  PropComponent, //属性面板组件
  defaultProps: QuestionInputDefaultProps,
}
