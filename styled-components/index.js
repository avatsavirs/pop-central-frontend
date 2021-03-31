import styled from '@emotion/styled'

export const Button = styled.button({
  display: 'block',
  backgroundColor: '#fff',
  border: 'none',
  transition: 'all 250ms ease-out',
  cursor: 'pointer',
  borderRadius: '5px',
  ':hover': {
    boxShadow: '0 15px 10px -10px rgba(31, 31, 31, 0.5)'
  }
},
  ({theme, size}) => ({
    fontSize: size === 'lg' ? '2.5rem' : '2rem',
    padding: size === 'lg' ? '1.75rem 3rem' : '1rem 1.75rem',
    color: theme.colors.white,
    backgroundColor: theme.colors.pink
  })
);

export const StyledLink = styled.a({
  fontSize: '2rem',
  textDecoration: 'none',
  cursor: 'pointer',
  display: 'inline-block',
  ':hover': {
    '::after': {
      transform: 'scaleX(1)'
    }
  }
}, ({theme}) => ({
  color: theme.colors.pink,
  '::after': {
    content: "''",
    display: 'block',
    borderTop: `2px solid ${theme.colors.green}`,
    transform: 'scaleX(0)',
    transition: 'transform 0.3s ease-out',
    transformOrigin: '0'
  },
}))
