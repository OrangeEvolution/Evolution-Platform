import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Router,{ useRouter } from "next/router";
import { findById, findFullTrailById } from "../../../services/trails";
import { Trail } from "../../../Types/Trail";

import styles from '../../../styles/TrailDetails.module.scss';
import Image from "next/image";

import TrailImage from '../../../public/assets/images/trails.svg';
import Link from "next/link";
import Modal from "../../../components/Modal";
import React, { useState } from "react";
import { findAll } from "../../../services/contentType";
import { findAll as findAllContent } from "../../../services/category";
import { notifyError, notifySuccess } from "../../../util/notifyToast";
import { create, update } from "../../../services/content";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

type TrailProps = {
    trail: any;
    contentsTypes: any[];
    categories: any[];
}

export default function TrailDetails({ trail, contentsTypes, categories }: TrailProps) {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalTwo, setOpenModalTwo] = useState<boolean>(false);
    const [updating, setupdating] = useState<boolean>(false);

    const { data: session } = useSession();
    const [id, setId] = useState<number>();
    const [description, setDescription] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [contentBy, setContentBy] = useState<string>('');
    const [link, setLink] = useState<string>('');

    async function handleSubmitNewContent(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (description !== '' && duration !== '' && contentBy !== '' && link !== '' && category !== '' && type !== '') {
            var res = await create({
                description: description,
                partner: contentBy,
                durationInMinutes: duration,
                category: category,
                contentType: type,
                link: link
            }, session?.user.token);

            notifySuccess(`Conteúdo "${res.description}" cadastrado com sucesso!`);
            setOpenModal(false);
            clearForm();
            Router.reload(window.location.pathname);
        } else {
            notifyError('Atenção! Existem campos vázios');
        }
    }
    async function handleUpdateContent(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (description !== '' && duration !== '' && contentBy !== '' && link !== '' && category !== '' && type !== '') {
            const res = await update(id, {
                id: id,
                description: description,
                partner: contentBy,
                durationInMinutes: duration,
                category: category,
                contentType: type,
                link: link
            }, session?.user.token);

            notifySuccess(`Conteúdo "${res.description}" cadastrado com sucesso!`);
            setOpenModal(false);
            clearForm();
            Router.reload(window.location.pathname);
            
        } else {
            notifyError('Atenção! Existem campos vázios');
        }
    }

    function clearForm() {
        setDescription('');
        setDuration('');
        setCategory('');
        setType('');
        setContentBy('');
        setLink('');
    }
    function fillForm(content: any) {
        setId(content.id);
        setDescription(content.description);
        setDuration(content.durationInMinutes);
        setCategory(content.category);
        setType(content.contentType);
        setContentBy(content.partner);
        setLink(content.link);
        console.log(content)
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
                        <h2>Adicionar novo conteúdo</h2>
                        <label htmlFor="name">Nome</label>
                        <input type="text" id="name" value={description} onChange={(e) => setDescription(e.target.value)} />

                        <label htmlFor="duration">Duração</label>
                        <input type="text" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />

                        <label htmlFor="category">Categoria</label>
                        <select id="category" onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Selecione</option>
                            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                        </select>

                        <label htmlFor="type">Tipo</label>
                        <select id="type" onChange={(e) => setType(e.target.value)}>
                            <option value="">Selecione</option>
                            {contentsTypes.map((content) => <option key={content.id} value={content.id}>{content.name}</option>)}
                        </select>

                        <label htmlFor="content_by">Conteúdo por</label>
                        <input type="text" id="content_by" value={contentBy} onChange={(e) => setContentBy(e.target.value)} />

                        <label htmlFor="link">Link</label>
                        <input type="url" id="link" value={link} onChange={(e) => setLink(e.target.value)} />

                        <button type="submit">Cadastrar</button>
                    </form>
                </Modal>

                <div className={styles.details}>
                    <header>
                        <Image src={TrailImage} alt='Imagem da trilha' />
                        <span>
                            Trilha {trail.name}
                        </span>
                    </header>
                    <div className={styles.content}>
                        <button onClick={(e) => { e.preventDefault(), setOpenModal(true), clearForm() }}>Adicionar um novo material</button>
                        {/*<Link href={`/admin/content/create/${trail.id}`}>Adicionar um novo material</Link>*/}
                    </div>
                </div>

                <div className={styles.contents}>
                    <Modal
                        openModal={openModalTwo}
                        closeModal={() => setOpenModalTwo(false)}
                    >
                        <form onSubmit={handleUpdateContent}>
                            <h2>Atualizar Conteúdo</h2>
                            <label htmlFor="name">Nome</label>
                            <input type="text" id="name" value={description} onChange={(e) => setDescription(e.target.value)} />

                            <label htmlFor="duration">Duração</label>
                            <input type="text" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />

                            <label htmlFor="category">Categoria</label>
                            <select id="category" onChange={(e) => setCategory(e.target.value)}value={category}>
                                <option value="">Selecione</option>
                                {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                            </select>

                            <label htmlFor="type">Tipo</label>
                            <select id="type" onChange={(e) => setType(e.target.value)} value={type}>
                                <option value="">Selecione</option>
                                {contentsTypes.map((types) => <option key={types.id} value={types.id}>{types.name}</option>)}
                            </select>

                            <label htmlFor="content_by">Conteúdo por</label>
                            <input type="text" id="content_by" value={contentBy} onChange={(e) => setContentBy(e.target.value)} />

                            <label htmlFor="link">Link</label>
                            <input type="url" id="link" value={link} onChange={(e) => setLink(e.target.value)} />

                            <button type="submit">Atualizar</button>
                        </form>
                    </Modal>
                    <span>Atualizar um material existente</span>
                    <ul>
                        {trail.categories.map((category) => (
                            <li>
                                {category.name}
                                <ul>
                                    {category.contents.map((content) => <Link href={'#'}><li><button onClick={(e) => { e.preventDefault(), fillForm(content), setOpenModalTwo(true) }}>{content.description}{console.log(content)}</button></li></Link>)}
                                </ul>
                            </li>
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

    const trail = await findFullTrailById(context.query.id, session?.user.token);
    const contentType = await findAll(session?.user.token);
    const categories = await findAllContent(session?.user.token);

    console.log(categories._embedded.categoryVOList)

    return {
        props: {
            trail,
            contentsTypes: contentType._embedded.contentTypeVOList,
            categories: categories._embedded.categoryVOList
        }
    }
}