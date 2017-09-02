(()=>{

  /******DECLARANDO OS CAMPOS DE INTERACAO DO USUARIO******/
  const ui = {
    fields: document.querySelectorAll("input"),
    button: document.querySelector("button"),
    table: document.querySelector("tbody")
  };

  /******DECLARANDO AS FUNÇÕES DE AÇÃO******/

  //CAMPOS DE VALIDAÇÃO
  const validateFields = e =>{
    e.preventDefault();
    const erros = 0;
    const data = {};

    //FUNÇÃO DE VERIFICAÇÃO DE PREENCHIMENTO DOS CAMPOS
    ui.fields.forEach(field =>{
      // SE TIVER VAZIO, MOSTRA A MENSAGEM DE ERRO
      if(field.value.trim().length === 0){
        field.classList.add("error");
        erros++;
      }
      // SE TIVER PREENCHIDO, REMOVE O ERRO DO CAMPO
      else{
        field.classList.remove("error");
        data[field.id]=field.value;
      }
    });

    //SE TIVER ERRO, DA FOCUS NO CAMPO QUE PRECISA SER PREENCHIDO
    if(erros > 0){
      document.querySelector(".error").focus();
    }
    //SE NÃO TIVER, ENVIA AS INFORMAÇÕES PARA A FUNÇÃO QUE SALVA INFORMAÇÕES
    else{
      saveData(data);
    }
  };


  //FUNÇÃO QUE LIMPA OS CAMPOS
  const cleanFields = ()=> ui.fields.forEach(field => field.value="");

// FUNÇÃO DE EXEMPLO DE LOADING
  // const loading = ()=>{
  //   const p = document.createElement("p");
  //   p.classList.add("loading");
  //   p.textContent = "Carregando";
  //   document.body.appendChild(p);
  // }
  //
  // const hideLoading = ()=>{
  //   setTimeout(function(){
  //     document.querySelector(".loading").style.display = "none";
  //   }, 3000);
  // }


  //FUNÇÃO QUE FAZ A REQUISIÇÃO, E ENVIA AS INFORMAÇÕES
  const saveData = contact =>{

    // LOADING
    // loading();

    //CRIANDO O HEADER
    const headers = new Headers();
    headers.append("Content-type", "application/json");
    //CONFIGURANDO O HEADER
    const conf = {
      method: "POST",
      body: JSON.stringify(contact),
      headers
    }
    // FAZENDO A REQUISIÇÃO
    fetch("http://localhost:3000/contacts", conf)
        //SE A REQUISIÇÃO RETORNAR
        .then(res =>{
          if(res.ok){
            cleanFields();
            listAll();
            // hideLoading();
          }
        })
        //SE A REQUISIÇÃO NÃO RETORNAR
        .catch(err => console.error(err, "O Banco de Dados não esta respondendo :/"));
  };


  // REQUISICAO PARA LISTAR OS CONTATOS
  const listAll = ()=>{

    //CRIANDO O HEADER
    const headers = new Headers();
    headers.append("Content-type", "application/json");
    //CONFIGURANDO O HEADER
    const conf = {
      method: "GET",
      headers
    }
    // FAZENDO A REQUISIÇÃO
    fetch("http://localhost:3000/contacts", conf)
        //SE A REQUISIÇÃO RETORNAR
        .then(res =>{
            return res.json();
        })
        .then(contactsList => {
          const html = [];
          contactsList.forEach((contact)=>{
            const line = `<tr>
                          <td>${contact.id}</td>
                          <td>${contact.name}</td>
                          <td>${contact.email}</td>
                          <td>${contact.phone}</td>
                          <td><a href="#" data-id="${contact.id}" title="Excluir">Excluir</a></td>
                        </tr>`;
            html.push(line);
          });

          // MENSAGEM QUE APARECE QUANDO A TABELA ESTA VAZIA
          if(contactsList.length === 0){
            html.push(`<tr>
                        <td colspan="5" class="empty">Não existem dados registrados!</td>
                      </tr>`);
          }

          ui.table.innerHTML = html.join("");

        })
        //SE A REQUISIÇÃO NÃO RETORNAR
        .catch(err => console.error(err, "O Banco de Dados não esta respondendo :/"));

  };


  const removeContact = e =>{
    const id = e.target.dataset.id;
    if(id){

      //CRIANDO O HEADER
      const headers = new Headers();
      headers.append("Content-type", "application/json");

      //CONFIGURANDO O HEADER
      const conf = {
        method: "DELETE",
        headers
      }
      fetch(`http://localhost:3000/contacts/${id}`, conf)
      .then(listAll)
      .catch(err => console.error(err, "O Banco de Dados não esta respondendo :/"));
    }
  }


  // CRIANDO FUNÇÃO DE INICIAÇÃO
  const initialize = function(){
    //MAPEANDO OS EVENTOS
    ui.table.addEventListener("click", removeContact);
    listAll();
    ui.button.addEventListener("click", validateFields);
  }();

})();





// REST API

// ENDPOINT (Endereco que vai bater pra gerir os dados) - http://localhost:3030/contacts

// CRIAR - POST
// ATUALIZAR TODAS AS INFORMAÇÕES - PUT
// ATUALIZAR INFORMACOES ESPECIFICAS - PATCH
// REMOVER - DELETE
// LISTAR - GET
