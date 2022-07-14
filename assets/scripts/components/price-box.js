Vue.component('pricing-box', {
  props: [],
  data: function () {
    return {
      modalidades:[
        { 
            id: 1,
            name: 'Bachata',
            img: '/assets/media/modalidades_bachata.png',
            classColor: '#FDA219',
            open: false,
            price: 32.90
          },
          { 
            id: 2,
            name: 'Ballet',
            img: '/assets/media/modalidades_ballet.png',
            classColor: '#FE94B9',
            open: false,
            price: 32.90
          },
          { 
            id: 3,
            name: 'Contemporâneo',
            img: '/assets/media/modalidades_contemporaneo.png',
            classColor: '#997FFF',
            open: false,
            price: 32.90
          },
          { 
            id: 4,
            name: 'High Heels',
            img: '/assets/media/modalidades_highheels.png',
            classColor: '#DF1552',
            open: false,
            price: 32.90
          },
          { 
            id: 5,
            name: 'Kizomba',
            img: '/assets/media/modalidades_kizomba.png',
            classColor: '#A72901',
            open: false,
            price: 32.90
          },
          { 
            id: 6,
            name: 'Latinas',
            img: '/assets/media/modalidades_latinas.png',
            classColor: '#DD664D',
            open: false,
            price: 32.90
          },
          { 
            id: 7,
            name: 'Latinas Kids',
            img: '/assets/media/modalidades_latinaskids.png',
            classColor: '#FF630C',
            open: false,
            price: 32.90
          },
          { 
            id: 8,
            name: 'Pop Dance',
            img: '/assets/media/modalidades_popdance.png',
            classColor: '#55ADFF',
            open: false,
            price: 32.90
          },
          { 
            id: 9,
            name: 'Salsa',
            img: '/assets/media/modalidades_salsa.png',
            classColor: '#4BCD4A',
            open: false,
            price: 32.90
          },
      ]
    }
  },
  template: 
  /*html*/
  ` 
    <section class="subgrid-2">
        <div class="price-box" :class="price-box-hover" v-for="modalidade in modalidades" :key="modalidade.id" :style="{borderColor: modalidade.classColor}"> 
            <h5>{{ modalidade.name }}</h5>
            <p class="class-schedule">TER | QUI | SEX</p>
            <span class="price">{{ modalidade.price }}0€/mês</span>
            <span class="add-price-list">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path :style="{fill: modalidade.classColor}" fill-rule="evenodd" clip-rule="evenodd" d="M7.41413 6L11.7071 1.707C12.0981 1.316 12.0981 0.684 11.7071 0.293C11.3161 -0.0979999 10.6841 -0.0979999 10.2931 0.293L6.00013 4.586L1.70713 0.293C1.31613 -0.0979999 0.684128 -0.0979999 0.293128 0.293C-0.0978721 0.684 -0.0978721 1.316 0.293128 1.707L4.58613 6L0.293128 10.293C-0.0978721 10.684 -0.0978721 11.316 0.293128 11.707C0.488128 11.902 0.744128 12 1.00013 12C1.25613 12 1.51213 11.902 1.70713 11.707L6.00013 7.414L10.2931 11.707C10.4881 11.902 10.7441 12 11.0001 12C11.2561 12 11.5121 11.902 11.7071 11.707C12.0981 11.316 12.0981 10.684 11.7071 10.293L7.41413 6Z" fill="black"/>
                </svg>
            </span>
        </div>
        
    </section>
    `,
    
    
  })