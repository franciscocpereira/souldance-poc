Vue.component('bottom-navigation', {
    props: [],
    template: 
    /* html */
    `
    <footer class="footer">
      <div class="footer-info-1">
        <div class="">
          <img class="logo-icon" src="/assets/media/souldance_logo_icon.svg" />
        </div>
        <div class="">
          <p
            >Souldance<br />
            © 2021 All rights reserved.</p
          >
        </div>
      </div>
      <div class="footer-info-2">
        <div class="footer-info-2-div">
          <h3>Contactos</h3>
          <span class="span-500">T: </span
          ><span class="span-300">+351 918 526 395</span>
          <div>
            <span class="span-500">Email: </span
            ><span class="span-300">info@souldance.pt</span>
          </div>
        </div>
        <div class="footer-info-2-div">
          <h3>Morada</h3>
          <p
            >Espaço "Casa Animada",<br />
            Av. 25 de Abril 17, 2745-832 Queluz</p
          >
        </div>
        <div class="footer-info-2-div">
          <h3 id="footer-social-h3">Social</h3>
          <div class="footer-bottom-social">
            <img class="icon" src="/assets/media/icons/insta.svg" />
            <img class="icon" src="/assets/media/icons/facebook.svg" />
          </div>
        </div>
      </div>
    </footer>
    `
  })