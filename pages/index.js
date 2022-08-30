import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Hero from "../Components/Hero"
import Menu from "../Components/Menu"
import Services from "../Components/Services"
import { client } from '../lib/client'
import { useSession } from 'next-auth/react'
import { hasCookie } from 'cookies-next'
export const getServerSideProps = async () => {

  
  const query = '*[_type=="pizza"]';
  const pizass = await client.fetch(query)
  return {
    props: {
      pizass
    }
  }

}


export default function Home({pizass}) {
  const {data:session}=useSession()
  console.log(session)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero />
        <Services />
        <Menu pizass={pizass}/>
      </main>
    </div>
  )
}

