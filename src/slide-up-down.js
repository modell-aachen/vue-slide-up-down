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

  created() {
    this.observer = new MutationObserver(this.layout);
  },

  mounted () {
    this.observer.observe( this.$el, { subtree: true, childList: true } );
    window.addEventListener('resize', this.layout);
    Vue.nextTick(() => {
      this.isMounted = true
      this.layout();
    })
  },

  destroyed () {
    this.observer.disconnect();
    delete( this.observer );
    window.removeEventListener('resize', this.layout);
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

        setTimeout(function(){
          container.style.overflow = 'initial'
        }, this.duration)

        // call this explicitely to force a new layout
        this.offsetHeight = container.offsetHeight
      } else {
        container.style.overflow = 'hidden'
        this.maxHeight = 0
      }
    }
  }
}
