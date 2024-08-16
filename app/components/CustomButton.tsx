import React from 'react'
import { Button } from 'antd';

interface IBtnProps {
  type: "link" | "text" | "default" | "primary" | "dashed" | undefined
  text: string
}

const CustomButton = ({type, text} : IBtnProps) => {
  return (
    <Button type={type}>{text}</Button>
  )
}

export default CustomButton
