Vue.component('aula-experimental', {
  props: [],
  data: function () {
    return {
      modalidades:[
        { 
          name: 'Bachata', 
          id:1
        },
        { 
          name: 'Ballet', 
          id:2
        },
        { 
          name: 'Contemporâneo', 
          id:3
        },
        { 
          name: 'High Heels', 
          id:4
        },
        { 
          name: 'Kizomba', 
          id:5
        },
        { 
          name: 'Latinas', 
          id:6
        },
        { 
          name: 'Latinas Kids', 
          id:7
        },
        { 
          name: 'Pop Dance', 
          id:8
        },
        { 
          name: 'Salsa', 
          id:9
        },
      ]
    }
  },
  template: 
  /*html*/
  `
  <div>
      <section class="aula-experimental">
          <div class="container-grid">
              <div class="aula-experimental-container">
                  <h2 class="section-h2">Marque uma aula experimental</h2>
                  <form>
                        <div class="aula-experimental-form grid-1">
                            <div class="aula-experimental-form-row-1">
                                <div class="">
                                    <h6>Primeiro nome*</h6>
                                    <input type="text" placeholder="Primeiro nome" required></input>
                                </div>
                                <div class="">
                                    <h6>Último nome*</h6>
                                    <input type="text" placeholder="Último nome" required></input>
                                </div>
                            </div>
                            <div class="aula-experimental-form-row-2">
                                <div class="aula-experimental-form-row-2-item-1">
                                    <h6>Modalidade*</h6>
                                    <select class="round" required>
                                        <option v-for="modalidade in modalidades" :key="modalidade.id"> {{ modalidade.name }} </option>
                                    </select>
                                </div>     
                                <div class="aula-experimental-form-row-2-item-2">
                                    <h6>Telemóvel*</h6>
                                    <div class="">
                                        <input class="" title="9-digit cellphone number" type="text" pattern="\d*" maxlength="9" placeholder="918526395" data-valid-example="913781495" required></input>
                                    </div>
                                </div>
                            </div>
                            <div class="aula-experimental-form-row-3">
                                <div class="aula-experimental-form-row-3-item-1">
                                    <h6>Email*</h6>
                                    <div class="">
                                        <input type="text" placeholder="example@address.com" required></input>
                                    </div>
                                </div>
                            </div>
                            <div class="aula-experimental-form-row-5">
                                <p>*A marcação estará sujeita a revisão por parte do instructor(a), será notificado caso seja possível a disponibilidade indicada.</p>
                                <div class="aula-experimental-form-row-5-item-2">     
                                    <input type="checkbox" id="checkboxInputOverride" name="checkboxInputOverride" required>
                                        <label for="checkboxInputOverride">Aceito a <a class="link-underline" href="www.google.com" target="_blank">Política de processamento de dados</a>.</label>
                                    </input>
                                </div>
                            </div>
                            <div class="aula-experimental-form-row-6">
                                <div class="section-link">
                                    <a class="button-purple" href="">Enviar</a>
                                </div>
                            </div>    
                        </div>
                  </form>
                </div>  
            </div>
        </section>

        <section class="aula-experimental-desktop">
          <div class="container-grid grid-6">
                <div class="aula-experimental-container">
                    <h2 class="section-h2">Marque uma aula experimental</h2>
                    <form>
                        <div class="aula-experimental-form">
                            <div class="aula-experimental-form-row-1">
                                <div class="aula-experimental-item-1">
                                        <h6>Primeiro nome*</h6>
                                        <div class="">
                                                <input type="text" placeholder="Primeiro nome"></input>
                                        </div>           
                                </div>
                                <div class="aula-experimental-item-2">
                                        <h6>Último nome*</h6>
                                        <div class="">
                                            <input type="text" placeholder="Último nome"></input>
                                        </div>
                                </div> 
                                <div class="aula-experimental-item-3">
                                        <h6>Telemóvel*</h6>
                                        <div class="">
                                            <input class="" title="9-digit cellphone number" type="text" pattern="\d*" maxlength="9" placeholder="918526395" data-valid-example="913781495"></input>
                                        </div>
                                </div> 
                            </div> 
                            <div class="aula-experimental-form-row-2">
                                <div class="aula-experimental-item-4">
                                    <h6>Email*</h6>
                                    <div class="">
                                        <input type="text" placeholder="example@address.com"></input>
                                    </div>
                                </div>
                                <div class="aula-experimental-item-5">
                                    <div class="">
                                        <h6>Modalidade*</h6>
                                        <select class="round">
                                            <option v-for="modalidade in modalidades" :key="modalidade.id"> {{ modalidade.name }} </option>
                                        </select>
                                    </div>
                                </div> 
                            </div>
                            <div class="aula-experimental-form-row-5">
                                <div>
                                    <p>*A marcação estará sujeita a revisão por parte do instructor(a), será notificado caso seja possível a disponibilidade indicada.</p>
                                    <div class="aula-experimental-form-row-5-item-2">
                                        
                                        <input type="checkbox" id="checkboxInputOverride" name="checkboxInputOverride">
                                            <label for="checkboxInputOverride">Aceito a <a class="link-underline" href="www.google.com" target="_blank">Política de processamento de dados</a>.</label>
                                        </input>
                                        
                                    </div>
                                </div>
                            </div> 
                            <div class="aula-experimental-form-row-6">
                                <div class="section-link">
                                    <a class="button-purple" href="">Enviar</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="comment-section">
                    <svg id="branding-quote-1" stroke-width="2" width="40" height="85" viewBox="0 0 75 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.1106 60.3155L1.36475 45.6165C13.2448 33.7742 19.8101 18.0364 19.8101 1.25977H40.6524C40.6524 23.542 31.9508 44.5257 16.1106 60.3155Z" stroke="#836BD1" stroke-miterlimit="10"/>
                        <path d="M39.5062 83.6365L24.7603 68.9375C42.893 50.8624 52.8973 26.8142 52.8973 1.25977H73.7396C73.7396 32.3718 61.5468 61.614 39.5062 83.6365Z" stroke="#836BD1" stroke-miterlimit="10"/>
                    </svg>
                
                    <p class="comment-p">
                        Et ultrices neque ornare aenean euismod elementum. Amet tellus cras adipiscing enim eu. Quam pellentesque nec nam aliquam sem et tortor.
                    </p>
                    <p class="comment-owner">
                        Mariana Santos
                    </p>

                    <svg id="branding-quote-2" stroke-width="2" width="40" height="85" viewBox="0 0 75 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.1106 60.3155L1.36475 45.6165C13.2448 33.7742 19.8101 18.0364 19.8101 1.25977H40.6524C40.6524 23.542 31.9508 44.5257 16.1106 60.3155Z" stroke="#836BD1" stroke-miterlimit="10"/>
                        <path d="M39.5062 83.6365L24.7603 68.9375C42.893 50.8624 52.8973 26.8142 52.8973 1.25977H73.7396C73.7396 32.3718 61.5468 61.614 39.5062 83.6365Z" stroke="#836BD1" stroke-miterlimit="10"/>
                    </svg>
                </div>
            </div>    
        </section>
    </div>
    `,
  })