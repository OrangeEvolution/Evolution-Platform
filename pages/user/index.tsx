import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import { findAll } from '../../services/trails';
import styles from '../../styles/Admin.module.scss';
import { Trail } from '../../Types/Trail';

import TrailImage from '../../public/assets/images/trails.svg';
import Link from 'next/link';

type UserProps = {
    trails: Trail[]
}

export default function User({ trails }: UserProps) {
    const { data: session } = useSession();

    console.log(trails)

    return (
        <div className={styles.container}>
            <Head>
                <title>Dashboard Admin | Orange Evolution</title>
            </Head>

            <div className={styles.welcome}>
                <p>Olá, {session?.user.name}!</p>
                <span>Administre as trilhas de conteúdos abaixo:</span>
            </div>

            <section>
                <span>Clique em cada trilha para adicionar ou atualizar cursos</span>
                <div className={styles.trails}>
                    {trails.map((trail) => (
                        <Link href={`/user/trail/${trail.id}`} key={trail.id}>
                            <Image src={TrailImage} alt={trail.name} />
                            <span>{trail.name}</span>
                        </Link>
                    ))}
                </div>
            </section>

        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    const res = await findAll(session?.user.token);
    const trails: Trail[] = res._embedded.trailVOList;

    return {
        props: {
            trails
        }
    }
}