import CardProduto from "../card-produto/card-produto";
import styles from "./lista-produto.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import Produto from "@/pages/produto";
import { useEffect, useState } from "react";
import { excluirProduto, listarProduto } from "@/pages/api/produtoService";
import { erro, notificacao, toastConfirmarExclusao } from "@/utils/toast";
import { verificarAutenticacao } from "@/utils/auth";

interface Produto {
    produtoID: number,
    nome: string,
    preco: number,
    descricao: string,
    imagemUrl: string,
    statusProduto: boolean
}

const ListaProduto = () => {

    const [produtos, setProdutos] = useState<Produto[]>([]);
    //salvar as informacoes de filtro
    //😁 -> menores valores
    const[ordem, setOrdem] = useState("todos");
    //salvar o que for escrito pelo usuário
    const[pesquisa, setPesquisa] = useState("");
    //SALVA A INFO DO USUARIO LOGADO
    const[estaAutenticado, setEstaAutenticado] = useState(false);

    async function listar() {
        try {
            const lista = await listarProduto();
            setProdutos(lista);
            console.log(lista);
        } catch (error: any) {
            console.log(error.message)
        }
    }

    function confirmarExclusao(produtoId: number) {
        toastConfirmarExclusao(async () => {
            try {
                await excluirProduto(produtoId);

                setProdutos((listaAtual) =>
                    listaAtual.map((produto) => 
                        produto.produtoID === produtoId 
                            ? {...produto, statusProduto: false}
                            : produto
                    )
                )

                notificacao("Produto inativado!")
                listar();
            } catch (error: any) {
                erro(error.message)
            }
        })
    }

    useEffect(() => {
        setEstaAutenticado(verificarAutenticacao());
        listar();
    }, [])

    //sort -> organizar/ordenar o array
    // banana, laranja, maça
    const produtosfiltrados = produtos.filter((produto) => 
    produto.nome.toLowerCase().includes(pesquisa.toLowerCase()))
    .sort((a, b) => {
        if(ordem === "menor_valor"){
            //se o preco de a é MENOR que o preço e B
            return a.preco - b.preco
        }else if(ordem === "maior_valor"){
            //se o preco de B é MENOR que o preço e A
            return b.preco - a.preco
        }
        return a.produtoID - b.produtoID;
    });

    return (
        <>
            <div id={styles.botoes_home}>
                <select className={styles.botao} value={ordem} onChange={(e) => setOrdem(e.target.value)}>
                    Filtrar
                    {/* <FontAwesomeIcon icon={faSliders} /> */}
                    <option value="todos">Todos os produtos</option>
                    <option value="menor_valor">Menor valor</option>
                    <option value="maior_valor">Maior valor</option>
                </select>
                <div>
                    <label htmlFor="pesquisa">Pesquise</label>
                    <input type="text" 
                    name="pesquisa" 
                    id="" 
                    placeholder="Digite o nome do produto"
                    value={pesquisa}
                    onChange={(e) => {setPesquisa(e.target.value)}}/>
                </div>
                {estaAutenticado && (  <div id={styles.botoes_direita}>
                    <Link className={styles.botao} href="/promocoes">Promoções</Link>
                    <Link className={styles.botao} href="/produto">Adicionar produtos</Link>
                </div>)}
              
            </div>
            <div id={styles.cards_produtos}>
                {produtosfiltrados.length > 0 ? produtosfiltrados.map((item) => (
                    <CardProduto
                        key={item.produtoID}
                        produtoID={item.produtoID}
                        titulo={item.nome}
                        descricao={item.descricao}
                        preco={item.preco}
                        img={item.imagemUrl}
                        onDelete={confirmarExclusao}
                        estaLogado={estaAutenticado}
                    />
                )) : (
                    <p>Carregando produto...</p>
                )}
            </div>
        </>
    )
}

export default ListaProduto;