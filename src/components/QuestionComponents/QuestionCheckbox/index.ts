/**
 * @description 问卷 checkbox
 */

import Component from './Component'
import PropComponent from './PropComponent'
export * from './interface'
import { QuestionCheckboxDefaultProps } from './interface'

export default {
  title: '多选',
  type: 'questionCheckbox',
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
}
