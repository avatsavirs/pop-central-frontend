import styled from '@emotion/styled';
import {Menu, MenuList, MenuButton, MenuItem} from "@reach/menu-button";
import Image from 'next/image';
import useTheme from 'hooks/useTheme';

export default function UserMenu() {

  const [theme, switchTheme] = useTheme();

  return (
    <Menu>
      <StyledMenuButton aria-label="pop central account"><Image src="/img/profile.png" layout="fill" objectFit="cover" /></StyledMenuButton>
      <StyledMenuList>
        <StyledMenuItem onSelect={() => {}}>Profile</StyledMenuItem>
        <StyledMenuItem onSelect={() => {}}>Logout</StyledMenuItem>
        <StyledMenuItem onSelect={switchTheme}>Toggle Theme</StyledMenuItem>
      </StyledMenuList>
    </Menu>
  )
}

const StyledMenuButton = styled(MenuButton)({
  width: '5rem',
  height: '5rem',
  borderRadius: '50%',
  background: 'transparent',
  position: 'relative',
  border: 'none',
  overflow: 'hidden',
  cursor: 'pointer'
});

const StyledMenuList = styled(MenuList)({
  background: 'var(--primary-background)',
  border: '1px solid var(--border-color)',
});

const StyledMenuItem = styled(MenuItem)({
  padding: '1rem 4rem',
  fontSize: '1.8rem',
  cursor: 'pointer',
  ':hover, :focus': {
    backgroundColor: 'var(--secondary-background)',
  }
})
