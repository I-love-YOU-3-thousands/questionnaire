/**
 *
 * @description 问卷 -- 段落
 */
import Component from './Component'
import { QuestionParagraphDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'
export default {
  title: '段落',
  type: 'questionParagraph',
  Component, //画布组件
  PropComponent, //属性面板组件
  defaultProps: QuestionParagraphDefaultProps,
}
