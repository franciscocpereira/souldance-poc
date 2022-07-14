Vue.component('schedule', {
    props: ['modalidade', 'index', 'open'],
    data: function () {
      return {
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
              professor:'Mariana Silva'
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
              professor:'João Silva'
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
              professor:'Mariana Silva'
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
              professor:'Pedro Silva'
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
              professor:'Miguel Silva'
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
              professor:'Guilherme Silva'
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
              professor:'Guilherme Silva'
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
              professor:'Guilherme Silva'
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
              professor:'Guilherme Silva'
            },
        ]
      }
      
    },
    template: 
    /*html*/
    `
        <div class="schedule grid-1" >
            <div>
                <div class="subgrid-6">
                    <p>SEG.</p>
                    <p>TER.</p>
                    <p>QUA.</p>
                    <p>QUI.</p>
                    <p>SEX.</p>
                    <p>SAB.</p>
                </div>
            </div>
            <div>
                <div class="subgrid-6" >
                    <div>
                        <p class="latinas-kids">L KIDS I</p>
                        <span>18h15</span>
                    </div>
                    <div>
                        <p class="kizomba">KIZ I</p>
                        <span>20H00</span>
                    </div>
                    <div>
                        <p class="ballet">BALL I</p>
                        <span>19h00</span>
                    </div>
                    <div>
                        <p class="latinas-kids">L KIDS I</p>
                        <span>18h15</span>
                    </div>
                    <div>
                        <p class="contemporaneo">CONT</p>
                        <span>18h00</span>
                    </div>
                    <div>
                        <p class="pop-dance">POP D I</p>
                        <span>11h00</span>
                    </div>
                    
                </div>
            </div>
            <div>
                <div class="subgrid-6" >
                    <div>
                        <p class="latinas">LAT</p>
                        <span>19h00</span>
                    </div>
                    <div>
                        <p class="kizomba">KIZ II</p>
                        <span>21h00</span>
                    </div>
                    <div>
                        <p class="bachata">BACH I</p>
                        <span>20h00</span>
                    </div>
                    <div>
                        <p class="latinas">LAT</p>
                        <span>20h00</span>
                    </div>
                    <div>
                        <p class="ballet">BALL II</p>
                        <span>19h00</span>
                    </div>
                    <div>
                        <p class="pop-dance">POP D II</p>
                        <span>12h00</span>
                    </div>
                </div>
            </div>
            <div>
                <div class="subgrid-6" >
                    <div>
                        <p class="high-heels">HIGH</p>
                        <span>20h00</span>
                    </div>
                    <div>
                        
                    </div>
                    <div>
                        <p class="salsa">SAL II</p>
                        <span>21h15</span>
                    </div>
                    <div>
                        <p class="high-heels">HIGH</p>
                        <span>21h00</span>
                    </div>
                    <div>
                        <p class="bachata">BACH II</p>
                        <span>20h00</span>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
            <div>
                <div class="subgrid-6" >
                    <div>
                        <p class="high-heels">HIGH</p>
                        <span>21h00</span>
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>
                    <div>
                        <p class="salsa">SAL I</p>
                        <span>21h00</span>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
            
        </div>
    `,    
    })