/** Variaveis que vêm do mundo HTML e assim utilizando o DOM nivel 2,
 * poder assim manipula-las no mundo JavaScript. Criei elas fora da função, no escopo globol,
 * assim posso usa-las em qualquer parte do codigo.
 */
let $btn2   = document.getElementById('btnBaixar');
let $dica   = document.getElementById('paragrafo');
let $imagem = document.getElementById('image-area');

   
/** Criei uma função auto-invocavel, para que podesse excecutar todo o codido dentro dela, assim
* organizaria melhor o código no meu ponto de vista. Dentro dela pude manipular as variaveis que 
* vieram do mundo HTML e também algumas que criei para manipulpar também o Drag and Drop.
*/
(function(){
        'use strict';
        
        $dica.addEventListener('click', function(event){
           event.stopPropagation();
           window.open('https://drive.google.com/file/d/1mzo2vOi_y2QorVCNk2stRGymUZwfUbQi/view');
        });

                
                /** Criação uma "classe" de controle.
                 *  Pelo fato de JS não ser totalmente orientada a objeto.
                 */
                
                function FileFrame(fileArea, fileTitle) {
                    var self = this;
                   
                    this.fileArea = fileArea;
                    this.fileTitle = fileTitle;
                  
                    this.init = function() {
                      
                      /** Registrando eventos de drag and drop, utilizando o Dom level2
                       * com addEventListener, passando os três parametros da função, o terceiro
                       * e ultimo é opcional. (false) */ 
                      self.fileArea.addEventListener("dragleave", self.dragHover, false);
                      self.fileArea.addEventListener("dragover", self.dragHover, false);
                      self.fileArea.addEventListener("drop", self.drop, false);
                  
                    };
                     this.dragHover = function(e) {
                      
                      /**Impede possíveis tratamentos dos arquivos
                       arrastados pelo navegador, por exemplo, exibir
                       o conteudo do mesmo. Controlando com e = Eventos, stopPropagation e 
                       preventDefault */ 
                      e.stopPropagation();  
                      e.preventDefault();  
                  
                      /** Serve para alterar o estilo do arquivo quando estiver sobre a área 
                       * determinada.
                       */ 
                      self.fileArea.className = (e.type == "dragover" ? "hover" : ""); 
                      //console.log(self.fileArea.className);  
                    };
                  
                    this.drop = function(e) {
                      self.dragHover(e);  
                      
                      /** retornara um array com os arquivos arrastados,
                       mas no caso será apenas um unico arquivo. O primeiro.
                      */
                     //debugger;
                      self.file = e.dataTransfer.files[0];  
                      //console.log(self.file);
                      
                      
                      /** Recupera nome do arquivo */ 
                      self.fileTitle.innerHTML = self.file.name;
                      //2console.log(self.fileTitle.innerHTML);
                      
                      self.read(self.file);
                      //console.log(self.read);
                   
                    };
                  
                    /**Esse método irá ler o arquivo na memória,
                    depois iremos mostrá-lo no nosso frame */
                    this.read = function(file) {
                      
                      /** Iremos ler apenas imagens nesse exemplo
                      e iremos exibi-lo no frame */ 
                      
                      if (file.type.match('image.*')) {
                        var reader = new FileReader();
                        //console.log(file.type.match('image.*'));
                        //console.log(reader)
                        //console.log(file.type.match('image.*'));

                        /**Callback que será executado após a leitura do arquivo */
                        reader.onload = (f) => {
                          self.fileArea.innerHTML = " ";
                          self.fileArea.setAttribute("style", "padding: 0px !important;");
                          
                          /** Criação do elemento que será utilizado para exibir a imagem */
                          //debugger;
                          var img = document.createElement("img");
                          img.setAttribute("src", f.target.result);
                          img.setAttribute("height", "350");
                          
                          self.fileArea.appendChild(img);
                          let receber = self.fileArea.appendChild(img);
                          
                        }
                        
                        /** Irá ler o arquivo para ser acessado através de uma url */
                        reader.readAsDataURL(file);
                      }
                    }
                  
                    /** Essa função pode ser utilizada da forma que tá abaixo.*/ 
                    this.sendFile = function(file) {
                  
                      /** Criaremos um formulário */ 
                      var f = new FormData();
                      /** Passando o arquivo para o formulário */
                      f.append("file", file);
                      
                      
                  
                      /**Chamada async para realizar o upload da imagem */ 
                      var request = new XMLHttpRequest();
                      request.open("POST", "", true);
                      request.send(f);
                      request.onreadystatechange=function(){
                        /** Término do envio do formulário */ 
                        if(request.readyState==4) {
                        }
                      }
                    };
                }
                  
          /** Recupera a div que conterá a imagem
          e o span com o título de nosso arquivo
          */
          var area = document.getElementById("image-area");
          //debugger;
          //console.log(area.value);
          var title = document.getElementById("title");
          //console.log(title);
          
          var fileFrameArea = new FileFrame(area, title);
          fileFrameArea.init();
          //console.log(fileFrameArea);
          //console.log(fileFrameArea.childNodes);
          /**
           * Botão responsavel por fazer o download do cracha.
           * 
           */
          $btn2.addEventListener('click', function(event){
            event.stopPropagation();
            download();
          }); 

          /** Função usada para fazer o dowloand do crachá! 
           * content: é onde iremos recuperar a imagem.
           * filename:o nome do arquivo que será utilizado ao usuário baixar o conteúdo.
           * contentType: é para verificar qual tipo de arquivo vai fazer o download.
           */
          var download = (content, filename, contentType) => {
              if(!contentType){
                  contentType = 'application/octet-stream';
              }
              var a = document.createElement('a');
              var blob = new Blob([content], {'type':contentType});
           
              a.href = window.URL.createObjectURL(blob);
              a.download = filename;
              a.click();
                
          }
})();
