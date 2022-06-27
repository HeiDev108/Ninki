export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value.icon} text-2xl`;

    if (binding.value.right) {
      iconClass += ' float-right';
    }

    // use directive modifiers to allow us to modify parts of the iconClass
    if (binding.modifiers.blue) {
      iconClass += ' text-blue-400';
    } else {
      // default to green if no colour specified
      iconClass += ' text-green-400';
    }

    // eslint-disable-next-line no-param-reassign
    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
