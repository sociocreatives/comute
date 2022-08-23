import React from 'react'
import styles from "../../styles/AboutHero.module.css"
import Image from 'next/image'
import Car from '../../public/car.png'
import Google from '../../public/playgoogle.png'
import MapLayout from '../MapLayout/MapLayout';
import Logo from '../../public/SVG/comute_logo.svg'


const AboutHero = () => {
  return (
    <div className={styles.container}>
        <div className={styles.logoarea}><Image
        src={Logo}
        alt="car"
        width={100}
        height={150}
        className={styles.logo}/></div>
    <div className={styles.mainhead}><h1 className={styles.heading}>What a perfect time to devore/manger a suitable and commendable e-book.</h1></div>
                <div className={styles.mapping}>
                    <div className={styles.sideone}>
                        <div className={styles.sideText}>
                        <h2>Commit yourself to comute as a solo comuter or a jocomuter and enjoy your anxious free commuting while listining to your favorite country music or gospel song from your preferred artist and let your visitor finds </h2>
                        </div>
                        <div className={styles.sideMap}>
                        </div>
                    </div>
                </div>
         </div>
  )
}

export default AboutHero

//  <Image
// src={Car}
// alt="car"
// width={200}
// height={300}
// className={styles.logo}/>
// <h1>About</h1>