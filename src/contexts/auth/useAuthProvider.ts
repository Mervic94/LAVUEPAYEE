
import { useAuthState } from './services/authState';
import { useLoginService } from './services/login';
import { useRegisterService } from './services/register';
import { useAccountManagementService } from './services/accountManagement';

export const useAuthProvider = () => {
  const { session, user, isLoading, setIsLoading } = useAuthState();
  
  const { 
    signIn, 
    signInWithPhone, 
    signInWithUsername, 
    signInWithMagicLink, 
    signInWithGoogle 
  } = useLoginService(setIsLoading);
  
  const { 
    signUp, 
    signUpWithPhone 
  } = useRegisterService(setIsLoading);
  
  const { 
    signOut, 
    resetPassword, 
    updatePassword, 
    updateEmail 
  } = useAccountManagementService(setIsLoading);

  return {
    session,
    user,
    isLoading,
    signIn,
    signInWithPhone,
    signInWithUsername,
    signInWithMagicLink,
    signInWithGoogle,
    signUp,
    signUpWithPhone,
    signOut,
    resetPassword,
    updatePassword,
    updateEmail,
  };
};
