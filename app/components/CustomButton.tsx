import React from 'react'
import { Button, ConfigProvider } from 'antd';

interface IBtnProps {
  type: "link" | "text" | "default" | "primary" | "dashed" | undefined
  className?: string
  text: string | JSX.Element | JSX.Element[]  
  onClick: ()=>void;
  onLoading: boolean
  icon?: JSX.Element | JSX.Element[]
  size: 'large' | 'middle' | 'small'
  property?: {    
    bg?: string
    color?: string
    border?: string
    hoverbg?: string
    hovercolor?: string
    hoverborder?: string
    fontSize?: number,
    paddingY?: number    
  }
}

const CustomButton = ({type, className, text, onClick, onLoading, icon, property} : IBtnProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: property?.bg,
            defaultColor: property?.color,
            defaultBorderColor: property?.border,
            defaultHoverBg: property?.hoverbg,
            defaultHoverColor: property?.hovercolor,
            defaultHoverBorderColor: property?.hoverborder,
            contentFontSize: property?.fontSize,
            paddingBlock: 20,            
          }
        }
      }}
    >
      <Button icon={icon} loading={onLoading} className={className}  type={type} onClick={onClick}>{text}</Button>
    </ConfigProvider>
  )
}

export default CustomButton
