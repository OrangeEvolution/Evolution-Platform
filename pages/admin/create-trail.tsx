import React, { useState } from 'react';
import { createTrails } from '../../services/trails';
import styles from '../../styles/Trails.module.scss';
import { notifyError, notifySuccess } from '../../util/notifyToast';

export default function Trails() {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [mountedBy, setMountedBy] = useState<string>('');

    async function handleSubmitCreateTrail(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const trail = await createTrails(name, description, mountedBy);
        if (trail) {
            console.log(trail);
            notifySuccess(`Trilha '${trail.name}' criada com sucesso`);
            setName('');
            setDescription('');
            setMountedBy('');
        } else {
            notifyError('Ocorreu um erro ao criar Trilha');
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmitCreateTrail}>
                <h2>Cadastro de nova Trilha</h2>

                <label htmlFor="">Nome da Trilha</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="">Descrição</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                <label htmlFor="">Trilha montada por:</label>
                <input type="text" value={mountedBy} onChange={(e) => setMountedBy(e.target.value)} />

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}