Vue.component('header-navigation', {
    props: [''],
    data: function () {
      return {
        sideNavIsActive: false,
        isScrolling: false,
        revealModal: false,
      }
    },

    created () {
      window.addEventListener('scroll', this.scrollHandler)
    },
    destroyed () {
      window.removeEventListener('scroll', this.scrollHandler)
    },

    methods: {

      toggleModal: function () {
        this.revealModal = !this.revealModal
      },
      
      toggleSideNav: function () {
        this.sideNavIsActive = !this.sideNavIsActive
      },

      scrollHandler: function () {
        if (window.pageYOffset > 50) {
          this.isScrolling = true
        } else {
          this.isScrolling = false
        }
      },
      
    }, 
    template: 
    /*html*/
    `
    <div>
      <header :class="{ 'is-scrolling': isScrolling }">
          <div class="container">
          <a href="/index.html"><img id="logo-mobile" src="/assets/media/souldance_logo_mobile.svg" alt="logo-mobile" width="40" height="auto"></a>
          <a href="/index.html"><img id="logo-horizontal" src="/assets/media/souldance_logo_horizontal.svg" alt="logo-horizontal" width="240" height="auto"></a>
              <nav class="is-active">
                  <a href="/school.html">escola</a>
                  <a href="/aboutus.html">sobre nós</a>
                  <a href="/pricing_desktop.html">Preçário</a>
                  <a href="/services.html">Serviços</a>
                  <a href="/contacts.html">Contactos</a>
                  <a class="button-negative" href="">Registar</a>
                  <a id="button-login-desktop" @click="toggleModal">Login</a>
              </nav>
              <button class="hamburger" :class="{ 'is-active': sideNavIsActive }" @click="toggleSideNav">
                  <div class="bar"></div>
              </button>
          </div>
      </header>
      <nav class="mobile-nav" :class="{ 'is-active': sideNavIsActive }">
        <div class="top">
          <a href="/school.html">Escola</a>
          <a href="/aboutus.html">Sobre nós</a>
          <a href="/pricing.html">Preçário</a>
          <a href="/services.html">Serviços</a>
          <a href="/contacts_mobile.html">Contactos</a>
        </div>
        <div class="bottom">
          <a href="/login.html">login</a>
          <a href="/register.html" class="button-negative">registo</a>
        </div>
      </nav>
      <login-desktop v-if="revealModal" :revealModal="revealModal"></login-desktop> 
    </div>
    `
    
  })