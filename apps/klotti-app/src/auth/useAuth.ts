import {
  CreateUserInput,
  useCreateUserMutation
} from '../__graphql__/generated';
import { useAuthStore } from './authStore';
import { useApolloClient } from '@apollo/client';
import { auth } from '@/firebase/auth';
import { useCommonType } from '../store/commonType/useCommonType';

export const useAuth = () => {
  const client = useApolloClient();
  const { commonType } = useCommonType();

  const { clearStore } = useAuthStore();
  const [createUserMutation] = useCreateUserMutation();

  const signOut = async () => {
    return Promise.allSettled([
      await client.cache.reset(),
      await auth.signOut(),
      await clearStore()
    ]);
  };

  const register = async (props: CreateUserInput) => {
    if (!props.email || !props.password) {
      return;
    }

    return Promise.allSettled([
      await createUserMutation({
        variables: {
          input: {
            email: props.email,
            firstName: props.firstName,
            lastName: props.lastName,
            password: props.password,
            gender: commonType === 'MENS' ? 'MALE' : 'FEMALE'
          }
        }
      }),
      await auth.signInWithEmailAndPassword(props.email, props.password)
    ]);
  };

  const forgotPassword = async (email: string) => {
    return auth.sendPasswordResetEmail(email);
  };

  return {
    register,
    signOut,
    forgotPassword
  };
};
