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
import { addTrailToUser } from "../../services/user";
import { notifyError, notifySuccess } from "../../util/notifyToast";
import { useRouter } from "next/router";

type ChooseProps = {
    trails: Trail[];
}

export default function Choose({ trails }: ChooseProps) {
    const router = useRouter();
    const { data: session } = useSession();
    const [openModalTrails, setOpenModalTrails] = useState<boolean>(false);
    const [openModalChooseTrail, setOpenModalChooseTrail] = useState<boolean>(false);

    const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);

    function handleOpenModalSelectedTrail(trail: Trail) {
        setSelectedTrail(trail);
        setOpenModalChooseTrail(true);
    }

    async function handleSelectTrail(trailId: number) {
        let res = await addTrailToUser(trailId, session?.user.token);

        console.log(res);


        if (res !== null) {
            notifySuccess('Trilha adicionada com sucesso!');
            setOpenModalChooseTrail(false);
            router.push('/');
        } else {
            notifyError('Ocorreu um erro na selação da trilha!');
        }
    }

    return (
        <>
            <main className={styles.container}>
                <Modal
                    openModal={openModalTrails}
                    closeModal={() => setOpenModalTrails(false)}
                >
                    <div className={styles.trailsInfos}>
                        <>
                            <h2>Saiba mais sobre as trilhas!</h2>
                            {trails.map((trail) => (
                                <ul key={trail.id}>
                                    <p><strong>Trilha: {trail.name}</strong></p>
                                    <li><strong>Descrição:</strong> {trail.description}</li>
                                    <li><strong>Trilha montada por:</strong> {trail.mounted_by}</li>
                                </ul>
                            ))}
                        </>
                    </div>
                </Modal>

                <Modal
                    openModal={openModalChooseTrail}
                    closeModal={() => setOpenModalChooseTrail(false)}
                >
                    <div className={styles.modalSelectedTrail}>
                        <h2>Deseja seleciona a trilha: <span>{selectedTrail?.name}</span></h2>
                        <h3>Informações da trilha:</h3>
                        <div className={styles.infosTrailSelected}>
                            <strong>Trilha:</strong> {selectedTrail?.name}
                            <strong>Descrição:</strong> {selectedTrail?.description}
                            <strong>Montada por: </strong> {selectedTrail?.mounted_by}

                            <button onClick={(e) => { e.preventDefault(), handleSelectTrail(selectedTrail?.id!) }}>Selecionar Trilha</button>
                        </div>
                    </div>
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
                            <button className={styles.card} key={trail.id} onClick={(e) => { e.preventDefault(), handleOpenModalSelectedTrail(trail) }}>
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

    return {
        props: {
            trails: res._embedded.trailVOList
        }
    }
}