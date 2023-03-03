<template>
  <div
    class="i-accordion"
    :style="{ width: `${width}px`, borderRadius: `${round}px` }"
  >
    <div
      class="i-accordion__title"
      :class="{ 'i-accordion__title--opened': alwaysOpened || showAccordion }"
      @click="toggleAccordion"
    >
      <span v-text="title" />
      <div
        class="chevron"
        :class="{ 'chevron--up': alwaysOpened ? '' : showAccordion }"
      >
        <i class="mdi mdi-chevron-down" />
      </div>
    </div>
    <transition name="accordion">
      <div v-if="showAccordion || alwaysOpened">
        <template v-if="$slots.default">
          <slot />
        </template>
        <div
          v-else-if="content"
          v-text="content"
          class="i-accordion__content"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "IAccordion",
  props: {
    id: String,
    title: String,
    width: {
      type: String,
      default: "200"
    },
    alwaysOpened: Boolean,
    content: String,
    round: String
  },

  setup(props, { emit }) {
    let showAccordion = ref(false);

    const toggleAccordion = () => {
      showAccordion.value = !showAccordion.value;
      console.log(showAccordion.value);
    };

    return { showAccordion, toggleAccordion };
  }
};
</script>

<style lang="scss">
.i-accordion {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 2px;

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 0.1px solid transparent;
    cursor: pointer;

    &--opened {
      border-bottom: 0.1px solid rgba(10, 10, 10, 0.1);
    }

    .chevron {
      transition: all 0.1s linear;

      &--up {
        transform: rotate(180deg);
      }
    }
  }

  &__content {
    padding: 10px;
    opacity: 1;
  }

  .accordion-enter-active,
  .i-accordion-leave-active {
    transition: opacity 0.4s ease-in-out;
  }

  .accordion-enter-from,
  .accordion-leave-to {
    height: 0;
    opacity: 1;
  }
}
</style>
