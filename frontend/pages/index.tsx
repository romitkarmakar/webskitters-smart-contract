import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Maincomponent } from '@/components/Maincomponent'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Maincomponent/>
  )
}
