Vue.component('cart', {
  props: ['modalidade'],
  data: function () {
    return {
      props: ['modalidades'],
      modalidades:[
        { 
            id: 1,
            name: 'Bachata',
            img: '/assets/media/modalidades_bachata.png',
            classColor: '#FDA219',
            open: false
          },
      ],
      message: 'Hellow'
    }
  },
  template: 
  /*html*/
  ` 
    
        <div class="price-calculator-box">
            <div class="price-calculator">
                <h6>Items</h6>

                <div class="price-calculator-list">
                    <div class="price-calculator-list-item-promo">
                        <span class="promo-tag">Promo</span>
                        <h6>Salsa</h6>
                        <span class="price-strike">€32.90</span>
                        <span class="price">€24.90</span>
                        <span class="remove-item">
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="$salsa" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.41413 6L11.7071 1.707C12.0981 1.316 12.0981 0.684 11.7071 0.293C11.3161 -0.0979999 10.6841 -0.0979999 10.2931 0.293L6.00013 4.586L1.70713 0.293C1.31613 -0.0979999 0.684128 -0.0979999 0.293128 0.293C-0.0978721 0.684 -0.0978721 1.316 0.293128 1.707L4.58613 6L0.293128 10.293C-0.0978721 10.684 -0.0978721 11.316 0.293128 11.707C0.488128 11.902 0.744128 12 1.00013 12C1.25613 12 1.51213 11.902 1.70713 11.707L6.00013 7.414L10.2931 11.707C10.4881 11.902 10.7441 12 11.0001 12C11.2561 12 11.5121 11.902 11.7071 11.707C12.0981 11.316 12.0981 10.684 11.7071 10.293L7.41413 6Z" fill="black"/>
                            </svg>
                        </span>
                    </div>
                    <div class="price-calculator-list-item">
                        <h6>Salsa</h6>
                        <span class="price">€32.90</span>
                        <span class="remove-item">
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="$salsa" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.41413 6L11.7071 1.707C12.0981 1.316 12.0981 0.684 11.7071 0.293C11.3161 -0.0979999 10.6841 -0.0979999 10.2931 0.293L6.00013 4.586L1.70713 0.293C1.31613 -0.0979999 0.684128 -0.0979999 0.293128 0.293C-0.0978721 0.684 -0.0978721 1.316 0.293128 1.707L4.58613 6L0.293128 10.293C-0.0978721 10.684 -0.0978721 11.316 0.293128 11.707C0.488128 11.902 0.744128 12 1.00013 12C1.25613 12 1.51213 11.902 1.70713 11.707L6.00013 7.414L10.2931 11.707C10.4881 11.902 10.7441 12 11.0001 12C11.2561 12 11.5121 11.902 11.7071 11.707C12.0981 11.316 12.0981 10.684 11.7071 10.293L7.41413 6Z" fill="black"/>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            <div>

                <h6>Total</h6>
                <hr style="margin-top:20px;margin-bottom:20px">
                <div class="price-result">
                    <span class="price">€57.80</span>
                </div>

                <div class="section-link">
                    <a class="button-purple" href="">Continuar</a>
                </div>

            </div>
        </div>

        <div class="pricing-disclaimer">
            <p class="text-center">Este procedimento registará a aula na sua conta, contudo o pagamento será feito posteriormente à aprovação da mesma. Se estiver com dificuldades na inscrição da aula contacte info@souldance.com.pt</p>
        </div>
    

   
    `,

    methods: {
    
      

    }
  })