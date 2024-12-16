export type QuestionInfoPropsType = {
  title?: string
  desc?: string
  onChange?: (newProps: QuestionInfoPropsType) => void
  disabled?: boolean
}

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: '大标题',
  desc: '描述文字',
}
