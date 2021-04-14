import styled from '@emotion/styled';
import {Menu, MenuList, MenuButton, MenuItem} from "@reach/menu-button";
import Image from 'next/image';
import {signOut} from 'next-auth/client'

export default function UserMenu({user}) {
  return (
    <Menu>
      <StyledMenuButton aria-label="pop central account"><Image src={user.image} layout="fill" objectFit="cover" /></StyledMenuButton>
      <StyledMenuList>
        <StyledMenuItem onSelect={() => {}}>Profile</StyledMenuItem>
        <StyledMenuItem onSelect={() => {signOut({redirect: false})}}>Logout</StyledMenuItem>
      </StyledMenuList>
    </Menu>
  )
}

const StyledMenuButton = styled(MenuButton)({
  background:
    "none",
  width: "5rem",
  height: "5rem",
  borderRadius: "50%",
  position: "relative",
  border: "none",
  overflow: "hidden",
  cursor: "pointer",
  ':focus, &[aria-expanded="true"]': {
    outline: 'none',
    boxShadow: "0 0 0 4px var(--outline-color)"
  },
});

const StyledMenuList = styled(MenuList)({
  position: 'relative', // for zIndex to have effect
  zIndex: '3', // to hover over the movie banner
  background: "var(--primary-background)",
  border: "1px solid var(--border-color)"
});

const StyledMenuItem = styled(MenuItem)({
  padding: "1rem 4rem",
  fontSize: "1.8rem",
  cursor: "pointer",
  "&[data-reach-menu-item][data-selected]": {
    background: "var(--secondary-background)"
  }
});
