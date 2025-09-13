<template>
  <div
    class="i-accordion"
    :style="{
      width: block ? '100%' : `${width}px`,
      borderRadius: `${round}px`
    }"
  >
    <div
      class="i-accordion__title"
      :class="{ 'i-accordion__title--opened': alwaysOpened || isOpen }"
      @click="toggleAccordion"
    >
      <span class="i-accordion__text">{{ title }}</span>
      <div class="chevron" :class="{ 'chevron--up': alwaysOpened || isOpen }">
        <i class="mdi mdi-chevron-down" />
      </div>
    </div>

    <transition name="accordion">
      <div v-if="isOpen || alwaysOpened" class="i-accordion__body">
        <slot v-if="$slots.default" />
        <p v-else-if="content" class="i-accordion__content">{{ content }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  id: String,
  title: { type: String, required: true },
  width: { type: [String, Number], default: "300" },
  alwaysOpened: { type: Boolean, default: false },
  content: { type: String, default: "" },
  round: { type: [String, Number], default: 12 },
  block: { type: Boolean, default: false }
});

const emit = defineEmits(["toggle"]);

const isOpen = ref(false);

const toggleAccordion = () => {
  if (!props.alwaysOpened) {
    isOpen.value = !isOpen.value;
    emit("toggle", isOpen.value);
  }
};
</script>

<style scoped lang="scss">
.i-accordion {
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 6px;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    user-select: none;
    color: #333;

    &--opened {
      background: #f8f9fa;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }

    .chevron {
      transition: transform 0.25s ease;
      font-size: 20px;
      color: #666;

      &--up {
        transform: rotate(180deg);
      }
    }
  }

  &__body {
    background: #fff;
  }

  &__content {
    padding: 12px 16px;
    color: #555;
    font-size: 14px;
    line-height: 1.4;
  }

  /* Анимация */
  .accordion-enter-active,
  .accordion-leave-active {
    transition: max-height 0.3s ease, opacity 0.3s ease;
  }

  .accordion-enter-from,
  .accordion-leave-to {
    max-height: 0;
    opacity: 0;
  }

  .accordion-enter-to,
  .accordion-leave-from {
    max-height: 500px; /* ограничение для плавности */
    opacity: 1;
  }
}
</style>
