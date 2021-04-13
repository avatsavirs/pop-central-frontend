import {Card} from 'styled-components';
import {StyledLink, CardImage} from 'styled-components';
import Image from 'next/image';
import {CardBody} from 'styled-components';
import {CardLinks} from 'styled-components';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {DotsVerticalIcon} from '@heroicons/react/solid'
import styled from '@emotion/styled';
import {Menu, MenuButton, MenuItem, MenuList} from '@reach/menu-button';

export default function DisplayCard({title, image, text, link}) {
  const router = useRouter();
  function navigateToDetailsPage(event) {
    if (event.target !== event.currentTarget) return;
    router.push(link);
  }
  return (
    <Card css={{
      a: {
        color: 'var(--primary-text)',
        textDecoration: 'none',
      }
    }}
    >
      <CardImage><Link href={link} passHref><a tabIndex={-1}><Image src={image} layout="fill" objectFit="cover" /></a></Link> </CardImage>
      <CardBody
        css={{cursor: 'pointer'}}
        onClick={navigateToDetailsPage}>
        <CardTitle link={link} title={title} />
        <CardMenu />
        <CardText link={link} text={text} />
      </CardBody>
    </Card>
  )
}

function CardMenu() {
  return (
    <Menu>
      <StyledMenuButton>
        <DotsVerticalIcon css={{
          width: '3rem',
          height: '3rem',
        }} />
      </StyledMenuButton>
      <StyledMenuList>
        <StyledMenuItem onSelect={() => {}}>
          Add to List
        </StyledMenuItem>
        <StyledMenuItem onSelect={() => {}}>
          Like
        </StyledMenuItem>
      </StyledMenuList>
    </Menu>
  )
}

function CardTitle({title, link}) {
  return (
    <Link href={link} passHref>
      <a css={{paddingBottom: '1rem'}}>
        <h4>{title.length < 42 ? title : title.slice(0, 40) + '...'}</h4>
      </a>
    </Link>
  )
}

function CardText({link, text}) {
  return (
    <Link href={link} passHref>
      <a tabIndex={-1} css={{outline: 'none', flexGrow: '1'}}>
        <p>{text.length < 290 ? text : text.slice(0, 287) + "..."}</p>
      </a>
    </Link>
  )
}

const StyledMenuButton = styled(MenuButton)({
  color: 'var(--primary-text)',
  border: 'none',
  background: 'transparent',
  position: 'absolute',
  right: '0',
  cursor: 'pointer'
})

const StyledMenuList = styled(MenuList)({
  background: 'var(--primary-background)',
  border: '1px solid var(--border-color)'
})

const StyledMenuItem = styled(MenuItem)({
  padding: '1rem 4rem',
  fontSize: '1.8rem',
  cursor: 'pointer',
  "&[data-reach-menu-item][data-selected]": {
    background: "var(--secondary-background)"
  }
})
