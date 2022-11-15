import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { createTrails, findAll } from '../../services/trails';
import styles from '../../styles/Admin.module.scss';
import { Trail } from '../../Types/Trail';

import TrailImage from '../../public/assets/images/trails.svg';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import { notifyError, notifySuccess } from '../../util/notifyToast';
import { useRouter } from 'next/router';

type AdminProps = {
    trailsData: Trail[]
}

export default function Admin({ trailsData }: AdminProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const [trails, setTrails] = useState<Trail[]>(trailsData);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [mountedBy, setMountedBy] = useState<string>('');

    async function handleSubmitRegisterTrail(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (name !== '' && description !== '' && mountedBy !== '') {
            const res = await createTrails(name, description, mountedBy, session?.user.token);

            if (res) {
                await getTrails();
                notifySuccess(`Trilha "${res.name}" cadastrada com sucesso!`);
                setOpenModal(false);
                clearModal();
            } else {
                notifyError('Houver um erro no cadastro da trilha');
            }

        } else {
            notifyError('Preencha todos os campos do formulário');
        }
    }

    async function getTrails() {
        const res = await findAll(session?.user.token);
        const trailsData: Trail[] = res._embedded.trailVOList;
        setTrails(trailsData);
    }

    function clearModal() {
        setName('');
        setDescription('');
        setMountedBy('');
    }

    return (
        <>
            <div className={styles.container}>
                <Head>
                    <title>Dashboard Admin | Orange Evolution</title>
                </Head>

                <Modal
                    openModal={openModal}
                    closeModal={() => setOpenModal(false)}
                >
                    <div className={styles.modalRegisterTrail}>
                        <h2>Cadastrar nova trilha</h2>
                        <form onSubmit={handleSubmitRegisterTrail}>
                            <label htmlFor="">Nome da Trilha</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                            <label htmlFor="">Descrição</label>
                            <textarea cols="20" rows="10" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                            <label htmlFor="">Montada por</label>
                            <input type="text" value={mountedBy} onChange={(e) => setMountedBy(e.target.value)} />

                            <button type="submit">Cadastrar</button>
                        </form>
                    </div>
                </Modal>

                <Header />

                <div className={styles.welcome}>
                    <div>
                        <p>Olá, {session?.user.name}!</p>
                        <span>Administre as trilhas de conteúdos abaixo:</span>
                    </div>

                    <div className={styles.buttons}>
                        <button onClick={(e) => { e.preventDefault(), setOpenModal(true) }}>Cadastrar nova trilha</button>
                        <button onClick={(e) => { e.preventDefault(), router.push('/admin/category') }}>Gerenciar Categorias</button>
                    </div>
                </div>

                <section>
                    <span>Clique em cada trilha para adicionar ou atualizar cursos</span>
                    <div className={styles.trails}>
                        {trails.map((trail) => (
                            <Link href={`/admin/trail/${trail.id}`} key={trail.id}>
                                <Image src={TrailImage} alt={trail.name} />
                                <span>{trail.name}</span>
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

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const res = await findAll(session?.user.token);
    const trailsData: Trail[] = res._embedded.trailVOList;

    return {
        props: {
            trailsData
        }
    }
}