import {ButtonHTMLAttributes} from 'react';

import './index.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function CustomButton({isOutlined = false, ...props}: ButtonProps){
  return(
    <button 
      className={`button ${isOutlined ? 'outlined' : ''}`} 
      {...props}
    />
  )
}