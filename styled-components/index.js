import styled from '@emotion/styled'

export const Button = styled.button({
  display: 'block',
  backgroundColor: '#fff',
  border: 'none',
  transition: 'all 250ms ease-out',
  cursor: 'pointer',
  borderRadius: '5px',
  backgroundColor: 'var(--button-background)',
  color: 'var(--button-text-color)',
  ':hover': {
    boxShadow: '15px 28px 25px -18px rgba(0, 0, 0, 0.2)'
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
  color: 'var(--primary-link)',
  '::after': {
    content: "''",
    display: 'block',
    borderTop: `2px solid var(--success)`,
    transform: 'scaleX(0)',
    transition: 'transform 0.3s ease-out',
    transformOrigin: '0'
  },
  ':hover, :focus': {
    outline: 'none',
    '::after': {
      transform: 'scaleX(1)'
    }
  },
  // When StyledLink is used as button
  backgroundColor: 'transparent',
  border: 'none',
  fontFamily: 'Roboto, sans-serif',
  fontSize: '1.8rem'
});

export const Card = styled.div({
  width: '34.2rem',
  height: '85rem',
  transition: 'all 235ms ease 0s',
  borderColor: 'var(--border-color)',
  backfaceVisibility: 'hidden',
  borderStyle: 'solid',
  borderWidth: '1px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  willChange: 'transform',
  boxShadow: '2px 8px 8px -5px rgba(34, 34, 34, 0.3)',
  ':hover': {
    boxShadow: '15px 28px 25px -18px rgba(34, 34, 34, 0.2)',
  }
}, ({width, height}) => ({
  width, height
}))

export const CardImage = styled.div({
  flexBasis: '60%',
  position: 'relative'
}, ({portion}) => ({
  flexBasis: portion
}));

export const CardBody = styled.div({
  flexBasis: '40%',
  padding: '3rem',
  overflow: 'hidden',
})

export const CardTitle = styled.div({
  lineHeight: '2.5rem',
  height: '5rem',
  overflowY: 'hidden',
  position: 'relative',
  // ':after': {
  //   content: "''",
  //   position: 'absolute',
  //   textAlign: 'right',
  //   bottom: '0',
  //   right: '0',
  //   width: '30%',
  //   height: '2.5rem',
  //   background: 'var(--text-fade-color)',
  //   transition: 'background 235ms ease-out'
  // },
  'h1, h2, h3, h4, h5, h6': {
    height: '100%'
  }
});

export const CardText = styled.div({
  lineHeight: '2.2rem',
  height: '22rem',
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
  p: {
    height: '100%'
  },
});

export const CardLinks = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '0.5rem',
})

export const Overlay = styled.div({
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  height: '100%',
  width: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1
})
