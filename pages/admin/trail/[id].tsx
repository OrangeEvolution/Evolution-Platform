import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { addCategoryToTrail, findById, findFullTrailById } from "../../../services/trails";
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
    trailData: any;
    contentsTypes: any[];
    categories: any[];
}

export default function TrailDetails({ trailData, contentsTypes, categories }: TrailProps) {
    const [trail, setTrail] = useState<any>(trailData);
    const router = useRouter();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalTwo, setOpenModalTwo] = useState<boolean>(false);
    const [openModalCategory, setOpenModalCategory] = useState<boolean>(false);
    const [updating, setupdating] = useState<boolean>(false);

    const [addCategories, setAddCategories] = useState<any>();

    const { data: session } = useSession();
    const [id, setId] = useState<number>(0);
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
            }, session?.user.token!);

            await getTrail();
            notifySuccess(`Conteúdo "${res.description}" cadastrado com sucesso!`);
            setOpenModal(false);
            clearForm();
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
            }, session?.user.token!);

            await getTrail();
            notifySuccess(`Conteúdo "${res.description}" Atualizado com sucesso!`);
            setOpenModalTwo(false);
            clearForm();

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

    function openModalAddNewCategory() {
        let temp: any[] = [];

        categories.forEach(category => {
            let control = true;

            trail.categories.forEach((categoryTrail: any) => {
                if (categoryTrail.id === category.id) {
                    control = false;
                }
            })

            if (control) {
                temp.push(category);
            }
        })

        if (temp.length > 0) {
            setAddCategories(temp);
            setOpenModalCategory(true);
        } else {
            notifyError('Não existem novas categorias para serem adicionadas!');
        }

    }

    async function handleAddNewCategory(idCategory: number) {
        const res = await addCategoryToTrail(trail.id, idCategory, session?.user.token!);

        console.log(res)

        if (res !== null) {
            await getTrail();
            notifySuccess('Categoria adicionada com sucesso!');
            setOpenModalCategory(false);
        } else {
            notifyError('Ocorreu um erro na selação da trilha!');
        }
    }

    async function getTrail() {
        const trailData = await findFullTrailById(trail.id, session?.user.token!);
        setTrail(trailData);
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

                <Modal
                    openModal={openModalCategory}
                    closeModal={() => setOpenModalCategory(false)}
                >
                    <div className={styles.modalAddCategory}>
                        <h2>Selecione uma nova categoria</h2>
                        <ul>
                            {addCategories?.map((category: any) => (
                                <li key={category.id}>
                                    <span>{category.name}</span>
                                    <button onClick={(e) => { e.preventDefault(), handleAddNewCategory(category.id) }}>Adicionar</button>
                                </li>
                            ))}
                        </ul>
                    </div>
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
                        <button onClick={(e) => { e.preventDefault(), openModalAddNewCategory() }}>Adicionar nova categoria a trilha</button>
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
                            <select id="category" onChange={(e) => setCategory(e.target.value)} value={category}>
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
                        {trail.categories.map((category: any) => (
                            <li key={category.id}>
                                {category.name}
                                <ul>
                                    {category.contents.map((content: any) => <Link href={'#'} key={content.id}><li><button onClick={(e) => { e.preventDefault(), fillForm(content), setOpenModalTwo(true) }}>{content.description}</button></li></Link>)}
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

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const id: string = context.query.id?.toString()!;

    const trail = await findFullTrailById(parseInt(id), session?.user.token);
    const contentType = await findAll(session?.user.token);
    const categories = await findAllContent(session?.user.token);

    console.log(trail.categories)

    return {
        props: {
            trailData: trail,
            contentsTypes: contentType._embedded.contentTypeVOList,
            categories: categories._embedded.categoryVOList
        }
    }
}