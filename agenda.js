(()=>{

  /******DECLARANDO OS CAMPOS DE INTERACAO DO USUARIO******/
  var ui = {
    fields: document.querySelectorAll("input"),
    button: document.querySelector("button"),
    table: document.querySelector("table")
  };

  /******DECLARANDO AS FUNÇÕES DE AÇÃO******/

  //CAMPOS DE VALIDAÇÃO
  var validateFields = e =>{
    e.preventDefault();
    var erros = 0;
    var data = {};

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
  var cleanFields = ()=> ui.fields.forEach(field => field.value="");



// FUNÇÃO DE EXEMPLO DE LOADING
  // var loading = ()=>{
  //   var p = document.createElement("p");
  //   p.classList.add("loading");
  //   p.textContent = "Carregando";
  //   document.body.appendChild(p);
  // }
  //
  // var hideLoading = ()=>{
  //   setTimeout(function(){
  //     document.querySelector(".loading").style.display = "none";
  //   }, 3000);
  // }


  //FUNÇÃO QUE FAZ A REQUISIÇÃO, E SALVA AS INFORMAÇÕES
  var saveData = contact =>{

    // LOADING
    // loading();

    //CRIANDO O HEADER
    var headers = new Headers();
    headers.append("Content-type", "application/json");
    //CONFIGURANDO O HEADER
    var conf = {
      method: "POST",
      body: JSON.stringify(contact),
      headers: headers
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
        .catch(err => console.error(err, "O Banco de dados não esta respondendo :/"));
  };

  // LISTAS OS ITENS
  var listAll = ()=>{
    console.log("Listar Resultados");
  };


  // CRIANDO FUNÇÃO DE INICIAÇÃO
  var initialize = function(){
    //MAPEANDO OS EVENTOS
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
