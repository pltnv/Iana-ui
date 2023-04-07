export default {
  install: (app) => {
    app.directive("click-outside", {
      beforeMount: (el, binding) => {
        el.clickOutsideEvent = (e) => {
          if (!(el === e.target || el.contains(e.target))) {
            binding.value(e);
          }
        };
        document.addEventListener("click", el.clickOutsideEvent);
      },
      unmounted: (el) => {
        document.removeEventListener("click", el.clickOutsideEvent);
      }
    });
  }
};
