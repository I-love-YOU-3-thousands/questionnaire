/**
 * @description 问卷 多行输入框
 */
import Component from './Component'
import { QuestionTextareaDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'
export default {
  title: '多行输入框',
  type: 'questionTextarea',
  Component, //画布显示的组件
  PropComponent, //属性面板组件
  defaultProps: QuestionTextareaDefaultProps,
}
