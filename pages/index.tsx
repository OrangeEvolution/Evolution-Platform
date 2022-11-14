import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from '../styles/Home.module.scss'
import Register from '../components/Authentication/Register'

import FullstackWhite from '../public/assets/icons/fullstack-white.svg';
import UxWhite from '../public/assets/icons/ux-white.svg';
import QaWhite from '../public/assets/icons/qa-white.svg';
import Menu from '../public/assets/icons/menu.svg';

import orangeEvolution from '../public/assets/images/orange-logo.svg';
import fcamara from '../public/assets/images/fcamara.svg';
import alura from '../public/assets/images/alura.svg';
import rocketseat from '../public/assets/images/rocketseat.svg';
import cubos from '../public/assets/images/cubos.svg';
import Login from '../components/Authentication/Login'
import { getSession, signOut, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import Footer from '../components/Footer'

import nookies from 'nookies'
import { useRouter } from 'next/router'
import { findById } from '../services/user'

export default function Home() {
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
  const [visibleButtonMobile, setVisibleButtonMobile] = useState<boolean>();

  const router = useRouter();

  const { data: session } = useSession();

  const handlerShowLoginForm = (status: boolean) => {
    setShowLoginForm(status);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <nav>
          <Image src={orangeEvolution} alt="Logo da Orange Juice Evolution" />
          <ul className={visibleButtonMobile ? styles.visible : ''}>
            <li>
              <Link href='#'>SAIBA MAIS</Link>
            </li>
            <li>
              {!session && <button className={styles.buttonRegister} onClick={(e) => { e.preventDefault(), setShowLoginForm(false), router.push('/#auth') }}>CADASTRE-SE</button>}
            </li>
            <li>
              {session
                ? <button className={styles.buttonLogin} onClick={() => signOut()}>DESLOGAR</button>
                : <button className={styles.buttonLogin} onClick={(e) => { e.preventDefault(), setShowLoginForm(true), router.push('/#auth') }}>LOGIN</button>
              }
            </li>
          </ul>
          <button className={styles.menuMobile} onClick={(e) => { e.preventDefault(), setVisibleButtonMobile(!visibleButtonMobile) }}>
            <Image src={Menu} alt='' />
          </button>
        </nav>

        <header>
          <section className={styles.presentation}>
            <Image src={orangeEvolution} alt='Logo da Orange Evolution' />
            <h1>Evolua a sua carreira<br />na tecnologia</h1>
            <p>
              Explore conhecimentos que estão<br />
              transformando indústrias, negócios e vidas<br />
              através de <span>trilhas gratuitas</span> em<br />
              <span>Desenvolvimento, UX/UI Design e QA</span>!
            </p>
            <Link href='#'>Comece a aprender de graça</Link>
          </section>

          <section className={styles.authentication} id="auth">
            <div className="content">
              {showLoginForm
                ? <Login showRegisterForm={handlerShowLoginForm} />
                : <Register setShowLoginForm={handlerShowLoginForm} />
              }

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

      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    try {
      let user = await findById(session.user.id, session.user.token);
      if (user.trails.length === 0 && !(session.user.role.includes('ADMIN') || session.user.role.includes('MANAGER'))) {
        return {
          redirect: {
            destination: '/trails/choose',
            permanent: false
          }
        }
      }
    } catch (error) {
      signOut();
    }

    if (session.user.role.includes('ADMIN') || session.user.role.includes('MANAGER')) {
      return {
        redirect: {
          destination: '/admin',
          permanent: false
        }
      }
    } else {
      return {
        redirect: {
          destination: '/user',
          permanent: false
        }
      }
    }
  }

  return {
    props: {}
  }
}