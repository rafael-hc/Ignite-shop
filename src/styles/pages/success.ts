import { styled } from '@stitches/react'

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: '656',

  h1: {
    fontSize: '$2xl',
    color: '$title',
  },
  p: {
    fontSize: '$xl',
    color: '$text',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    fontSize: '$lg',
    display: 'block',
    marginTop: '5rem',
    color: '$green',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green-light',
    },
  },
})

export const ImageContainer = styled('div', {
  width: 140,
  height: 140,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 999,
  padding: '0.25rem',
  marginTop: '4rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
  '&:nth-child(n+2)': {
    marginLeft: '-3.25rem',
  },
})

export const Images = styled('div', {
  display: 'flex',
})
