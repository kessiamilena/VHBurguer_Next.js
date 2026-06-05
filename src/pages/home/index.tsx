import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import styles from "./home.module.css"
import ListaProduto from "@/components/lista-produto/lista-produto";
//ESTRUTURA PADRÃO!
const Home = () => {
    return (
        <>
            <Header />
            <main>
                <section id={styles.banner}>
                    <div className={`${styles.container_banner} layout_guide`}>
                        <h1>Bem-vindo ao VH Burguer</h1>
                        <img src="../imgs/foto_de_hamburgueres.png" alt="Três hamburgueres com carne, queijo, salada e bacon." />
                        <div id={styles.botoes_banner_hamburguer}>
                            <button className={styles.btn_atendimento}> Chamar atendente</button>
                            <button className={styles.btn_cardapio}> Ver cardárpio</button>
                        </div>
                    </div>
                </section>
                <section className={styles.destaques} id="destaques" >
                    <div className={`${styles.container_destaques} layout_guide`}>
                        <article className={styles.card_destaque_mais_pedidos}>
                            <p>Os queridinhos da galera</p>
                            <p className={styles.destaque}>mais pedidos</p>
                        </article>
                        <div className={styles.cards_direita}>
                            <article className={styles.card_destaque_muito_bacon}>
                                <p>Lanches com</p>
                                <p className={styles.destaque}>muito bacon</p>
                            </article>
                            <article className={styles.card_destaque_super_combos}>
                                <p>Se tiver muita fome</p>
                                <p className={styles.destaque}>Super combos</p>
                            </article>
                        </div>
                    </div>
                </section>
                <section className={styles.cardapio} id="cardapio">
                    <div className={`${styles.container_cardapio} layout_guide`}>
                        <h2>Cardápio</h2>
                        {/* chamar componente da lista */}
                        <ListaProduto/>
                    </div>
                </section>
                <section className={styles.unidades} id="unidades">
                     <div className={`${styles.container_unidades} layout_guide`}>
                    <div className={styles.texto_unidades}>
                        <h2>Unidades</h2>
                        <ul className={styles.lista_unidades}>
                            <li>Centro - Av. Aurora, 742</li>
                            <li>Jardim - Av. das Palmeiras, 1280</li>
                            <li>Norte - Av. Horizonte, 305</li>
                            <li>Sul - Av. Nova Esperança, 910</li>
                        </ul>
                    </div>
                </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Home;