



import React from 'react'
import BaseButton from '../button/BaseButton';

import './NavbarComponent.css'; // Import the normal CSS
import { useAuthHelpers } from './HeaderHealper';
import { debounce } from '../../utils/debounc';

const Nabarbuttons = () => {

    const { handleLogin, handleRegister, handleLogout } = useAuthHelpers();

     // Create debounced versions of the handlers
     const debouncedHandleLogin = debounce(handleLogin, 300); // 300ms delay
     const debouncedHandleRegister = debounce(handleRegister, 300);
     const debouncedHandleLogout = debounce(handleLogout, 300);
 
  return (
    <div>
        <div className="button-container space-x-4"> {/* Added class for CSS targeting */}
                    <BaseButton
                        text='Login'
                        color='red'
                        textColor='white'
                        borderColor='border-white'
                        borderRadius='rounded-lg'
                        onClick={ debouncedHandleLogin}
                    />
                    <BaseButton
                        text='Register'
                        color='red'
                        textColor='white'
                        borderColor='border-white'
                        borderRadius='rounded-lg'
                        onClick={debouncedHandleRegister}
                    />
                    <BaseButton
                        text='Logout'
                        color='red'
                        textColor='white'
                        borderColor='border-white'
                        borderRadius='rounded-lg'
                        onClick={debouncedHandleLogout}
                    />
                </div>
    </div>
  )
}

export default Nabarbuttons
