// Dependencies: Vue, HammerJS (touch library), & Lodash debounce function
// Full tutorial available at
// https://medium.com/@elenaczubiak/swipe-navigation-carousel-for-vue-tutorial-d647b7dc7174

const app = new Vue({
  el: "#app",

  data: {
    // items: ["red", "orange", "yellow", "green", "blue", "purple"], // IDs for all items
    items: [
      { 
        id: 1,
        name: 'Bachata',
        bgImageUrl: '/assets/media/modalidades_bachata.png',
        scheduleDaysAbreviation: 'QUA | SEX',
        open: false
      },
      { 
        id: 2,
        name: 'Ballet',
        bgImageUrl: '/assets/media/modalidades_ballet.png',
        scheduleDaysAbreviation: 'QUA | SEX',
        open: false
      },
      { 
        id: 3,
        name: 'Contemporâneo',
        bgImageUrl: '/assets/media/modalidades_contemporaneo.png',
        scheduleDaysAbreviation: 'QUA | SEX',
        open: false
      },
      { 
        id: 4,
        name: 'High Heels',
        bgImageUrl: '/assets/media/modalidades_highheels.png',
        scheduleDaysAbreviation: 'QUA | SEX',
        open: false
      },
      { 
        id: 5,
        name: 'Kizomba',
        bgImageUrl: '/assets/media/modalidades_kizomba.png',
        scheduleDaysAbreviation: 'QUA | SEX',
        open: false
      },
      { 
        id: 6,
        name: 'Latinas',
        bgImageUrl: '/assets/media/modalidades_latinas.png',
        scheduleDaysAbreviation: 'QUA | SEX',
        open: false
      },
      { 
        id: 7,
        name: 'Latinas Kids',
        bgImageUrl: '/assets/media/modalidades_latinaskids.png',
        scheduleDaysAbreviation: 'QUA | SEX',
        open: false
      },
      { 
        id: 8,
        name: 'Pop Dance',
        bgImageUrl: '/assets/media/modalidades_pop.png',
        scheduleDaysAbreviation: 'QUA | SEX',
        open: false
      },
      { 
        id: 9,
        name: 'Salsa',
        bgImageUrl: '/assets/media/modalidades_salsa.png',
        scheduleDaysAbreviation: 'QUA | SEX',
        open: false
      },
    ],
    isInfiniteLoop: true,
    prefersReducedMotion: false,
    currentIndex: 0,
    upcomingIndex: 0,
    translateX: 0,
    maxTranslateX: 0,
    transformStyle: "translateX(0)",
    transitionClass: "transition-initial",
    isTransitioning: false,
    leftEdgeScale: 0,
    rightEdgeScale: 0,
    showInfo: true
  },

  computed: {
    // Returns array of objects with id & key for each item
    // For the v-for loop, each slide needs a stable and unique key
    infoItems() {
      let arr = [...this.items];
      // If there are only 2 items, double array to always have odd number in renderedItems
      if (arr.length === 2) {
        arr = [...arr, ...arr];
      }

      const result = arr.map((obj, index) => ({
        id: obj.id,
        name: obj.name,
        bgImageUrl: obj.bgImageUrl,
        scheduleDaysAbreviation: obj.scheduleDaysAbreviation,
        key: `${obj.name}-${index}`
      }));

      console.log(result)
      return result
    },

    // Return array of objects for the 3 items to be rendered in the DOM at the moment
    // Includes the previous, current, and next slides
    renderedItems() {
      const { currentIndex: i, infoItems } = this;

      if (infoItems.length === 1) {
        return [infoItems[0]];
      }

      const lastIndex = infoItems.length - 1;
      const prevIndex = i === 0 ? lastIndex : i - 1;
      const nextIndex = i === lastIndex ? 0 : i + 1;

      return [infoItems[prevIndex], infoItems[i], infoItems[nextIndex]];
    },

    isNextAvailable() {
      const { items, currentIndex, isInfiniteLoop } = this;
      return (
        currentIndex < items.length - 1 ||
        (isInfiniteLoop && items.length !== 1)
      );
    },

    isPreviousAvailable() {
      const { items, currentIndex, isInfiniteLoop } = this;
      return currentIndex > 0 || (isInfiniteLoop && items.length !== 1);
    }
  },

  mounted() {
    // Set up Hammer element & event listeners to respond to swiping gestures
    const touchContainer = document.getElementById("touch-container");
    const hammer = new Hammer.Manager(touchContainer, {
      recognizers: [
        [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }],
        [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]
      ]
    });
    hammer.on("pan swipe", this.handleTouchEvents);

    // Set up event listeners for when items are transitioning across the screen
    const itemsContainer = document.getElementById("rendered-items-flexbox");

    itemsContainer.addEventListener("transitionstart", (e) => {
      if (e.target === itemsContainer) {
        this.isTransitioning = true;
      }
    });
    itemsContainer.addEventListener("transitionend", (e) => {
      if (e.target === itemsContainer) {
        this.updateCurrentItem();
     	}
    });

    // For users who prefer reduced motion, can't rely on transition to change items
    this.prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  },

  methods: {
    handleTouchEvents(e) {
      const {
        isTransitioning,
        translateX,
        leftEdgeScale,
        rightEdgeScale,
        isPreviousAvailable,
        isNextAvailable
      } = this;
      const { deltaX, deltaY, isFinal } = e;

      // While card is transitioning, don't respond to events
      if (isTransitioning) {
        return;
      }

      // Don't respond to gestures that are more vertical than horizontal
      // (browser will handle vertical scroll)
      // Unless the gesture started horizontal, then respond as normal
      if (
        (Math.abs(deltaX) < 8 || Math.abs(deltaY) - Math.abs(deltaX) > -1) &&
        !translateX &&
        !leftEdgeScale &&
        !rightEdgeScale
      ) {
        return;
      }

      if (
        (!isPreviousAvailable && deltaX > 0) ||
        (!isNextAvailable && deltaX < 0)
      ) {
        this.updateEdgeEffect(deltaX, isFinal);
      } else if (isFinal) {
        this.handleGestureEnd(deltaX);
      } else {
        this.handleGestureMove(deltaX);
      }
    },

    handleGestureMove(deltaX) {
      const { maxTranslateX } = this;

      // Record farthest distance in one direction so can check if gesture goes in
      // opposite direction, indicating user doesn't want to change slides
      if (Math.abs(deltaX) > Math.abs(maxTranslateX)) {
        this.maxTranslateX = deltaX;
      }

      // Move items by deltaX amount
      this.translateX = deltaX;
      this.transitionClass = "transition-initial";
      this.transformStyle = `translateX(${deltaX}px)`;
    },

    handleGestureEnd() {
      const { translateX, maxTranslateX } = this;

      if (Math.abs(translateX) - Math.abs(maxTranslateX) < -1) {
        // If gesture goes too much in oposite direction, stay on current slide
        this.transitionClass = 'transition-item';
        this.transformStyle = 'translateX(0)';
      } else if (translateX > 0) {
        this.previous();
      } else if (translateX < 0) {
        this.next();
      }
    },

    updateEdgeEffect(deltaX = 0, isFinal = false) {
      if (isFinal) {
        this.transitionClass = "transition-edge";
        this.leftEdgeScale = 0;
        this.rightEdgeScale = 0;
      } else {
        this.transitionClass = "transition-initial";
        const scaleVal = Math.min(0.2 + Math.abs(deltaX) / 50, 1);
        if (deltaX > 0) {
          this.leftEdgeScale = scaleVal;
        }
        if (deltaX < 0) {
          this.rightEdgeScale = scaleVal;
        }
      }
    },

    // Debounce previous & next functions so only triggered by individual gestures
    previous: _.debounce(
      function() {
        if (this.isTransitioning) {
          return;
        }

        if (!this.isPreviousAvailable) {
          this.updateEdgeEffect(100, false);
          setTimeout(() => {
            this.updateEdgeEffect(0, true);
          }, 100);
          return;
        }

        const { currentIndex, items, prefersReducedMotion } = this;

        this.transitionClass = "transition-item";
        this.transformStyle = "translateX(100vw)";

        const prevIndex =
          currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        this.upcomingIndex = prevIndex;

        if (prefersReducedMotion) {
          this.updateCurrentItem();
        }
      },
      100,
      { leading: true, trailing: false }
    ),

    // Respond to "next" navigation request
    // Figure out which card is next and call updateCurrentItem
    next: _.debounce(
      function() {
        if (this.isTransitioning) {
          return;
        }

        if (!this.isNextAvailable) {
          this.updateEdgeEffect(-100, false);
          setTimeout(() => {
            this.updateEdgeEffect(0, true);
          }, 100);
          return;
        }

        const { currentIndex, items, prefersReducedMotion } = this;

        this.transitionClass = "transition-item";
        this.transformStyle = "translateX(-100vw)";

        const nextIndex =
          currentIndex === items.length - 1 ? 0 : currentIndex + 1;
        this.upcomingIndex = nextIndex;

        if (prefersReducedMotion) {
          this.updateCurrentItem();
        }
      },
      100,
      { leading: true, trailing: false }
    ),

    // If using Vue Router or Vuex, can put that logic here instead of just changing local state
    updateCurrentItem() {
      this.currentIndex = this.upcomingIndex;
      this.resetTranslate();
    },

    resetTranslate() {
      this.isTransitioning = false;
      this.transitionClass = "transition-initial";
      this.transformStyle = "translateX(0)";
      this.translateX = 0;
      this.maxTranslateX = 0;
    }
  }

});
