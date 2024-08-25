export default class Component {
  state;
  $target;
  constructor($target, state) {
    this.$target = $target;
    this.state = state;
    this.render();
  }
  template() {
    return '';
  }
  setState(nextState) {
    this.state = { ...this.state, nextState };
    this.render();
  }
  render() {
    this.$target.innerHTML = this.$target.innerHTML + this.template();
    this.mounted();
  }
  mounted() {}
}
