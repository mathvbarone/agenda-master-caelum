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
    e.preventDefault();
    var erros = 0;
    var data = {};
    ui.fields.forEach(function(field){
      // console.log(field.value, field.value.trim().length);
      if(field.value.trim().length === 0){
        field.classList.add("error");
        erros++;
      }else{
        field.classList.remove("error");
        // console.log(field.id, field.value);
        data[field.id]=field.value;
      }
    });
    if(erros > 0){
      document.querySelector(".error").focus();
    }else{
      saveData(data);
    }
  };

  //SALVAR INFORMACAO
  var saveData = function(){
    debugger;
  };

  // LISTAS OS ITENS
  var listAll = function(){};


  // CRIANDO FUNÇÃO DE INICIAÇÃO
  var initialize = function(){
    //MAPEANDO OS EVENTOS
    ui.button.addEventListener("click", validateFields);

  }();

})();
