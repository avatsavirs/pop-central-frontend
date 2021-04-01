import styled from '@emotion/styled'
import colors from 'styled-components/colors'

export const Button = styled.button({
  display: 'block',
  backgroundColor: '#fff',
  border: 'none',
  transition: 'all 250ms ease-out',
  cursor: 'pointer',
  borderRadius: '5px',
  backgroundColor: colors.pink,
  color: colors.white,
  ':hover': {
    boxShadow: '0 15px 10px -10px rgba(31, 31, 31, 0.5)'
  }
},
  ({size}) => ({
    fontSize: size === 'lg' ? '2.5rem' : '2rem',
    padding: size === 'lg' ? '1.75rem 3rem' : '1rem 1.75rem',
  })
);

export const StyledLink = styled.a({
  textDecoration: 'none',
  cursor: 'pointer',
  display: 'inline-block',
  color: colors.pink,
  '::after': {
    content: "''",
    display: 'block',
    borderTop: `2px solid ${colors.green}`,
    transform: 'scaleX(0)',
    transition: 'transform 0.3s ease-out',
    transformOrigin: '0'
  },
  ':hover, :focus': {
    '::after': {
      transform: 'scaleX(1)'
    }
  },
  // When StyledLink is used as button
  backgroundColor: 'transparent',
  border: 'none',
  fontFamily: 'serif',
});

export const Card = styled.div({
  width: '34.2rem',
  height: '85rem',
  transition: 'all 235ms ease 0s',
  borderColor: colors.darkGrey,
  backfaceVisibility: 'hidden',
  borderStyle: 'solid',
  borderWidth: '2px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  willChange: 'transform',
  boxShadow: '2px 8px 8px -5px rgba(0, 0, 0, 0.3)',
  ':hover': {
    boxShadow: '15px 28px 25px -18px rgba(0, 0, 0, 0.2)',
  }
})

export const CardImage = styled.div({
  flexBasis: '60%',
  position: 'relative'
});

export const CardBody = styled.div({
  flexBasis: '40%',
  padding: '3rem',
  overflow: 'hidden',
})

export const CardTitle = styled.div({
  height: '5rem',
  overflowY: 'hidden',
  position: 'relative',
  ':after': {
    content: "''",
    position: 'absolute',
    textAlign: 'right',
    bottom: '0',
    right: '0',
    width: '30%',
    height: '2.5rem',
    background: 'linear-gradient(to right, rgba(241, 250, 238, 0), rgba(241, 250, 238, 1) 50%)'
  },
  'h1, h2, h3, h4, h5, h6': {
    width: '100%'
  }
});

export const CardText = styled.div({
  height: '20.25rem',
  overflowY: 'hidden',
  position: 'relative',
  p: {
    height: '100%'
  },
  ':after': {
    content: "''",
    position: 'absolute',
    textAlign: 'right',
    bottom: '0',
    right: '0',
    width: '30%',
    height: '2.5rem',
    background: 'linear-gradient(to right, rgba(241, 250, 238, 0), rgba(241, 250, 238, 1) 50%)'
  }
});

export const CardLinks = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '0.5rem',
})
