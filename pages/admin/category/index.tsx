import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";

import styles from '../../../styles/CategoryDetails.module.scss';

import Link from "next/link";
import Modal from "../../../components/Modal";
import React, { useState } from "react";
import { findAll as findAllContent } from "../../../services/category";
import { notifyError, notifySuccess } from "../../../util/notifyToast";
import { createCategory, update } from "../../../services/category";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

type CategoryProps = {
    categories: any[];
}

export default function CategoryDetails({ categories }: CategoryProps) {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalTwo, setOpenModalTwo] = useState<boolean>(false);

    const { data: session } = useSession();
    const [id, setId] = useState<number>();
    const [name, setName] = useState<string>('');

    async function handleSubmitNewContent(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (name !== '') {
            var res = await createCategory({
                name: name
            }, session?.user.token);

            notifySuccess(`Categoria "${res.name}" cadastrada com sucesso!`);
            setOpenModal(false);
            clearForm();
            Router.reload(window.location.pathname);
        } else {
            notifyError('Atenção! Nome está vázios');
        }
    }
    async function handleUpdateCategory(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (name !== '') {
            const res = await update(id, {
                id: id,
                name: name
            }, session?.user.token);

            notifySuccess(`Categoria "${res.name}" atualizado com sucesso!`);
            setOpenModalTwo(false);
            clearForm();
            Router.reload(window.location.pathname);

        } else {
            notifyError('Atenção! Nome está vazio');
        }
    }

    function clearForm() {
        setName('');

    }
    function fillForm(category: any) {
        setId(category.id);
        setName(category.name);
    }

    return (
        <>
            <div className={styles.container}>
                <Header />

                <Modal
                    openModal={openModal}
                    closeModal={() => setOpenModal(false)}
                >
                    <form onSubmit={handleSubmitNewContent}>
                        <h2>Adicionar nova Categoria</h2>
                        <label htmlFor="name">Nome</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <button type="submit">Cadastrar</button>
                    </form>
                </Modal>

                <div className={styles.details}>
                    <header>
                        <span>
                            Categorias
                        </span>
                    </header>
                    <div className={styles.content}>
                        <button onClick={(e) => { e.preventDefault(), setOpenModal(true), clearForm() }}>Adicionar uma nova Categoria</button>
                    </div>
                </div>

                <div className={styles.categories}>
                    <Modal
                        openModal={openModalTwo}
                        closeModal={() => setOpenModalTwo(false)}
                    >
                        <form onSubmit={handleUpdateCategory}>
                            <h2>Atualizar Categoria</h2>
                            <label htmlFor="name">Nome</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            <button type="submit">Atualizar</button>
                        </form>
                    </Modal>
                    <span>Atualizar uma categoria existente</span>
                    <ul>
                        {categories.map((category) => (
                            <Link href={'#'}><li><button onClick={(e) => { e.preventDefault(), fillForm(category), setOpenModalTwo(true) }}>{category.name}</button></li></Link>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    const categories = await findAllContent(session?.user.token);


    return {
        props: {
            categories: categories._embedded.categoryVOList
        }
    }
}