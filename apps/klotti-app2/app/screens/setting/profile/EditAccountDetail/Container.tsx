import { Alert } from 'react-native';
import { useAuthentication } from '../../../../auth';
import { ErrorHandlerView } from '../../../../components/ErrorHandler';
import { AccountDetailViewType } from '../AccountDetail';
import { EditAccountDetailView } from './View';
import { useUser } from '../AccountDetail/hook/useUser';
import { Gender } from '@app/__graphql__/generated';
import { Loading } from '@app/components/Loading';
import auth from '@react-native-firebase/auth';

type EditAccountDetailContainerProps = {
  goBack: () => void;
};

export const EditAccountDetailContainer = ({
  goBack
}: EditAccountDetailContainerProps) => {
  const { signOut } = useAuthentication();
  const { data, loading, error, onUpdateUser } = useUser();

  const handleSaveChanges = async (userDetail: AccountDetailViewType) => {
    if (!auth().currentUser) {
      return;
    }
    try {
      if (userDetail.email) {
        // await auth.currentUser?.updateEmail(userDetail.email);
      }
      await onUpdateUser(userDetail, status => {
        if (status) {
          goBack();
        }
      });
    } catch (e) {
      if (e instanceof Error) {
        Alert.alert('Something went wrong', e.message);
      }
    }
  };

  if (loading) {
    return <Loading fullScreen />;
  }
  if (error) {
    return <ErrorHandlerView errorMessage={error.message} signOut={signOut} />;
  }

  return (
    <EditAccountDetailView
      email={data?.user?.email || ''}
      dateOfBirth={data?.user?.dateOfBirth}
      firstName={data?.user?.firstName || ''}
      lastName={data?.user?.lastName || ''}
      gender={(data?.user?.gender as Gender) || Gender.Male}
      phoneNumber={data?.user?.phoneNumber || ''}
      loading={false}
      saveChanges={handleSaveChanges}
    />
  );
};
