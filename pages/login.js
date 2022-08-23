import React from 'react'
import styles from '../styles/Home.module.css'
import Logo from '../public/SVG/comute_logo.svg'
import { FaGoogle } from 'react-icons/fa';
import { useSession, signIn, signOut } from "next-auth/react"

const Login = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: session } = useSession()
    if (session) {
      return (
        
        <div className={styles.container}>
            <main className={styles.main}><Logo width={100}/>
            <p>Signed in as {session.user.name} </p>
            <button className={styles.loginGoogle} onClick={() => signOut()}>Sign out</button>
            </main>
        </div>
      )
    }
    return (
      <div className={styles.container}>
            <main className={styles.main}><Logo width={100}/>
            <p>Not signed in </p>
            <button className={styles.loginGoogle} onClick={() => signIn()}><span> <FaGoogle/></span> Log In with Google</button>
            </main>
        </div>
    )
}

export default Login

