import Head from "next/head";
import Image from "next/image";

import styles from '../../styles/Choose.module.scss';
import orangeEvolution from '../../public/assets/images/orange-logo.svg';
import { getSession, useSession } from "next-auth/react";
import Footer from "../../components/Footer";
import Link from "next/link";

import TrailImage from '../../public/assets/images/trails.svg';
import { GetServerSideProps } from "next";
import { findAll } from "../../services/trails";
import { Trail } from "../../Types/Trail";
import Modal from "../../components/Modal";
import { useState } from "react";

type ChooseProps = {
    trails: Trail[];
}

export default function Choose({ trails }: ChooseProps) {
    const { data: session } = useSession();
    const [openModalTrails, setOpenModalTrails] = useState<boolean>(false);

    return (
        <>
            <main className={styles.container}>
                <Modal
                    openModal={openModalTrails}
                    closeModal={() => setOpenModalTrails(false)}
                >
                    infos sobre as trilhas!
                </Modal>

                <Head>
                    <title>Escolha uma trilha | Orange Evolution</title>
                </Head>

                <header>
                    <Image src={orangeEvolution} alt="Logo Orange Evolution" />
                    <h2>
                        Bem vindo ao <br />
                        <span>Orange Juice <br />
                            Evolution!</span>
                    </h2>
                    <span className={styles.info}>{session?.user?.name}, escolha a sua trilha para iniciar sua própria evolução:</span>
                </header>

                <section>
                    <div className={styles.trails}>
                        {trails.map((trail) => (
                            <button className={styles.card} key={trail.id}>
                                <Image src={TrailImage} alt='' />
                                <div className={styles.content}>
                                    <span>Aprenda {trail.name}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                    <p>Ainda não tem certeza do que escolher? <Link href='javascript:;' onClick={() => { setOpenModalTrails(true) }}>Clique aqui</Link> para saber mais sobre cada uma das trilhas.</p>
                </section>

            </main>
            <Footer />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    const res = await findAll(session?.user.token);
    console.log(res._embedded.trailVOList)

    return {
        props: {
            trails: res._embedded.trailVOList
        }
    }
}