import { Alert, ScrollView, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button } from '@app/components/buttons/Button';
import { useAuthStore, useAuthentication } from '../../auth';
import { SettingsStackParamList } from './stack';
import { SectionWithIcon } from '../../components/SectionWithIcon';
import { UserDetailBanner } from '../../components/UserDetailBanner';
import { useUserQuery } from '../../__graphql__/generated';
import { Loading } from '@app/components/Loading';
import { nativeApplicationVersion } from 'expo-application';

export type SettingsScreenNavigationProp = StackScreenProps<
  SettingsStackParamList,
  'SettingsScreen'
>;

export const SettingsRootScreen = (props: SettingsScreenNavigationProp) => {
  const { navigation } = props;

  const { userId } = useAuthStore();
  const { signOut } = useAuthentication();

  const { data, loading } = useUserQuery({
    skip: !userId
  });

  if (loading) {
    return <Loading fullScreen />;
  }

  if (!data || !data.user) {
    return (
      <View>
        <Text>No data found </Text>
        <Button label="Logout" onPress={signOut} />
      </View>
    );
  }

  return (
    <ScrollView>
      <UserDetailBanner
        firstName={data?.user?.firstName || 'Raden'}
        lastName={data?.user?.lastName || 'Hor'}
        emailAddress={data?.user?.email || 'raden@gmail.com'}
        onEditUser={() => navigation.navigate('AccountDetailScreen')}
      />
      <SectionWithIcon
        iconName="lock"
        onClick={() => navigation.navigate('AccountDetailScreen')}
        sectionName="Change Password"
      />
      <SectionWithIcon
        iconName="lock"
        onClick={() => navigation.navigate('ManageAddressRootScreen')}
        sectionName="Manage Address"
      />
      <SectionWithIcon
        iconName="tag"
        onClick={() => navigation.navigate('AccountDetailScreen')}
        sectionName="Manage Your Brand"
      />
      <SectionWithIcon
        iconName="bell"
        onClick={() => Alert.alert('TODO')}
        sectionName="Notifications"
      />
      <SectionWithIcon
        iconName="users"
        onClick={() => Alert.alert('TODO')}
        sectionName="Refer a friend"
      />
      <SectionWithIcon
        iconName="help-circle"
        onClick={() => Alert.alert('TODO')}
        sectionName="Help and Support"
      />
      <SectionWithIcon
        iconName="phone"
        onClick={() => Alert.alert('TODO')}
        sectionName="Contact Us"
      />
      <SectionWithIcon
        iconName="log-out"
        onClick={signOut}
        sectionName="Logout"
      />
      <Text>
        Version: {nativeApplicationVersion} -{' '}
        {process.env.OTA_VERSION || 'development'}
      </Text>
    </ScrollView>
  );
};
