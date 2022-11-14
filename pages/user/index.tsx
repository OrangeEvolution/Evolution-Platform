import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { findAll } from '../../services/trails';
import styles from '../../styles/User.module.scss';
import { Trail } from '../../Types/Trail';

import TrailImage from '../../public/assets/images/trails.svg';
import Link from 'next/link';
import Modal from '../../components/Modal';
import { addTrailToUser, findById } from '../../services/user';
import { notifyError, notifySuccess } from '../../util/notifyToast';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

type UserProps = {
    trails: Trail[]
}

export default function User({ trails }: UserProps) {
    const router = useRouter();
    const { data: session } = useSession();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [newTrails, setNewTrails] = useState<Trail[]>();

    async function openModalTrails() {
        const res = await findAll(session?.user.token);
        const addTrails: Trail[] = res._embedded.trailVOList;

        let temp: Trail[] = [];

        addTrails.forEach(addTrail => {
            let control = true;

            trails.forEach(trail => {
                if (trail.id === addTrail.id) {
                    control = false;
                }
            });

            if (control) {
                temp.push(addTrail);
            }
        });

        if (temp.length > 0) {
            setNewTrails(temp);
            setOpenModal(true);
        } else {
            notifySuccess('Você já está inscrito em todas as trilhas disponíveis');
        }
    }

    async function handleSelectTrail(trailId: number) {
        let res = await addTrailToUser(trailId, session?.user.token);

        console.log(res);


        if (res !== null) {
            notifySuccess('Trilha adicionada com sucesso!');
            setOpenModal(false);
            router.reload();
        } else {
            notifyError('Ocorreu um erro na selação da trilha!');
        }
    }

    return (
        <>
            <div className={styles.container}>
                <Head>
                    <title>Sua trilhas | Orange Evolution</title>
                </Head>

                <Modal
                    openModal={openModal}
                    closeModal={() => setOpenModal(false)}
                >
                    <div className={styles.newTrail}>
                        <h1>Se inscreva em uma nova trilha</h1>
                        <span>Clique em uma trilha para se inscrever.</span>
                        <div className={styles.items}>
                            {newTrails?.map((trail) => (
                                <button key={trail.id} onClick={(e) => { e.preventDefault(), handleSelectTrail(trail.id) }}>
                                    <span><strong>Trilha:</strong> {trail.name}</span>
                                    <span>{trail.description}</span>
                                    <span><strong>Montada por:</strong> {trail.mounted_by}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                </Modal>

                <Header />

                <div className={styles.welcome}>
                    <div className={styles.user}>
                        <p>Olá, {session?.user.name}!</p>
                        <span>Veja as trilhas que está cadastrado:</span>
                    </div>
                    <button onClick={(e) => { e.preventDefault(), openModalTrails() }}>Adicionar nova trilha</button>
                </div>

                <section>
                    <div className={styles.trails}>
                        {trails.map((trail) => (
                            <Link href={`/user/trail/${trail.id}`} key={trail.id}>
                                <Image src={TrailImage} alt={trail.name} />
                                <div className={styles.infos}>
                                    <p><strong>{trail.name}</strong></p>
                                    <span>{trail.description}</span>
                                    <span className={styles.mountedBy}><strong>Trilha montada por: </strong>{trail.mounted_by}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

            </div>
            <Footer />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    const user = await findById(session?.user.id, session?.user.token);
    const trails: Trail[] = user.trails;

    return {
        props: {
            trails
        }
    }
}