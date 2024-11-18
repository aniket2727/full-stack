// src/components/Navbar/Nabarbuttons.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import BaseButton from '../button/BaseButton'; 
import { setUser, clearUser } from '../../redux/userSlice'; 
import { useAuthHelpers } from './HeaderHealper'; 
import { debounce } from '../../utils/debounc';
import { FaUserCircle } from 'react-icons/fa'; // Font Awesome User Circle icon

// Import Material-UI Account Circle Icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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

interface NabarbuttonsProps {
  isAuthenticated: boolean;
  dispatch: React.Dispatch<any>; // Type for dispatch
}

const Nabarbuttons: React.FC<NabarbuttonsProps> = ({ isAuthenticated, dispatch }) => {
  const { handleLogin, handleRegister, handleLogout, handleAdmin } = useAuthHelpers();
  //const dispatch = useDispatch();

  // Get the current authentication state from Redux
  const { isAuthenticated: reduxIsAuthenticated } = useSelector((state: RootState) => state.user);

  // Create debounced versions of the handlers
  const debouncedHandleLogin = debounce(async () => {
    const userData: UserData = await handleLogin(); 
    if (userData) {
      dispatch(setUser({
        userdata: userData,
        token: userData.token,
        userId: userData.id
      }));
    }
  }, 300); 

  const debouncedHandleRegister = debounce(handleRegister, 300);

  const debouncedHandleLogout = debounce(() => {
    dispatch(clearUser()); 
    handleLogout();
  }, 300);

  const debouncedHandleAdmin = debounce(handleAdmin, 300);

  return (
    <div>
      <div className="button-container space-x-4">
        {!reduxIsAuthenticated ? (
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
            {reduxIsAuthenticated && (
                <>
              <BaseButton
                text="Admin"
                color="red"
                textColor="white"
                borderColor="border-white"
                borderRadius="rounded-lg"
                onClick={debouncedHandleAdmin}
              />
              <div className="flex items-center space-x-2">
              <AccountCircleIcon style={{ fontSize: 30, color: 'white' }} />
              <span className="text-white">Profile</span>
            </div>
            </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Nabarbuttons;
