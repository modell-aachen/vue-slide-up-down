export default {
  name: 'SlideUpDown',

  props: {
    active: {
      type: Boolean,
      default:  true
    },
    duration: {
      type: Number,
      default: 500
    }
  },

  data: () => ({
    maxHeight: 0,
    offsetHeight: 0,
    isMounted: false,
    initialStateReached: false
  }),

  render (h) {
    return h(
      'div',
      {
        style: this.style,
        ref: 'container'
      },
      this.$slots.default
    )
  },

  mounted () {
    Vue.nextTick(() => {
      this.isMounted = true
      this.layout();
    })
  },

  watch: {
    active () {
      this.layout()
    }
  },

  computed: {
    style () {
      return {
        'transition': 'height '+this.duration + 'ms',
        'height': this.isMounted ? this.maxHeight : '0'
      }
    }
  },

  methods: {
    layout () {
      const { container } = this.$refs
      if (this.active) {
        const style = container.getAttribute('style')
        container.removeAttribute('style')
        this.offsetHeight = container.offsetHeight
        container.setAttribute('style', style)
        let self = this;
        requestAnimationFrame(function() {
          self.maxHeight = self.offsetHeight + 'px';
        });
        setTimeout(function(){
          container.style.overflow = 'initial';
          self.maxHeight = 'auto';
        }, this.duration)

        this.initialStateReached = true;
      } else {
        container.style.overflow = 'hidden';
        if( this.initialStateReached ) {
          container.style.height = this.offsetHeight + 'px';
          let self = this;
          requestAnimationFrame(function() {
            self.maxHeight = '0';
          });
        }
      }
    }
  }
}
