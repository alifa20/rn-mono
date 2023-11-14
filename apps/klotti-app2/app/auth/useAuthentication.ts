import { useApolloClient } from '@apollo/client';
import { useAuthStore } from './authStore';
import {
  CreateUserInput,
  Gender,
  useCreateUserMutation,
  useSsoSignOnMutation
} from '@app/__graphql__/generated';
import auth from '@react-native-firebase/auth';

import {
  signInAsync,
  AppleAuthenticationScope
} from 'expo-apple-authentication';

import { LoginManager, Profile, AccessToken } from 'react-native-fbsdk-next';

import {
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin';

import Constants, { ExecutionEnvironment } from 'expo-constants';

const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

export const useAuthentication = () => {
  const client = useApolloClient();

  const { clearStore, setToken } = useAuthStore();
  const [createUserMutation] = useCreateUserMutation();
  const [ssoSignOnMutation] = useSsoSignOnMutation();

  const signOut = async () => {
    await client.cache.reset();
    await auth().signOut();
    clearStore();
  };

  const register = async ({
    email,
    password,
    firstName,
    lastName,
    gender
  }: CreateUserInput) => {
    if (!email || !password) {
      return;
    }

    await createUserMutation({
      variables: {
        input: {
          email,
          password,
          firstName,
          lastName,
          // Provider: email
          gender: gender as Gender
        }
      }
    });
    await auth().signInWithEmailAndPassword(email, password);
  };

  const signInWithFacebook = async () => {
    if (isExpoGo) {
      throw new Error('Facebook login is not supported in Expo Go.');
    }

    try {
      const result = await LoginManager.logInWithPermissions(
        ['public_profile', 'email'],
        'enabled'
      );

      if (result.isCancelled) {
        return;
      }

      const profile = await Profile.getCurrentProfile();

      if (
        profile?.userID &&
        profile?.email &&
        profile?.firstName &&
        profile?.lastName
      ) {
        await ssoSignOnMutation({
          variables: {
            input: {
              loginMethod: 'FACEBOOK',
              userId: profile.userID,
              socialId: profile.userID
              // loginMethod,
              // socialId: socialId
            }
          }
        });
      }

      const token = await AccessToken.getCurrentAccessToken();

      if (!token) {
        throw Error('Token is undefined.');
      }

      const credential = await auth.FacebookAuthProvider.credential(
        token.accessToken
      );

      await auth().signInWithCredential(credential);
    } catch (e: any) {
      await LoginManager.logOut();
      throw Error(e);
    }
  };

  const signInWithGoogle = async () => {
    await GoogleSignin.configure({
      webClientId: Constants.expoConfig?.extra?.WEB_CLIENT_ID
    });

    try {
      const result = await GoogleSignin.signIn();

      if (!result.idToken) {
        throw Error('Token is undefined');
      }

      setToken(result.idToken);

      if (
        result.user?.id &&
        result.user?.email &&
        result.user?.givenName &&
        result.user?.familyName
      ) {
        await ssoSignOnMutation({
          variables: {
            input: {
              loginMethod: 'GOOGLE',
              userId: result.user.id,
              socialId: result.user.id
              // loginMethod,
              // socialId: socialId
            }
          }
        });
      }

      const credential = await auth.GoogleAuthProvider.credential(
        result.idToken
      );
      await auth().signInWithCredential(credential);
    } catch (e: any) {
      if (e.code !== statusCodes.SIGN_IN_CANCELLED) {
        throw Error(e);
      }
      setToken(undefined);
    }
  };

  const signInWithApple = async () => {
    try {
      const result = await signInAsync({
        requestedScopes: [
          AppleAuthenticationScope.FULL_NAME,
          AppleAuthenticationScope.EMAIL
        ]
      });

      if (!result.identityToken) {
        throw new Error('Token is undefined');
      }

      if (
        result.fullName?.givenName &&
        result.fullName?.familyName &&
        result.user &&
        result.email
      ) {
        try {
          await ssoSignOnMutation({
            variables: {
              input: {
                loginMethod: 'APPLE',
                userId: result.user,
                socialId: result.user
                // loginMethod,
                // socialId: socialId
              }
            }
          });
        } catch (e) {
          console.log('e', e);
        }
      }

      const credential = auth.AppleAuthProvider.credential(
        result.identityToken
      );

      await auth().signInWithCredential(credential);
    } catch (e: any) {
      throw Error(e);
    }
  };

  const forgotPassword = async ({ email }: { email: string }) => {
    await auth().sendPasswordResetEmail(email);
  };

  return {
    register,
    forgotPassword,
    signOut,
    signInWithFacebook,
    signInWithApple,
    signInWithGoogle
  };
};
