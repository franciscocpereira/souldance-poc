Vue.component('accordion', {
    props: ['modalidade', 'index', 'open'],
    data: function () {
      return {
        isOpen: false,
        modalidades:[
            { 
              id: 1,
              name: 'Bachata',
              img: '/assets/media/modalidades_bachata.png',
              classColor: '#FDA219',
              days:[
                {name:'QUA', time:'20h00'},
                {name:'SEX', time:'20h00'}
              ],
              description:'A Bachata é uma dança originada da República Dominicana na década de 1960. Considera-se um híbrido do bolero (sobre tudo, o bolero rítmico) com outras influências musicais como por exemplo o chá-chá-chá e o tango.',
              professor:'Mariana Silva',
              open: false
            },
            { 
              id: 2,
              name: 'Ballet',
              img: '/assets/media/modalidades_ballet.png',
              classColor: '#FE94B9',
              days:[
                {name:'QUA', time:'19h00'},
                {name:'SEX', time:'19h00'}
              ],
              description:'A Bachata é uma dança originada da República Dominicana na década de 1960. Considera-se um híbrido do bolero (sobre tudo, o bolero rítmico) com outras influências musicais como por exemplo o chá-chá-chá e o tango.',
              professor:'João Silva',
              open: false
            },
            { 
              id: 3,
              name: 'Contemporâneo',
              img: '/assets/media/modalidades_contemporaneo.png',
              classColor: '#997FFF',
              days:[
                {name:'SEX', time:'18h00'},
                {name:'x', time:'x'}
              ],
              description:'A Bachata é uma dança originada da República Dominicana na década de 1960. Considera-se um híbrido do bolero (sobre tudo, o bolero rítmico) com outras influências musicais como por exemplo o chá-chá-chá e o tango.',
              professor:'Mariana Silva',
              open: false
            },
            { 
              id: 4,
              name: 'High Heels',
              img: '/assets/media/modalidades_highheels.png',
              classColor: '#DF1552',
              days:[
                {name:'SEG', time:'20h00'},
                {name:'SEG', time:'21h00'}
              ],
              description:'A Bachata é uma dança originada da República Dominicana na década de 1960. Considera-se um híbrido do bolero (sobre tudo, o bolero rítmico) com outras influências musicais como por exemplo o chá-chá-chá e o tango.',
              professor:'Pedro Silva',
              open: false
            },
            { 
              id: 5,
              name: 'Kizomba',
              img: '/assets/media/modalidades_kizomba.png',
              classColor: '#DD664D',
              days:[
                {name:'TER', time:'20h00'},
                {name:'TER', time:'21h00'}
              ],
              description:'A Bachata é uma dança originada da República Dominicana na década de 1960. Considera-se um híbrido do bolero (sobre tudo, o bolero rítmico) com outras influências musicais como por exemplo o chá-chá-chá e o tango.',
              professor:'Miguel Silva',
              open: false
            },
            { 
              id: 6,
              name: 'Latinas',
              img: '/assets/media/modalidades_latinas.png',
              classColor: '#A72901',
              days:[
                {name:'SEG', time:'19h00'},
                {name:'QUI', time:'20h00'}
              ],
              description:'A Bachata é uma dança originada da República Dominicana na década de 1960. Considera-se um híbrido do bolero (sobre tudo, o bolero rítmico) com outras influências musicais como por exemplo o chá-chá-chá e o tango.',
              professor:'Guilherme Silva',
              open: false
            },
            { 
              id: 7,
              name: 'Latinas Kids',
              img: '/assets/media/modalidades_latinaskids.png',
              classColor: '#FF630C',
              days:[
                {name:'SEG', time:'18h15'},
                {name:'QUI', time:'18h15'} 
              ],
              description:'A Bachata é uma dança originada da República Dominicana na década de 1960. Considera-se um híbrido do bolero (sobre tudo, o bolero rítmico) com outras influências musicais como por exemplo o chá-chá-chá e o tango.',
              professor:'Guilherme Silva',
              open: false
            },
            { 
              id: 8,
              name: 'Pop Dance',
              img: '/assets/media/modalidades_popdance.png',
              classColor: '#55ADFF',
              days:[
                {name:'SAB', time:'11h00'},
                {name:'SAB', time:'12h00'}
              ],
              description:'A Bachata é uma dança originada da República Dominicana na década de 1960. Considera-se um híbrido do bolero (sobre tudo, o bolero rítmico) com outras influências musicais como por exemplo o chá-chá-chá e o tango.',
              professor:'Guilherme Silva',
              open: false
            },
            { 
              id: 9,
              name: 'Salsa',
              img: '/assets/media/modalidades_salsa.png',
              classColor: '#4BCD4A',
              days:[
                {name:'QUA', time:'21h15'},
                {name:'SEX', time:'21h00'}
              ],
              description:'A Bachata é uma dança originada da República Dominicana na década de 1960. Considera-se um híbrido do bolero (sobre tudo, o bolero rítmico) com outras influências musicais como por exemplo o chá-chá-chá e o tango.',
              professor:'Guilherme Silva',
              open: false
            },
        ]
      }
      
    },
    template: 
    /*html*/
    `
        <div class="grid-1">
            <div v-for="modalidade in modalidades" :key="modalidade.id" :modalidade="modalidade" :open="modalidade.open"  @click="isOpen = !isOpen"><!--@toggleOpen="toggleOpen"-->
                <div  class="subgrid-2-auto">
                    <div  class="modalidades-info">
                      <div class="subgrid-2-item-auto modalidade-title">
                          <h4>{{ modalidade.name }}</h4>
                          <span class="dot" :style="{backgroundColor: modalidade.classColor}"></span>
                      </div>
                      <div v-for="day in modalidade.days" class="subgrid-3-item-auto">
                          <p>{{ day.name }}</p>
                          <span>&#8212;</span>
                          <span>{{ day.time }}</span>
                      </div>
                    </div>
                    <div class="modalidade-img-card" >
                        <img class="modalidades-img" :src="modalidade.img"><!--:style="{borderColor: modalidade.classColor,backgroundColor: modalidade.classColor}"-->
                    </div>
                    
                    
                </div>
                <div class="accordionInfo open" v-show="isOpen">
                  <div class="subgrid-2-item-large-auto">
                      <p :style="{color: modalidade.classColor}">Professor(a)</p>
                      <span >{{ modalidade.professor }}</span>
                  </div>
                  <p>{{ modalidade.description }}</p>
                </div>
            </div>
            
        </div>
    `,
    
    //methods: {
    //  toggleOpen: function (index) {
    //    this.modalidade = this.modalidade.map((modalidade, i) => {
    //      if (index === i) {
    //        modalidades.open = !modalidades.open;
    //      } 
    //      else {
    //        modalidades.open = false;
    //      }

    //      return modalidades;
    //    });
    //  },

    
    })