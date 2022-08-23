import Head from 'next/head'
import Image from 'next/image'
import Logo from '../public/SVG/comute_logo.svg'
import { FaGoogle } from 'react-icons/fa';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import MapLayout from '../components/MapLayout/MapLayout';



export default function Home() {
  return (
    <div>
        <MapLayout/>
    </div>
  )
}
