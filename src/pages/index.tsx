import type { NextPage } from 'next'
import Header from '@components/Header'
import Moon from '@components/Moon'



const Home: NextPage = () => {
  return (
    <div className="bg-zinc-900">
      <Header />
      
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <Moon />
      </div>
    </div>
  )
}

export default Home