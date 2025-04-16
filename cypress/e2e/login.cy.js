/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  return false; // Ignora o erro e continua o teste
});

// funcionalidade
describe("Teste na Lojinha incluir, alterara e excluir produto - iPhone 14 com Edge", () => {
  // Simula a resolu��o do iPhone 14 (390x844)
      beforeEach(() => {
        cy.viewport(390, 844);
      });
  

  //1.Cen�rio
  it("Login com sucesso", () => {
    //DADO
    // abrir a aplicacao
    cy.visit('http://165.227.93.41/lojinha-web/v2/', {
      headers: {
         'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) EdgiOS/120.0.0.0 Mobile/15E148 Safari/537.36",
 },
});
    // Esperando os campos usu�rio e senha aparecerem e inserindo um usu�rio v�lido
    cy.get('#usuario').type('admin', { force: true });
    cy.get('#senha').type('admin', { force: true });

    // Clica no bot�o "Entrar"
    cy.get('#btn-entrar').click();
    
    // Espera a p�gina carregar e verifica se mostra a lista de produtos do site Lojinha
    cy.url().should('include', 'http://165.227.93.41/lojinha-web/v2/produto');
    
    // Verificar se a lista de produtos est� vis�vel, ap�s login
    cy.get('h3').should('contain', 'Lista de Produtos'); // Ajuste conforme a p�gina

    // Clica no link "Adicionar produto"
    cy.get('a[href="http://165.227.93.41/lojinha-web/v2/produto/novo"]').click();

    // Verifica se a URL da p�gina de adicionar produto foi carregada
    cy.url().should('include', '/produto/novo');

    // Preenche os campos do formul�rio de adicionar produto
    // Supondo que os campos de formul�rio tenham os seguintes seletores:
    cy.get('#produtonome').type('Notebook Galaxy Book5', { force: true }); //Novo Produto
    cy.get('#produtovalor').type('4.500,00', { force: true });//Valor do Produto
    cy.get('#produtocores').type('Preto, branco', { force: true });//Cores do Produto (Separadas por V�rgula)

    // Clica no bot�o para salvar o novo produto
    cy.get('#btn-salvar').click();

    // Verifica se o produto foi adicionado com sucesso
    // Supondo que uma mensagem de sucesso apare�a ou que a lista de produtos seja atualizada
    cy.contains('Produto adicionado com sucesso').should('be.visible');
   
    //Esperar at� o link estar dispon�vel e vis�vel  
    cy.get('a[href="http://165.227.93.41/lojinha-web/v2/produto"]') // Seleciona o link
      .eq(0)  // Seleciona o primeiro link encontrado
      .should('be.visible')  // Verifica se o link est� vis�vel
      .click();  // Clica no primeiro link 
   
    //Garantir que a p�gina foi carregada ap�s o clique 
    cy.url().should('include', '/produto');  // Verifica se a URL foi alterada ou cont�m o caminho esperado

 });
   
});

  //2.Cen�rio
  it(" Incluir Dado invalido", () => {
     //DADO
    // abrir a aplicacao
    cy.visit('http://165.227.93.41/lojinha-web/v2/', {
      headers: {
         'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) EdgiOS/120.0.0.0 Mobile/15E148 Safari/537.36",
 },
});
    // Esperando os campos usu�rio e senha aparecerem e inserindo um usu�rio inv�lido
    cy.get('#usuario').type('addrre', { force: true });
    cy.get('#senha').type('admin', { force: true });

    // Clica no bot�o "Entrar"
    cy.get('#btn-entrar').click(); //Falha ao fazer login

  });

  //3.Cen�rio
  it("Deixar Dados vazios", () => {
    //DADO
    // abrir a aplicacao
    cy.visit('http://165.227.93.41/lojinha-web/v2/', {
      headers: {
         'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) EdgiOS/120.0.0.0 Mobile/15E148 Safari/537.36",
 },
});
    // Esperando os campos usu�rio e senha aparecerem e inserindo uma senha inv�lido
    cy.get('#usuario').type(' ', { force: true });
    cy.get('#senha').type(' ', { force: true });

    // Clica no bot�o "Entrar"
    cy.get('#btn-entrar').click(); //Falha ao fazer login

  });

  //4.Cen�rio
  it("Alterar dado v�lido", () => {
    //DADO
    // abrir a aplicacao
    cy.visit('http://165.227.93.41/lojinha-web/v2/', {
      headers: {
         'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) EdgiOS/120.0.0.0 Mobile/15E148 Safari/537.36",
 },
});
    // Esperando os campos usu�rio e senha aparecerem e deixar o campo senha vazia
    cy.get('#usuario').type('admin', { force: true });
    cy.get('#senha').type(' ', { force: true });

    // Clica no bot�o "Entrar"
    cy.get('#btn-entrar').click(); //Falha ao fazer login

  });

  //5.Cen�rio
  it.only("Alterar dado inv�lido", () => {
    //DADO
    // abrir a aplicacao
    cy.visit('http://165.227.93.41/lojinha-web/v2/', {
      headers: {
         'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) EdgiOS/120.0.0.0 Mobile/15E148 Safari/537.36",
 },
});
    // Esperando os campos usu�rio e senha aparecerem e deixa o campo usu�rio vazio
    cy.get('#usuario').type(' ', { force: true });
    cy.get('#senha').type('admin', { force: true });

    // Clica no bot�o "Entrar"
    cy.get('#btn-entrar').click(); //Falha ao fazer login
  });

  //6.Cen�rio
  it("Alterar deixando alguns dados vazios", () => {
     //DADO
    // abrir a aplicacao
    cy.visit('http://165.227.93.41/lojinha-web/v2/', {
      headers: {
         'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) EdgiOS/120.0.0.0 Mobile/15E148 Safari/537.36",
 },
});
    // Esperando os campos usu�rio e senha aparecerem e deixarem os campos usu�rio e senha vazios
    cy.get('#usuario').type(' ', { force: true });
    cy.get('#senha').type(' ', { force: true });

    // Clica no bot�o "Entrar"
    cy.get('#btn-entrar').click();  //Falha ao fazer login
  });


  //7.Cen�rio
  it("Excluir dados v�lidos", () => {
    //DADO
    // abrir a aplicacao
    cy.visit('http://165.227.93.41/lojinha-web/v2/', {
      headers: {
         'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) EdgiOS/120.0.0.0 Mobile/15E148 Safari/537.36",
 },
});
    // Esperando os campos usu�rio e senha aparecerem e inserindo um usu�rio v�lido
    cy.get('#usuario').type('admin', { force: true });
    cy.get('#senha').type('admin', { force: true });

    // Clica no bot�o "Entrar"
    cy.get('#btn-entrar').click();
    
    // Espera a p�gina carregar e verifica se mostra a lista de produtos do site Lojinha
    cy.url().should('include', 'http://165.227.93.41/lojinha-web/v2/produto');
    
    // Verificar se a lista de produtos est� vis�vel, ap�s login
    cy.get('h3').should('contain', 'Lista de Produtos'); // Ajuste conforme a p�gina

    // Clica no link "Adicionar produto"
    cy.get('a[href="http://165.227.93.41/lojinha-web/v2/produto/novo"]').click();

    // Verifica se a URL da p�gina de adicionar produto foi carregada
    cy.url().should('include', '/produto/novo');

    // Preenche os campos do formul�rio de adicionar produto
    // Supondo que os campos de formul�rio tenham os seguintes seletores:
    cy.get('#produtonome').type('Notebook Galaxy Book5', { force: true }); //Novo Produto
    cy.get('#produtovalor').type('4.500,00', { force: true });//Valor do Produto
    cy.get('#produtocores').type('Preto, branco', { force: true });//Cores do Produto (Separadas por V�rgula)

    // Clica no bot�o para salvar o novo produto
    cy.get('#btn-salvar').click();

    // Verifica se o produto foi adicionado com sucesso
    // Supondo que uma mensagem de sucesso apare�a ou que a lista de produtos seja atualizada
    cy.contains('Produto adicionado com sucesso').should('be.visible');
   
    //Esperar at� o link estar dispon�vel e vis�vel  
    cy.get('a[href="http://165.227.93.41/lojinha-web/v2/produto"]') // Seleciona o link
      .eq(0)  // Seleciona o primeiro link encontrado
      .should('be.visible')  // Verifica se o link est� vis�vel
      .click();  // Clica no primeiro link 
   
    //Garantir que a p�gina foi carregada ap�s o clique 
    cy.url().should('include', '/produto');  // Verifica se a URL foi alterada ou cont�m o caminho esperado

 });
   
  
  //8.Cen�rio
  it("Incluir Componete", () => {
    //DADO
    // abrir a aplicacao
    cy.visit('http://165.227.93.41/lojinha-web/v2/', {
      headers: {
         'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) EdgiOS/120.0.0.0 Mobile/15E148 Safari/537.36",
 },
});
    // Esperando os campos usu�rio e senha aparecerem e inserindo um usu�rio v�lido
    cy.get('#usuario').type('admin', { force: true });
    cy.get('#senha').type('admin', { force: true });

    // Clica no bot�o "Entrar"
    cy.get('#btn-entrar').click();
    
    // Espera a p�gina carregar e verifica se mostra a lista de produtos do site Lojinha
    cy.url().should('include', 'http://165.227.93.41/lojinha-web/v2/produto');
    
    // Verificar se a lista de produtos est� vis�vel, ap�s login
    cy.get('h3').should('contain', 'Lista de Produtos'); // Ajuste conforme a p�gina

    // Clica no link "Adicionar produto"
    cy.get('a[href="http://165.227.93.41/lojinha-web/v2/produto/novo"]').click();

    // Verifica se a URL da p�gina de adicionar produto foi carregada
    cy.url().should('include', '/produto/novo');

    // Preenche os campos do formul�rio de adicionar produto
    // Supondo que os campos de formul�rio tenham os seguintes seletores:
    cy.get('#produtonome').type('Notebook Galaxy Book5', { force: true }); //Novo Produto
    cy.get('#produtovalor').type('4.500,00', { force: true });//Valor do Produto
    cy.get('#produtocores').type('Preto, branco', { force: true });//Cores do Produto (Separadas por V�rgula)

    // Clica no bot�o para salvar o novo produto
    cy.get('#btn-salvar').click();

    // Verifica se o produto foi adicionado com sucesso
    // Supondo que uma mensagem de sucesso apare�a ou que a lista de produtos seja atualizada
    cy.contains('Produto adicionado com sucesso').should('be.visible');
   
    //Esperar at� o link estar dispon�vel e vis�vel  
    cy.get('a[href="http://165.227.93.41/lojinha-web/v2/produto"]') // Seleciona o link
      .eq(0)  // Seleciona o primeiro link encontrado
      .should('be.visible')  // Verifica se o link est� vis�vel
      .click();  // Clica no primeiro link 
   
    //Garantir que a p�gina foi carregada ap�s o clique 
    cy.url().should('include', '/produto');  // Verifica se a URL foi alterada ou cont�m o caminho esperado

 });
   
//9.Cen�rio
it("Excluir componente", () => {
  //DADO
  // abrir a aplicacao
  cy.visit('http://165.227.93.41/lojinha-web/v2/', {
    headers: {
       'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) EdgiOS/120.0.0.0 Mobile/15E148 Safari/537.36",
},
});
  // Esperando os campos usu�rio e senha aparecerem e inserindo um usu�rio v�lido
  cy.get('#usuario').type('admin', { force: true });
  cy.get('#senha').type('admin', { force: true });

  // Clica no bot�o "Entrar"
  cy.get('#btn-entrar').click();
  
  // Espera a p�gina carregar e verifica se mostra a lista de produtos do site Lojinha
  cy.url().should('include', 'http://165.227.93.41/lojinha-web/v2/produto');
  
  // Verificar se a lista de produtos est� vis�vel, ap�s login
  cy.get('h3').should('contain', 'Lista de Produtos'); // Ajuste conforme a p�gina

  // Clica no link "Adicionar produto"
  cy.get('a[href="http://165.227.93.41/lojinha-web/v2/produto/novo"]').click();

  // Verifica se a URL da p�gina de adicionar produto foi carregada
  cy.url().should('include', '/produto/novo');

  // Preenche os campos do formul�rio de adicionar produto
  // Supondo que os campos de formul�rio tenham os seguintes seletores:
  cy.get('#produtonome').type('Notebook Galaxy Book5', { force: true }); //Novo Produto
  cy.get('#produtovalor').type('4.500,00', { force: true });//Valor do Produto
  cy.get('#produtocores').type('Preto, branco', { force: true });//Cores do Produto (Separadas por V�rgula)

  // Clica no bot�o para salvar o novo produto
  cy.get('#btn-salvar').click();

  // Verifica se o produto foi adicionado com sucesso
  // Supondo que uma mensagem de sucesso apare�a ou que a lista de produtos seja atualizada
  cy.contains('Produto adicionado com sucesso').should('be.visible');
 
  //Esperar at� o link estar dispon�vel e vis�vel  
  cy.get('a[href="http://165.227.93.41/lojinha-web/v2/produto"]') // Seleciona o link
    .eq(0)  // Seleciona o primeiro link encontrado
    .should('be.visible')  // Verifica se o link est� vis�vel
    .click();  // Clica no primeiro link 
 
  //Garantir que a p�gina foi carregada ap�s o clique 
  cy.url().should('include', '/produto');  // Verifica se a URL foi alterada ou cont�m o caminho esperado

});
   

