export default {
  beforeMount(el, binding) {
    // v-icon="'headphones-alt'"
    let iconClass = `fa fa-${binding.value} float-right text-2xl`;

    // use directive arguments to allow us to replace the full iconClass values
    if (binding.arg === 'full') {
      iconClass = binding.value;
    }

    // use directive modifiers to allow us to modify parts of the iconClass
    if (binding.modifiers.yellow) {
      iconClass += ' text-yellow-400';
    } else {
      // default to green if no colour specified
      iconClass += ' text-green-400';
    }

    // eslint-disable-next-line no-param-reassign
    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
