// src/components/Navbar/Nabarbuttons.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BaseButton from '../button/BaseButton';
import { setUser, clearUser } from '../../redux/userSlice'; // Import actions
import { useAuthHelpers } from './HeaderHealper';
import { debounce } from '../../utils/debounc';

// Define the type for user data returned from handleLogin
interface UserData {
  name: string;
  email: string;
  token: string;
  id: string;
}

interface RootState {
  user: {
    name: string;
    email: string;
    token: string;
    id: string;
    userDetails: object;
    isAuthenticated: boolean;
  };
}

const Nabarbuttons: React.FC = () => {
  const { handleLogin, handleRegister, handleLogout, handleAdmin } = useAuthHelpers();
  const dispatch = useDispatch();

  // Get the current authentication state from Redux
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  // Create debounced versions of the handlers
  const debouncedHandleLogin = debounce(async () => {
    const userData: UserData = await handleLogin(); // Now handleLogin returns user data
    if (userData) {
      dispatch(setUser({
        userdata: userData,
        token: userData.token,
        userId: userData.id
      }));
    }
  }, 300); // 300ms delay

  const debouncedHandleRegister = debounce(handleRegister, 300);
  
  const debouncedHandleLogout = debounce(() => {
    dispatch(clearUser()); // Dispatch clearUser action to reset state
    handleLogout();
  }, 300);

  const debouncedHandleAdmin = debounce(handleAdmin, 300);

  return (
    <div>
      <div className="button-container space-x-4">
        {!isAuthenticated ? (
          <>
            <BaseButton
              text="Login"
              color="red"
              textColor="white"
              borderColor="border-white"
              borderRadius="rounded-lg"
              onClick={debouncedHandleLogin}
            />
            <BaseButton
              text="Register"
              color="red"
              textColor="white"
              borderColor="border-white"
              borderRadius="rounded-lg"
              onClick={debouncedHandleRegister}
            />
          </>
        ) : (
          <>
            <BaseButton
              text="Logout"
              color="red"
              textColor="white"
              borderColor="border-white"
              borderRadius="rounded-lg"
              onClick={debouncedHandleLogout}
            />
            {isAuthenticated && (
              <BaseButton
                text="Admin"
                color="red"
                textColor="white"
                borderColor="border-white"
                borderRadius="rounded-lg"
                onClick={debouncedHandleAdmin}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Nabarbuttons;
