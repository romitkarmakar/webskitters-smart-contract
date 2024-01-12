import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Maincomponent } from '@/components/Maincomponent'
import BaseLayout from '@/components/ui/layout/BaseLayout'
import { useweb3 } from '@/components/providers/web3'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {provider,ethereum,isLoading} = useweb3();
  // console.log("PROVIDER",provider)
  console.log("ETHEREUM",ethereum)
  console.log("IS LOADING",isLoading)
  return (
    <BaseLayout>
      <Maincomponent />
    </BaseLayout>
  )
}
