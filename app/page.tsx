import Image from 'next/image'

import { Inter } from 'next/font/google'
import MainWindow from '@/components/MainWindow'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main
      className={`flex w-screen bg-orange-300 min-h-screen flex-col items-center ${inter.className}`}
    >
        <div className='fixed w-full bg-orange-500 h-16 flex justify-center text-white'>
            <div className='container flex w-full justify-between h-full items-center px-4'>
                <div><div><Image src='/logo.png' width={40} height={40} alt='logo'/></div></div>
                <div className='flex gap-8 font-bold'>
                    <a href="#">Home</a>
                    <a href="#">About</a>
                    <a href="#">Service</a>
                </div>
            </div>
        </div>
        <div className='w-screen h-screen grow flex items-center justify-center pt-16'>  
          <MainWindow/>
        </div>
    </main>
  )
}
