import React, { FC } from 'react'
import { Typography, Radio, Space } from 'antd'
import { QuestionRadioDefaultProps, QuestionRadioPropsType } from './interface'
const { Paragraph } = Typography
const Component: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, options = [], value } = { ...QuestionRadioDefaultProps, ...props }
  //   function handleChange(event: RadioChangeEvent) {
  //     setValue(event.target.value)
  //   }
  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map(opt => {
            const { value, text } = opt
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default Component
