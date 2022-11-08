import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Header from '@components/Header'
import MoonCalculator from '@components/MoonCalculator'

const MoonScene = dynamic(() => import('@components/Three/MoonScene'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div className="bg-zinc-900">
      <Header />
      

        <div className=" flex flex-col justify-center items-center">
          <MoonScene />
          <MoonCalculator />
        </div>
      
    </div>
  )
}

export default Home