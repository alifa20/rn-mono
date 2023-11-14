'use client';

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList
} from '@chakra-ui/react';

import {
  ChevronDownIcon,
  Bars3Icon,
  HomeIcon
} from '@heroicons/react/24/solid';

interface LinkItemProps {
  name: string;
  icon: any;
}

interface NavItemProps extends FlexProps {
  icon: any;
  name: string;
  children: React.ReactNode;
  selected: boolean;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: HomeIcon },
  { name: 'Trending', icon: HomeIcon },
  { name: 'Explore', icon: HomeIcon },
  { name: 'Favourites', icon: HomeIcon },
  { name: 'Settings', icon: HomeIcon }
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      backgroundColor='white'
      borderRight='1px'
      borderRightColor='gray.200'
      w={{ base: 'full', md: 60 }}
      position='fixed'
      height='full'
      {...rest}>
      <Flex direction={'column'} h='full'>
        <Box flex={1}>
          <Flex
            h='20'
            alignItems='center'
            mx='8'
            justifyContent='space-between'>
            <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
              KLOTTI
            </Text>
            <CloseButton
              display={{ base: 'flex', md: 'none' }}
              onClick={onClose}
            />
          </Flex>
          {LinkItems.map(link => {
            const isSelected =
              link.name === 'Home'
                ? window.location.pathname === '/dashboard'
                : link.name === 'Trending'
                ? window.location.pathname === '/dashboard/trending'
                : link.name === 'Explore'
                ? window.location.pathname === '/dashboard/explore'
                : link.name === 'Favourites'
                ? window.location.pathname === '/dashboard/favourites'
                : window.location.pathname === '/dashboard/settings';
            return (
              <NavItem
                key={link.name}
                icon={link.icon}
                name={link.name}
                selected={isSelected}>
                <Text color={isSelected ? 'white' : 'black'}>{link.name}</Text>
              </NavItem>
            );
          })}
        </Box>

        <Box marginBottom={'4'}>
          <Text textAlign={'center'}>Klotti Board v0.1</Text>
        </Box>
      </Flex>
    </Box>
  );
};

const NavItem = ({ icon, children, name, selected, ...rest }: NavItemProps) => {
  return (
    <Box
      as='a'
      href={
        name === 'Home'
          ? '/'
          : name === 'Trending'
          ? '/dashboard/trending'
          : name === 'Explore'
          ? '/dashboard/explore'
          : name === 'Favourites'
          ? '/dashboard/favourites'
          : '/dashboard/settings'
      }
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        {...(selected && {
          backgroundColor: 'black'
        })}
        {...rest}>
        {icon && <Icon mr='4' as={icon} color={selected ? 'white' : 'black'} />}
        {children}
      </Flex>
    </Box>
  );
};

const TopNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<Bars3Icon />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize='2xl'
        fontFamily='monospace'
        fontWeight='bold'>
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size='lg'
          variant='ghost'
          aria-label='open menu'
          icon={<HomeIcon />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition='all 0.3s'
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems='flex-start'
                  spacing='1px'
                  ml='2'>
                  <Text fontSize='sm'>Justina Clark</Text>
                  <Text fontSize='xs' color='gray.600'>
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <ChevronDownIcon />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'>
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <TopNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p='4'>
        {children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
