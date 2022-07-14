Vue.component('pricing-list', {
  props: [],
  data: function () {
    return {
      modalidades:[
        { 
          name: 'Bachata', 
          id:1,
          color: '$bachata'
        },
        { 
          name: 'Ballet', 
          id:2,
          color: '$ballet'
        },
        { 
          name: 'Contemporâneo', 
          id:3,
          color: '$contemporaneo'
        },
        { 
          name: 'High Heels', 
          id:4,
          color: '$high-heels'
        },
        { 
          name: 'Kizomba', 
          id:5,
          color: '$kizomba'
        },
        { 
          name: 'Latinas', 
          id:6,
          color: '$latinas'
        },
        { 
          name: 'Latinas Kids', 
          id:7,
          color: '$latinas-kids'
        },
        { 
          name: 'Pop Dance', 
          id:8,
          color: '$pop-dance'
        },
        { 
          name: 'Salsa', 
          id:9,
          color: '$salsa'
        },
      ]
    }
  },
  template: 
  /*html*/
  `
    <div class="grid-1">
            <price-box></price-box>
            <div class="subgrid-2">
                <div class="subgrid">
                    
                </div>
            </div>         
    </div>
    `
  })