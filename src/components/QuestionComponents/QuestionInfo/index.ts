/**
 *
 * @description 问卷 --   info组件
 */
import Component from './Component'
import { QuestionInfoDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'
export default {
  title: '问卷信息',
  type: 'questionInfo',
  Component, //画布组件
  PropComponent, //属性面板组件
  defaultProps: QuestionInfoDefaultProps, //默认属性
}
