import { Manrope } from 'next/font/google'

const manrope = Manrope({ preload: true, subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col justify-center p-24 ${manrope.className}`}
    >
    </main>
  )
}
