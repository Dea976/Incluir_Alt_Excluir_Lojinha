/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  return false; // Ignora o erro e continua o teste
});

// funcionalidade
describe("Teste na Lojinha incluir, alterara e excluir produto - iPhone 14 com Edge", () => {
  // Simula a resolução do iPhone 14 (390x844)
      beforeEach(() => {
        cy.viewport(390, 844);
      });
  

  //1.Cenário
  it("Login com sucesso", () => {
    //DADO
    // abrir a aplicacao
    cy.visit('http://165.227.93.41/lojinha-web/v2/', {
      headers: {
         'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) EdgiOS/120.0.0.0 Mobile/15E148 Safari/537.36",
 },
});
    // Esperando os campos usuário e senha aparecerem e inserindo um usuário válido
    cy.get('#usuario').type('admin', { force: true });
    cy.get('#senha').type('admin', { force: true });

    // Clica no botão "Entrar"
    cy.get('#btn-entrar').click();
    
    // Espera a página carregar e verifica se mostra a lista de produtos do site Lojinha
    cy.url().should('include', 'http://165.227.93.41/lojinha-web/v2/produto');
    
    // Verificar se a lista de produtos está visível, após login
    cy.get('h3').should('contain', 'Lista de Produtos'); // Ajuste conforme a página

    // Clica no link "Adicionar produto"
    cy.get('a[href="http://165.227.93.41/lojinha-web/v2/produto/novo"]').click();

    // Verifica se a URL da página de adicionar produto foi carregada
    cy.url().should('include', '/produto/novo');

    // Preenche os campos do formulário de adicionar produto
    // Supondo que os campos de formulário tenham os seguintes seletores:
    cy.get('#produtonome').type('Notebook Galaxy Book5', { force: true }); //Novo Produto
    cy.get('#produtovalor').type('4.500,00', { force: true });//Valor do Produto
    cy.get('#produtocores').type('Preto, branco', { force: true });//Cores do Produto (Separadas por Vírgula)

    // Clica no botão para salvar o novo produto
    cy.get('#btn-salvar').click();

    // Verifica se o produto foi adicionado com sucesso
    // Supondo que uma mensagem de sucesso apareça ou que a lista de produtos seja atualizada
    cy.contains('Produto adicionado com sucesso').should('be.visible');
   
    //Esperar até o link estar disponível e visível  
    cy.get('a[href="http://165.227.93.41/lojinha-web/v2/produto"]') // Seleciona o link
      .eq(0)  // Seleciona o primeiro link encontrado
      .should('be.visible')  // Verifica se o link está visível
      .click();  // Clica no primeiro link 
   
    //Garantir que a página foi carregada após o clique 
    cy.url().should('include', '/produto');  // Verifica se a URL foi alterada ou contém o caminho esperado

 });
   
});

  //2.Cenário
  it(" Incluir Dado invalido", () => {
     //DADO
    // abrir a aplicacao
    cy.visit('http://165.227.93.41/lojinha-web/v2/', {
      headers: {
         'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) EdgiOS/120.0.0.0 Mobile/15E148 Safari/537.36",
 },
});
    // Esperando os campos usuário e senha aparecerem e inserindo um usuário inválido
    cy.get('#usuario').type('addrre', { force: true });
    cy.get('#senha').type('admin', { force: true });

    // Clica no botão "Entrar"
    cy.get('#btn-entrar').click(); //Falha ao fazer login

  });

  //3.Cenário
  it("Deixar Dados vazios", () => {
    //DADO
    // abrir a aplicacao
    cy.visit('http://165.227.93.41/lojinha-web/v2/', {
      headers: {
         'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) EdgiOS/120.0.0.0 Mobile/15E148 Safari/537.36",
 },
});
    // Esperando os campos usuário e senha aparecerem e inserindo uma senha inválido
    cy.get('#usuario').type(' ', { force: true });
    cy.get('#senha').type(' ', { force: true });

    // Clica no botão "Entrar"
    cy.get('#btn-entrar').click(); //Falha ao fazer login

  });

  //4.Cenário
  it("Alterar dado válido", () => {
    //DADO
    // abrir a aplicacao
    cy.visit('http://165.227.93.41/lojinha-web/v2/', {
      headers: {
         'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) EdgiOS/120.0.0.0 Mobile/15E148 Safari/537.36",
 },
});
    // Esperando os campos usuário e senha aparecerem e deixar o campo senha vazia
    cy.get('#usuario').type('admin', { force: true });
    cy.get('#senha').type(' ', { force: true });

    // Clica no botão "Entrar"
    cy.get('#btn-entrar').click(); //Falha ao fazer login

  });

  //5.Cenário
  it.only("Alterar dado inválido", () => {
    //DADO
    // abrir a aplicacao
    cy.visit('http://165.227.93.41/lojinha-web/v2/', {
      headers: {
         'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) EdgiOS/120.0.0.0 Mobile/15E148 Safari/537.36",
 },
});
    // Esperando os campos usuário e senha aparecerem e deixa o campo usuário vazio
    cy.get('#usuario').type(' ', { force: true });
    cy.get('#senha').type('admin', { force: true });

    // Clica no botão "Entrar"
    cy.get('#btn-entrar').click(); //Falha ao fazer login
  });

  //6.Cenário
  it("Alterar deixando alguns dados vazios", () => {
     //DADO
    // abrir a aplicacao
    cy.visit('http://165.227.93.41/lojinha-web/v2/', {
      headers: {
         'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) EdgiOS/120.0.0.0 Mobile/15E148 Safari/537.36",
 },
});
    // Esperando os campos usuário e senha aparecerem e deixarem os campos usuário e senha vazios
    cy.get('#usuario').type(' ', { force: true });
    cy.get('#senha').type(' ', { force: true });

    // Clica no botão "Entrar"
    cy.get('#btn-entrar').click();  //Falha ao fazer login
  });


  //7.Cenário
  it("Excluir dados válidos", () => {
    //DADO
    // abrir a aplicacao
    cy.visit('http://165.227.93.41/lojinha-web/v2/', {
      headers: {
         'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) EdgiOS/120.0.0.0 Mobile/15E148 Safari/537.36",
 },
});
    // Esperando os campos usuário e senha aparecerem e inserindo um usuário válido
    cy.get('#usuario').type('admin', { force: true });
    cy.get('#senha').type('admin', { force: true });

    // Clica no botão "Entrar"
    cy.get('#btn-entrar').click();
    
    // Espera a página carregar e verifica se mostra a lista de produtos do site Lojinha
    cy.url().should('include', 'http://165.227.93.41/lojinha-web/v2/produto');
    
    // Verificar se a lista de produtos está visível, após login
    cy.get('h3').should('contain', 'Lista de Produtos'); // Ajuste conforme a página

    // Clica no link "Adicionar produto"
    cy.get('a[href="http://165.227.93.41/lojinha-web/v2/produto/novo"]').click();

    // Verifica se a URL da página de adicionar produto foi carregada
    cy.url().should('include', '/produto/novo');

    // Preenche os campos do formulário de adicionar produto
    // Supondo que os campos de formulário tenham os seguintes seletores:
    cy.get('#produtonome').type('Notebook Galaxy Book5', { force: true }); //Novo Produto
    cy.get('#produtovalor').type('4.500,00', { force: true });//Valor do Produto
    cy.get('#produtocores').type('Preto, branco', { force: true });//Cores do Produto (Separadas por Vírgula)

    // Clica no botão para salvar o novo produto
    cy.get('#btn-salvar').click();

    // Verifica se o produto foi adicionado com sucesso
    // Supondo que uma mensagem de sucesso apareça ou que a lista de produtos seja atualizada
    cy.contains('Produto adicionado com sucesso').should('be.visible');
   
    //Esperar até o link estar disponível e visível  
    cy.get('a[href="http://165.227.93.41/lojinha-web/v2/produto"]') // Seleciona o link
      .eq(0)  // Seleciona o primeiro link encontrado
      .should('be.visible')  // Verifica se o link está visível
      .click();  // Clica no primeiro link 
   
    //Garantir que a página foi carregada após o clique 
    cy.url().should('include', '/produto');  // Verifica se a URL foi alterada ou contém o caminho esperado

 });
   
  
  //8.Cenário
  it("Incluir Componete", () => {
    //DADO
    // abrir a aplicacao
    cy.visit('http://165.227.93.41/lojinha-web/v2/', {
      headers: {
         'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) EdgiOS/120.0.0.0 Mobile/15E148 Safari/537.36",
 },
});
    // Esperando os campos usuário e senha aparecerem e inserindo um usuário válido
    cy.get('#usuario').type('admin', { force: true });
    cy.get('#senha').type('admin', { force: true });

    // Clica no botão "Entrar"
    cy.get('#btn-entrar').click();
    
    // Espera a página carregar e verifica se mostra a lista de produtos do site Lojinha
    cy.url().should('include', 'http://165.227.93.41/lojinha-web/v2/produto');
    
    // Verificar se a lista de produtos está visível, após login
    cy.get('h3').should('contain', 'Lista de Produtos'); // Ajuste conforme a página

    // Clica no link "Adicionar produto"
    cy.get('a[href="http://165.227.93.41/lojinha-web/v2/produto/novo"]').click();

    // Verifica se a URL da página de adicionar produto foi carregada
    cy.url().should('include', '/produto/novo');

    // Preenche os campos do formulário de adicionar produto
    // Supondo que os campos de formulário tenham os seguintes seletores:
    cy.get('#produtonome').type('Notebook Galaxy Book5', { force: true }); //Novo Produto
    cy.get('#produtovalor').type('4.500,00', { force: true });//Valor do Produto
    cy.get('#produtocores').type('Preto, branco', { force: true });//Cores do Produto (Separadas por Vírgula)

    // Clica no botão para salvar o novo produto
    cy.get('#btn-salvar').click();

    // Verifica se o produto foi adicionado com sucesso
    // Supondo que uma mensagem de sucesso apareça ou que a lista de produtos seja atualizada
    cy.contains('Produto adicionado com sucesso').should('be.visible');
   
    //Esperar até o link estar disponível e visível  
    cy.get('a[href="http://165.227.93.41/lojinha-web/v2/produto"]') // Seleciona o link
      .eq(0)  // Seleciona o primeiro link encontrado
      .should('be.visible')  // Verifica se o link está visível
      .click();  // Clica no primeiro link 
   
    //Garantir que a página foi carregada após o clique 
    cy.url().should('include', '/produto');  // Verifica se a URL foi alterada ou contém o caminho esperado

 });
   
//9.Cenário
it("Excluir componente", () => {
  //DADO
  // abrir a aplicacao
  cy.visit('http://165.227.93.41/lojinha-web/v2/', {
    headers: {
       'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) EdgiOS/120.0.0.0 Mobile/15E148 Safari/537.36",
},
});
  // Esperando os campos usuário e senha aparecerem e inserindo um usuário válido
  cy.get('#usuario').type('admin', { force: true });
  cy.get('#senha').type('admin', { force: true });

  // Clica no botão "Entrar"
  cy.get('#btn-entrar').click();
  
  // Espera a página carregar e verifica se mostra a lista de produtos do site Lojinha
  cy.url().should('include', 'http://165.227.93.41/lojinha-web/v2/produto');
  
  // Verificar se a lista de produtos está visível, após login
  cy.get('h3').should('contain', 'Lista de Produtos'); // Ajuste conforme a página

  // Clica no link "Adicionar produto"
  cy.get('a[href="http://165.227.93.41/lojinha-web/v2/produto/novo"]').click();

  // Verifica se a URL da página de adicionar produto foi carregada
  cy.url().should('include', '/produto/novo');

  // Preenche os campos do formulário de adicionar produto
  // Supondo que os campos de formulário tenham os seguintes seletores:
  cy.get('#produtonome').type('Notebook Galaxy Book5', { force: true }); //Novo Produto
  cy.get('#produtovalor').type('4.500,00', { force: true });//Valor do Produto
  cy.get('#produtocores').type('Preto, branco', { force: true });//Cores do Produto (Separadas por Vírgula)

  // Clica no botão para salvar o novo produto
  cy.get('#btn-salvar').click();

  // Verifica se o produto foi adicionado com sucesso
  // Supondo que uma mensagem de sucesso apareça ou que a lista de produtos seja atualizada
  cy.contains('Produto adicionado com sucesso').should('be.visible');
 
  //Esperar até o link estar disponível e visível  
  cy.get('a[href="http://165.227.93.41/lojinha-web/v2/produto"]') // Seleciona o link
    .eq(0)  // Seleciona o primeiro link encontrado
    .should('be.visible')  // Verifica se o link está visível
    .click();  // Clica no primeiro link 
 
  //Garantir que a página foi carregada após o clique 
  cy.url().should('include', '/produto');  // Verifica se a URL foi alterada ou contém o caminho esperado

});
   

