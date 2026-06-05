import { formatarPreco } from "@/utils/formatacao";
import styles from "./card-produto.module.css"
import Link from "next/link";

type Produto = {
    titulo: string,
    descricao: string,
    img: string,
    preco: number,
    produtoID: number,
    //Criando uma props que recebe uma função
    onDelete: (produtoId: number) => void,
    estaLogado: boolean
}

const CardProduto = ({ titulo, descricao, img, preco, produtoID, onDelete, estaLogado }: Produto) => {
    return (
        <article className={styles.card_produto}>
            <Link href={"/detalhe-produto/" + produtoID}>
                <img src={img} alt="Produto vendido pela loja."
                    className={styles.img_produto} />
            </Link>
            <h3 className={styles.titulo_produto}>{titulo}</h3>
            <p className={styles.desc_produto}>{descricao}</p>
            <div className={styles.campo_itens}>
                <p className={styles.valor_produto}>{formatarPreco(preco)}</p>
                {estaLogado && (
                    <>
                        <button onClick={() => onDelete(produtoID)}>
                            <img id={"excluir"} src="/imgs/trash.svg" alt="ícone que representa exclusão" />
                        </button>
                        <Link href={"/produto?id=" + produtoID}>
                            <img src="/imgs/editar.svg" alt="ícone que representa edição" />
                        </Link>
                        <Link href={"/historico/" + produtoID}>
                            <img src="/imgs/info.svg" alt="ícone que representa edição" />
                        </Link>
                    </>
                )}
            </div>
        </article>
    )
}

export default CardProduto;