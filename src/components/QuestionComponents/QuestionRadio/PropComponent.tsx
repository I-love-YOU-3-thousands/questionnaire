import React, { FC, useEffect } from 'react'
import { Form, Checkbox, Input, Select, Button, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { QuestionRadioPropsType, OptionType } from './interface'
import { nanoid } from 'nanoid'

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, options = [], value, onChange, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options })
  }, [title, isVertical, value, options])
  function handleValuesChange() {
    if (onChange == null) return
    const newValues = form.getFieldsValue()
    if (newValues.options) {
      // 需要清除 text undefined 的选项
      newValues.options = newValues.options.filter((opt: OptionType) => !(opt.text == null))
    }
    const { options = [] } = newValues as QuestionRadioPropsType
    options.forEach(opt => {
      if (opt.value) return
      opt.value = nanoid(5) //补齐 opt value
    })

    //触发onChange函数
    onChange(newValues)
  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, isVertical, value, options }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有选项 */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key}>
                    {/* 当前选项输入框 */}
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue()
                            let num = 0
                            options.forEach((opt: OptionType) => {
                              if (opt.text === text) num++ //记录 text 相同的个数，预期只有一个
                            })
                            if (num === 1) return Promise.resolve()
                            return Promise.reject(new Error('选项文字不能重复'))
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项文字" />
                    </Form.Item>
                    {/* 当前选项删除按钮 */}
                    {index > 1 && (
                      <MinusCircleOutlined
                        style={{ marginBottom: '24px' }}
                        onClick={() => remove(name)}
                      />
                    )}
                  </Space>
                )
              })}

              {/* 添加选项 */}
              <Form.Item>
                <Button
                  block
                  type="link"
                  onClick={() => add({ text: '', value: '' })}
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options.map(({ text, value }) => ({ value, label: text || '' }))}
        ></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}
export default PropComponent
