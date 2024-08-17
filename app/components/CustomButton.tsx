import React from 'react'
import { Button } from 'antd';

interface IBtnProps {
  type: "link" | "text" | "default" | "primary" | "dashed" | undefined
  text: string | JSX.Element | JSX.Element[]
  onClick: ()=>void;
}

const CustomButton = ({type, text, onClick} : IBtnProps) => {
  return (
    <Button type={type} onClick={onClick}>{text}</Button>
  )
}

export default CustomButton
