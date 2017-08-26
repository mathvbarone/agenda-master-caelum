(function(){
  /******DECLARANDO OS CAMPOS DE INTERACAO DO USUARIO******/
  var ui = {
    fields: document.querySelectorAll("input"),
    button: document.querySelector("button"),
    table: document.querySelector("table")
  };

  /******DECLARANDO AS FUNÇÕES DE AÇÃO******/

  //CAMPOS DE VALIDAÇÃO
  var validateFields = function(e){
    console.log("Validação",e);
    e.preventDefault();
  };

  //SALVAR INFORMACAO
  var saveData = function(){};

  // LISTAS OS ITENS
  var listAll = function(){};


  // CRIANDO FUNÇÃO DE INICIAÇÃO
  var initialize = function(){
    //MAPEANDO OS EVENTOS
    ui.button.addEventListener("click", validateFields);

  }();

})();
