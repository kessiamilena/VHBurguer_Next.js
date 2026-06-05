
// validar se existe um cardápio na tela
describe("Tela Home", () => {
    // definir cenário de testes
    it("deve carregar a tela home e mostrar produtos", () => {
        // abrir a tela do navegador
        cy.visit("http://localhost:3000/home");
        // verifica se o texto Cardápio aparece na tela
        cy.contains("Cardápio").should("be.visible");""
    })
})

// verificar se aparece mensagem de erro ao clicar no botão cadastrar
// sem preencher campo nenhum

describe("Cadastro de produto", () => {

    // precisa fazer login antes de cadastrar o produto
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");

        cy.get("input[type='email']")
            .type("carlos@vhburguer.com")
        
        cy.get("input[type='password']")
            .type("admin@123")

        cy.contains("Entrar").click();
    })

    // testando o cadastro,
    it("deve mostrar erro ao tentar cadastrar sem preencher os campos", () => {
        cy.visit("http://localhost:3000/produto");

        cy.get("button").contains("Salvar").click();

        cy.contains("Nome é obrigatório.").should("be.visible");

    })
})


// testando cadastro de produto
describe("Cadastro de produto", () => {
    // precisa fazer login antes de cadastrar o produto
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");

        cy.get("input[type='email']")
            .type("carlos@vhburguer.com")
        
        cy.get("input[type='password']")
            .type("admin@123")

        cy.contains("Entrar").click();
    })

    it("deve cadastrar um produto com dados válidos", () => {
        cy.visit("http://localhost:3000/produto");

        cy.get("input[name='nome']").type("X-Bacon");
        cy.get("textarea[name='descricao']").type("Lanche com bacon e queijo");
        cy.get("input[name='preco']").type("25");

        cy.get("select[name='categoriaIds']")
            .select("Vegetariano");

        cy.get("input[type='file']")
            .selectFile("cypress/fixtures/produto.jpg");

        cy.contains("button", "Salvar").click();

        cy.contains("Produto cadastrado!")
            .should("be.visible");

        cy.visit("http://localhost:3000/home");
        cy.contains("X-Bacon")
            .should("be.visible");
    });
})


// Testando preço inválido
describe("Validação de Produto", () => {

    beforeEach(() => {
        cy.visit("http://localhost:3000/login");

        cy.get("input[type='email']")
            .type("carlos@vhburguer.com");

        cy.get("input[type='password']")
            .type("admin@123");

        cy.contains("Entrar").click();
    });


    it("deve mostrar erro quando o preço for negativo", () => {
        cy.visit("http://localhost:3000/produto");

        cy.get("input[name='nome']").type("X-Salada");
        cy.get("textarea[name='descricao']").type("Lanche simples");
        cy.get("input[name='preco']").type("-10");
        cy.get("select[name='categoriaIds']").select("Vegetariano");

        cy.get("input[type='file']")
            .selectFile("cypress/fixtures/produto.jpg");

        cy.get("button").contains("Salvar").click();

        cy.contains("Preço deve ser maior que zero").should("be.visible");
    });
});

// Testando exclusão de produto
describe("Exclusão de Produto", () => {

    beforeEach(() => {
        cy.visit("http://localhost:3000/login");

        cy.get("input[type='email']")
            .type("carlos@vhburguer.com");

        cy.get("input[type='password']")
            .type("admin@123");

        cy.contains("Entrar").click();
    });

    it("deve excluir o produto X-Bacon", () => {
        cy.visit("http://localhost:3000/home");

        cy.contains("X-Bacon")
            .should("be.visible");

        cy.contains("X-Bacon")
            .parents("article")
            .find("#excluir")
            .click();

        cy.contains("Deseja realmente excluir?")
            .should("be.visible");

        cy.contains("button", "Sim")
            .click();

        cy.contains("Produto inativado!")
            .should("be.visible");
    });
});