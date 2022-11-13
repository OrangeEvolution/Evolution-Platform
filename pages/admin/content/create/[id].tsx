import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import { findById } from '../../../../services/trails';
import styles from '../../../../styles/CreateContent.module.scss';
import { Trail } from '../../../../Types/Trail';

import TrailImage from '../../../../public/assets/images/trails.svg';

type CreateTrailProps = {
    trail: Trail;
}

export default function CreateTrail({ trail }: CreateTrailProps) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <Image src={TrailImage} alt='Logo da trilha' />
                    <span>Trilha {trail.name}</span>
                </div>
                <form>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                            </tr>
                            <tr>
                                <th>Nome</th>
                            </tr>

                        </thead>
                    </table>
                </form>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    const trail = await findById(context.query.id, session?.user.token);

    console.log(trail)

    return {
        props: {
            trail
        }
    }
}