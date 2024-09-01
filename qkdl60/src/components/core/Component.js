export default class Component {
  state;
  $target;
  constructor($target, state) {
    this.$target = $target;
    this.state = state;
    this.render();
    this.setup();
  }
  template() {
    return '';
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  mounted() {}
  setup() {}
}
