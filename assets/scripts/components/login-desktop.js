Vue.component('login-desktop', {
    props: [ 'revealModal' ],
    data: function () {
      return {
        revealModal: false,
      }
    },

    methods: {

      toggleModal: function () {
        this.revealModal = !this.revealModal;
      },
      
      function(e){
        if(this.revealModal = true && e.target == document.getElementByClassName("modal-container"))  {
          document.getElementByClassName("modal-container").style.display = "none";
        }
        else {
          revealModal = false;
        }
      },

      closeModalOutside() {

        if (this.revealModal = true && document.getElementById("app").addEventListener('click') == document.getElementByClassName('modal-body')) {
            this.revealModal = true;
        }
          else {
              this.revealModal = false;
          }
      },

    },

    template: 
    /* html */
    `
    <div class="modal-container" v-if="revealModal" @click="$emit('close')"> 
        <div id="login-modal" class="modal">
            <div class="modal-body" @click.stop>
              <div class="modal-close">
                <a class="close" @click="toggleModal">
                    <svg width="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.41413 6L11.7071 1.707C12.0981 1.316 12.0981 0.684 11.7071 0.293C11.3161 -0.0979999 10.6841 -0.0979999 10.2931 0.293L6.00013 4.586L1.70713 0.293C1.31613 -0.0979999 0.684128 -0.0979999 0.293128 0.293C-0.0978721 0.684 -0.0978721 1.316 0.293128 1.707L4.58613 6L0.293128 10.293C-0.0978721 10.684 -0.0978721 11.316 0.293128 11.707C0.488128 11.902 0.744128 12 1.00013 12C1.25613 12 1.51213 11.902 1.70713 11.707L6.00013 7.414L10.2931 11.707C10.4881 11.902 10.7441 12 11.0001 12C11.2561 12 11.5121 11.902 11.7071 11.707C12.0981 11.316 12.0981 10.684 11.7071 10.293L7.41413 6Z" fill="black"/>
                    </svg>
                </a>
              </div>
              <div class="grid-1">
                <div class="modal-title">
                    <h2>Login</h2>
                </div>

                <form class="grid-1">
                  <div class="subgrid">
                      <h6>Email*</h6>
                      <div class="">
                          <input type="text" placeholder="example@address.com" required></input>
                      </div>
                  </div>

                  <div class="subgrid">
                      <h6>Password*</h6>
                      <div class="">
                          <input type="text" placeholder="password" required></input>
                      </div>
                  </div>
                </form>
                <div class="section-link">
                      <div class="text-center">
                        <a class="line-link" href="">Esqueceu a sua password?</a>
                      </div>
                      <div class="text-center">
                        <a class="button-purple" href="">Entrar</a>
                      </div>
                </div>
              </div>
            </div>

            
            </div>
        </div>
    </div>
    `,
    
  })