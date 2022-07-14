Vue.component('schedule-desktop-2', {
    props: [],
    data: function () {
      return {
        modalidadeHover:[
          { 
            id: 4,
            backgroundColor: null,
            timeTextColor: null,
            titleTextColor: '#DD664D',
            dim: false
          },
          {
            id: 2,
            backgroundColor: null,
            timeTextColor: null,
            titleTextColor: '#A72901',
            dim: false
          },
          {
            id: 7,
            backgroundColor: null,
            timeTextColor: null,
            titleTextColor: '#4BCD4A',
            dim: false
          },
          {
            id: 9,
            backgroundColor: null,
            timeTextColor: null,
            titleTextColor: '#55ADFF',
            dim: false
          },
          {
            id: 3,
            backgroundColor: null,
            timeTextColor: null,
            titleTextColor:'#DF1552',
            dim: false
          },
          {
            id: 1,
            backgroundColor: null,
            timeTextColor: null,
            titleTextColor: '#A72901',
            dim: false
          },
          {
            id: 5,
            backgroundColor: null,
            timeTextColor: null,
            titleTextColor: '#FE94B9',
            dim: false
          },
          {
            id: 6,
            backgroundColor: null,
            timeTextColor: null,
            titleTextColor: '#FDA219',
            dim: false
          },
          {
            id: 8,
            backgroundColor: null,
            timeTextColor: null,
            titleTextColor: '#997FFF',
            dim: false
          },
          
        ],
        days:[
          {
            name:'SEG',
            aulas:[
                {
                  idModalidade:1,
                  name: 'Latinas Kids I',
                  classColor: '#A72901',
                  time: '18h15'
                },
                {
                  idModalidade:2,
                  name: 'Latinas I',
                  classColor: '#DD664D',
                  time: '19h00'
                },
                {
                  idModalidade:3,
                  name: 'High Heels I',
                  classColor: '#DF1552',
                  time: '20h00'
                },
                {
                  idModalidade:3,
                  name: 'High Heels I',
                  classColor: '#DF1552',
                  time: '21h00'
                },
            ]
          },
          {
            name:'TER',
            aulas:[
                {
                  idModalidade:4,
                  name: 'Kizomba I',
                  classColor: '#A72901',
                  time: '20h00'
                },
                {
                  idModalidade:4,
                  name: 'Kizomba II',
                  classColor: '#A72901',
                  time: '21h00'
                },
            ]
          },
          {
            name: 'QUA',
            aulas:[
                {
                  idModalidade:5,
                  name: 'Ballet I',
                  classColor: '#FE94B9',
                  time: '19h00'
                },
                {
                  idModalidade:6,
                  name: 'Bachata I',
                  classColor: '#FDA219',
                  time: '20h00'
                },
                {
                  idModalidade:7,
                  name: 'Salsa II',
                  classColor: '#4BCD4A',
                  time: '21h15'
                },
            ]
          },
          {
            name:'QUI',
            aulas:[
                {
                  idModalidade:1,
                  name: 'Latinas Kids I',
                  classColor: '#A72901',
                  time: '18h15'
                },
                {
                  idModalidade:2,
                  name: 'Latinas I',
                  classColor: '#DD664D',
                  time: '20h00'
                },
                {
                  idModalidade:3,
                  classColor: '#DF1552',
                  name: 'High Heels I',
                  time: '21h00'
                },
            ]
          },
          {
            name:'SEX',
            aulas:[
                {
                  idModalidade:8,
                  name: 'Contemporâneo I',
                  classColor: '#997FFF',
                  time: '18h00'
                },
                {
                  idModalidade:5,
                  name: 'Ballet II',
                  classColor: '#FE94B9',
                  time: '19h00'
                },
                {
                  idModalidade:6,
                  name: 'Bachata II',
                  classColor: '#FDA219',
                  time: '20h00'
                },
                {
                  idModalidade:7,
                  name: 'Salsa I',
                  classColor: '#4BCD4A',
                  time: '21h00'
                },
            ]
          },
          {
            name:'SAB',
            aulas:[
                {
                  idModalidade:9,
                  name: 'Pop Dance I',
                  classColor: '#55ADFF',
                  time: '11h00'
                },
                {
                  idModalidade:9,
                  name: 'Pop Dance II',
                  classColor: '#55ADFF',
                  time: '12h00'
                }
            ]
          }
        ],
        test:[
          {
            id: 3,
            status:false,
          },
          {
            id: 8,
            status:false,
          },
          {
            id: 311,
            status:false,
          },
          {
            id: 9,
            status:false,
          },
        ],
      }
    },

    methods: {
      setModalidadeHover(idModalidade, backgroundColor, titleTextColor, timeTextColor, dimBool){
        this.modalidadeHover[this.indetifierModalidadeHover(idModalidade)].backgroundColor = backgroundColor; 
        this.modalidadeHover[this.indetifierModalidadeHover(idModalidade)].titleTextColor = titleTextColor;
        this.modalidadeHover[this.indetifierModalidadeHover(idModalidade)].timeTextColor = timeTextColor;

        if (dimBool) {
          for (let i = 0; i < this.modalidadeHover.length; i++)
            if (this.modalidadeHover[i].id != idModalidade)
              this.modalidadeHover[i].dim = true;
        } else {
          for (let i = 0; i < this.modalidadeHover.length; i++)
            this.modalidadeHover[i].dim = false;
        }

      },
      
      indetifierModalidadeHover(idModalidade) {
        for (let i = 0; i < this.modalidadeHover.length; i++)
          if (this.modalidadeHover[i].id === idModalidade)
            return i;
      },
      
    },

    template: 
    /*html*/
    `
        <div class="schedule-desktop grid-1">
          <div class="subgrid-6">
            <div class="grid" v-for="(day, index) in days" :key="index">
              <p>{{ day.name }}</p>
            </div>  
          </div>

          <div class="subgrid-6">
            <div v-for="(day, index) in days" :key="index">
                  <div class="grid" v-for="(aula, index) in day.aulas" :key="index"> 
                      <div class="subgrid" :style="{borderColor: aula.classColor, backgroundColor: modalidadeHover[indetifierModalidadeHover(aula.idModalidade)].backgroundColor, color: modalidadeHover[indetifierModalidadeHover(aula.idModalidade)].timeTextColor}" :class="{ 'subgrid-dim': modalidadeHover[indetifierModalidadeHover(aula.idModalidade)].dim }" @mouseover="setModalidadeHover(aula.idModalidade, aula.classColor, 'white' , 'white', true )" @mouseleave="setModalidadeHover(aula.idModalidade, null , aula.classColor , null , false)">
                          <p :style="{color: modalidadeHover[indetifierModalidadeHover(aula.idModalidade)].titleTextColor}">{{ aula.name }}</p>
                          <p>{{ aula.time }}</p>
                      </div>
                  </div>
            </div>
          </div>
        </div>
    `,
    
    })