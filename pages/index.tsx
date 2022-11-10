import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Authentication from '../components/Authentication'
import styles from '../styles/Home.module.scss'

import FullstackWhite from '../public/assets/icons/fullstack-white.svg';
import UxWhite from '../public/assets/icons/ux-white.svg';
import QaWhite from '../public/assets/icons/qa-white.svg';

import fcamara from '../public/assets/images/fcamara.svg';
import alura from '../public/assets/images/alura.svg';
import rocketseat from '../public/assets/images/rocketseat.svg';
import cubos from '../public/assets/images/cubos.svg';

export default function Home() {

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header>

          <section className={styles.presentation}>
            <h1>Evolua a sua carreira<br />na tecnologia</h1>
            <p>
              Explore conhecimentos que estão<br />
              transformando indústrias, negócios e vidas<br />
              através de <span>trilhas gratuitas</span> em<br />
              <span>Desenvolvimento, UX/UI Design e QA</span>!
            </p>
            <Link href='#'>Comece a aprender de graça</Link>
          </section>

          <section className={styles.authentication}>
            <div className="content">
              <Authentication />
            </div>
          </section>

          <section className={styles.sectionTwo}>
            <div className={styles.contents}>
              <p>A Orange Evolution é para você que:</p>
              <ul>
                <li>Procura conteúdo tech de qualidade e gratuito</li>
                <li>Está migrando de carreira para área tech</li>
                <li>Sente que com o apoio de uma comunidade vitaminada irá se desenvolver mais</li>
                <li>Quer se preparar de forma mais assertiva para processos seletivos</li>
                <li>É protagonista da sua história e formação</li>
              </ul>
            </div>
            <div className={styles.trails}>
              <p>QUE TRILHA POSSO FAZER?</p>
              <span>Clique para conhecer cada uma</span>
              <div className={styles.items}>
                <ul>
                  <li>
                    <Image src={FullstackWhite} alt="Trilha FullStack" />
                    <span>FullStack</span>
                  </li>
                  <li>
                    <Image src={UxWhite} alt="Trilha UX/UI" />
                    <span>UX/UI</span>
                  </li>
                  <li>
                    <Image src={QaWhite} alt="Trilha QA" />
                    <span>QA</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className={styles.supports}>
            <h1>QUEM APOIA</h1>
            <div className={styles.orgs}>
              <Image src={fcamara} alt='FCamara' />
              <Image src={alura} alt='Alura' />
              <Image src={rocketseat} alt='Rocketseat' />
              <Image src={cubos} alt='Cubos academy' />
            </div>
          </section>

        </header>
      </main>
    </div>
  )
}
