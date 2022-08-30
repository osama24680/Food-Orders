import React from 'react'
import {getProviders,signIn} from "next-auth/react"
import HeroImage from "../../assets/HeroImage2.png"
import Image from 'next/image'



export async function getServerSideProps(){
    const providers=await getProviders()
    return{
        props:{
            providers,
        }
    }
}

const signin = ({providers}) => {
    console.log(providers)
    return (
        <div>
            <Image src={HeroImage} alt='' width={400} height={600} />
            <div className="">
                {Object.values(providers).map((provider,index)=>(
                    <div key={index}>
                        <p>This app </p>
                        <button onClick={()=>signIn(provider.id,{callbackUrl:"/ "})}>sign in with {provider.name}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default signin