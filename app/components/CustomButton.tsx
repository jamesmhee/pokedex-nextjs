import React from 'react'
import { Button } from 'antd';
import Loading from './Loading';

interface IBtnProps {
  type: "link" | "text" | "default" | "primary" | "dashed" | undefined
  className?: string
  text: string | JSX.Element | JSX.Element[]  
  onClick: ()=>void;
  onLoading: boolean
}

const CustomButton = ({type, className, text, onClick, onLoading} : IBtnProps) => {
  return (
    <Button loading={onLoading} className={className}  type={type} onClick={onClick}>{text}</Button>
  )
}

export default CustomButton
