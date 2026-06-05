import Footer from "@/components/footer/footer";
import SubHeader from "@/components/sub-header/sub-header"
import styles from "./produto.module.css"
import { useEffect, useState } from "react";
import { listarCategoria } from "../api/categoriaService";
import { cadastrarProduto, editarProduto, listarPorId } from "../api/produtoService";
import { erro, notificacao } from "@/utils/toast";
import Toast from "@/components/toast/toast";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { verificarAutenticacao } from "@/utils/auth";

interface Categoria {
  categoriaID: number,
  nome: string
}

const Produto = () => {

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [preco, setPreco] = useState<string>("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [categoriasSelecionadas, setcategoriasSelecionadas] = useState<number[]>([]);
  const [estaAutenticado, setEstaAutenticado] = useState(false);

  const router = useRouter();
  const id = router.query.id;
  let telaEditar = id ? true : false;

  async function listarCatagoriaEmProduto() {
    const lista = await listarCategoria();
    setCategorias(lista.data);
    console.log(lista.data);
  }

  async function carregarInformacoes() {
    if (!id) return;

    const produto = await listarPorId(Number(id));
    setNome(produto.nome);
    setDescricao(produto.descricao);
    setPreco(produto.preco);
    setcategoriasSelecionadas(produto.categoriaIds)
  }

  async function salvarProduto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {

      const dados = {
        nome,
        descricao,
        preco,
        imagem,
        categoriasId: categoriasSelecionadas
      }

      // await cadastrarProduto(dados)

      if (telaEditar) {
        await editarProduto(Number(id), dados);
        notificacao("Produto editado!");
      } else {
        await cadastrarProduto(dados)
        notificacao("Produto cadastrado!");
      }
    } catch (error: any) {
      erro(error.message);
    }

  }
  //quando produto for renderizado, a funcao listarCatagoriaEmProduto acontece
  useEffect(() => {
    if (!router.isReady) return;

    if (!verificarAutenticacao()) {
      router.push("/home")
      return;
    }
    setEstaAutenticado(true);

    listarCatagoriaEmProduto();

    carregarInformacoes();
    
  }, [router.isReady, id])

//a tela de produto não será renderizada
if (!estaAutenticado) {
  return null;
}

return (
  <>
    <SubHeader />
    <Toast />
    <main className={styles.main_produto}>
      <section className={`${styles.section_flex} layout_guide`}>
        <h1>{telaEditar ? "Editar produto" : "Criar produto"}</h1>
        <form className={styles.formulario_produto} onSubmit={salvarProduto}>
          <div className={styles.campo_form}>
            <label htmlFor="">Nome do produto</label>
            <input type="text" name="nome"
              value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className={styles.campo_form}>
            <label htmlFor="">Descrição</label>
            <textarea name="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
          </div>
          <div className={styles.campo_form}>
            <label htmlFor="">Preço(R$)</label>
            <input type="text" name="preco" value={preco} onChange={(e) => setPreco(e.target.value)} />
          </div>
          <div className={styles.campo_form}>
            <label htmlFor="">Categoria</label>
            <select
              name="categoriaIds"
              multiple
              value={categoriasSelecionadas.map(String)}
              onChange={(e) => setcategoriasSelecionadas(
                Array.from(e.target.selectedOptions).map((option) => Number(option.value))
              )}>
              {categorias.map((item) => (
                <option value={item.categoriaID} key={item.categoriaID}>{item.nome}</option>
              )
              )}
            </select>

            <a href="">Criar categoria</a>
          </div>
          <div className={styles.campo_form}>
            <label htmlFor="">Imagem do produto</label>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImagem(e.target.files[0]);
                }
              }}
            />
          </div>
          <button id={styles.btn_salvar}>Salvar</button>
        </form>
      </section>
    </main>
    <Footer />
  </>
)
}

export default Produto;