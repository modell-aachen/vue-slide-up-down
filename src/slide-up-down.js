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
    isMounted: false
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
        height: this.isMounted ? this.maxHeight + 'px' : 'auto'
      }
    }
  },

  methods: {
    layout () {
      const { container } = this.$refs

      if (this.active) {
        const style = container.getAttribute('style')
        container.removeAttribute('style')
        this.maxHeight = container.offsetHeight
        container.setAttribute('style', style)
        let self = this;
        requestAnimationFrame(function() {
            container.style.height = self.maxHeight + 'px';
        });
        setTimeout(function(){
          container.style.overflow = 'initial';
          container.style.height = 'auto';
        }, this.duration)

        // call this explicitely to force a new layout
        this.offsetHeight = container.offsetHeight
      } else {
        let self = this;
        requestAnimationFrame(function() {
            container.style.height = self.maxHeight + 'px';
            requestAnimationFrame(function() {
                container.style.overflow = 'hidden'
                container.style.height = 0 + 'px';
            });
        });
      }
    }
  }
}
