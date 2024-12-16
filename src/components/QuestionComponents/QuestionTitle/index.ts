/**
 * @description 问卷 标题
 */
import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'
export default {
  title: '标题',
  type: 'questionTitle',
  Component, //画布组件
  PropComponent, //属性面板组件
  defaultProps: QuestionTitleDefaultProps,
}
