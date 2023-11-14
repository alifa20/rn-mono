import { Gender } from '@app/__graphql__/generated';
import { useAuthentication } from '../../../../auth';
import { AccountDetailView } from './View';
import { ErrorHandlerView } from '../../../../components/ErrorHandler';
import { useUser } from './hook/useUser';
import { Loading } from '@app/components/Loading';

export const AccountDetailContainer = () => {
  const { signOut } = useAuthentication();

  const { data, loading, error } = useUser();

  if (loading) {
    return <Loading fullScreen />;
  }
  if (error) {
    return <ErrorHandlerView errorMessage={error.message} signOut={signOut} />;
  }

  return (
    <AccountDetailView
      firstName={data?.user?.firstName || ''}
      lastName={data?.user?.lastName || ''}
      email={data?.user?.email || ''}
      gender={(data?.user?.gender as Gender) || Gender.Male}
      dateOfBirth={data?.user?.dateOfBirth}
      phoneNumber={data?.user?.phoneNumber || ''}
    />
  );
};
