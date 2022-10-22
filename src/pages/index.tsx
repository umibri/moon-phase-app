import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Header from '@components/Header'
import Moon from '@components/Moon'

const ThreeStars = dynamic(() => import('@components/ThreeStars'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div className="bg-zinc-900">
      <Header />
      
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <ThreeStars />
        <Moon />
      </div>
    </div>
  )
}

export default Home