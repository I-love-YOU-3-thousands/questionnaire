import React, { FC, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons'
import { QRCodeCanvas } from 'qrcode.react'
import type { InputRef } from 'antd'
import { Button, Input, message, Space, Tooltip, Typography, Popover } from 'antd'
import styles from './StatHeader.module.scss'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
const { Title } = Typography
const StatHeader: FC = () => {
  const { title, isPublished } = useGetPageInfo()
  const { id } = useParams()
  const nav = useNavigate()
  const urlInputRef = useRef<InputRef>(null)
  function copy() {
    const elem = urlInputRef.current
    if (elem == null) return
    elem.select() //选中Input的文本内容
    document.execCommand('copy') //执行浏览器复制命令
    message.success('拷贝成功')
  }
  function genLinkAndQRCodeElem() {
    if (!isPublished) return null
    const url = `http://localhost:3000/question/${id}`
    // 定义二维码组件
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCodeCanvas value={url} size={150}></QRCodeCanvas>
      </div>
    )
    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef}></Input>
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy} shape="circle"></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{genLinkAndQRCodeElem()}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}
export default StatHeader
