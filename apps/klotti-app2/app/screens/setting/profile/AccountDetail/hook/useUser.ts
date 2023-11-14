import {
  useUpdateUserMutation,
  useUserQuery
} from '@app/__graphql__/generated';
import { AccountDetailViewType } from '..';
import { showAlert } from '@app/utils/alertUtil';
import { useAuthStore } from '@app/auth';
export const useUser = () => {
  const { userId } = useAuthStore();

  const { data, loading, error } = useUserQuery({});
  const [
    updateUserMutation,
    { loading: loadingUpdateUser, data: updateUserData }
  ] = useUpdateUserMutation();
  const onUpdateUser = (
    userDetail: AccountDetailViewType,
    callback: (status: boolean) => void
  ) => {
    if (!userId) {
      return;
    }
    updateUserMutation({
      variables: {
        input: {
          email: userDetail.email,
          phoneNumber: userDetail.phoneNumber,
          firstName: userDetail.firstName,
          lastName: userDetail.lastName,
          gender: userDetail.gender,
          dateOfBirth: userDetail.dateOfBirth
        }
      },
      refetchQueries: ['User'],
      awaitRefetchQueries: true,
      onError: err => {
        showAlert('Error', err?.message);
        callback(false);
      },
      onCompleted: () => {
        showAlert('Success', 'Updated');
        callback(true);
      }
    });
  };
  return {
    data,
    loading,
    error,
    loadingUpdateUser,
    updateUserData,
    onUpdateUser
  };
};
