import { styled } from "../styles"

const Button = styled('button',{
  backgroundColor: '$green-light',
  border: 0,
  borderRadius: 4,
  padding: '4px 8px',
  cursor: 'pointer',
  transition: "all 0.5s",

  '&:hover': {
    backgroundColor: '$green'
  }
})

export default function Home() {
  return (
    <Button>Hello World!!</Button>
  )
}
