



import React from 'react'
import BaseButton from '../button/BaseButton';

import './NavbarComponent.css'; // Import the normal CSS


import { handleLogin } from './HeaderHealper';
import { handleRegister } from './HeaderHealper';
import { handleLogout } from './HeaderHealper';


const Nabarbuttons = () => {
  return (
    <div>
        <div className="button-container space-x-4"> {/* Added class for CSS targeting */}
                    <BaseButton
                        text='Login'
                        color='red'
                        textColor='white'
                        borderColor='border-white'
                        borderRadius='rounded-lg'
                        onClick={handleLogin}
                    />
                    <BaseButton
                        text='Register'
                        color='blue'
                        textColor='white'
                        borderColor='border-white'
                        borderRadius='rounded-lg'
                        onClick={handleRegister}
                    />
                    <BaseButton
                        text='Logout'
                        color='green'
                        textColor='white'
                        borderColor='border-white'
                        borderRadius='rounded-lg'
                        onClick={handleLogout}
                    />
                </div>
    </div>
  )
}

export default Nabarbuttons
