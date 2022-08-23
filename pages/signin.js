import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Logo from '../public/SVG/comute_logo.svg'
import { FaGoogle } from 'react-icons/fa';

// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'


export default function Signin() {
  return (
    <div className={styles.container}>
      <div>
        <main className={styles.main}><Logo width={100}/>
        <p>Please Click to Login</p>
        <button className={styles.loginGoogle}><span> <FaGoogle/></span> Log In with Google</button>
        </main>
      </div>
    </div>
  )
}
