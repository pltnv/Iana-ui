<template>
  <button
    :id="id"
    :name="name"
    :type="type"
    :disabled="disabled"
    class="i-button"
    :class="getClasses"
    :style="{ color: color, borderRadius: round }"
    @click="handleClick"
  >
    <i
      v-if="iconLeft"
      class="mdi i-button__icon-left"
      :class="iconLeft"
      :style="{ color: iconLeftColor }"
    ></i>

    <span v-if="label" class="i-button__label"> {{ label }}</span>

    <i
      v-if="iconRight"
      class="mdi i-button__icon-right"
      :class="iconRight"
      :style="{ color: iconRightColor }"
    ></i>
  </button>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "I-Button",
  props: {
    id: String,
    name: String,
    label: String,
    color: String,
    type: {
      type: String,
      default: "button",
      validator: (value) => {
        return ["button", "submit", "reset"].indexOf(value) !== -1;
      }
    },
    round: String,
    rounded: Boolean,
    size: {
      type: String,
      default: "sm",
      validator: (value) => {
        return ["xs", "sm", "md", "lg", "xl"].indexOf(value) !== -1;
      }
    },
    variant: {
      type: String,
      default: "default",
      validator: (value) => {
        return ["default", "flat", "outlined"].indexOf(value) !== -1;
      }
    },
    block: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    ripple: { type: Boolean, default: false },
    iconLeft: String,
    iconRight: String,
    iconRightColor: String,
    iconLeftColor: String
  },
  setup(props, { emit }) {
    const getClasses = computed(() => {
      return {
        "i-button--block": props.block,
        "i-button--rounded": props.rounded,
        [`i-button--${props.size}`]: true,
        [`i-button--${props.variant}`]: true
      };
    });

    return { getClasses };
  }
});
</script>

<style lang="scss">
.i-button {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &--block {
    width: 100%;
    justify-content: center;
  }

  &--xs {
    height: 20px;
  }

  &--sm {
    height: 28px;
  }

  &--md {
    height: 36px;
  }

  &--lg {
    height: 44px;
  }

  &--xl {
    height: 52px;
  }

  &--flat {
    background-color: transparent;
    transition: background-color 0.3s ease;

    &:hover {
      opacity: 0.5;
    }
  }

  &--outlined {
    border: 1px solid black;

    &:hover {
      opacity: 0.5;
    }
  }

  &--rounded {
    border-radius: 10px;
  }

  &:disabled {
    pointer-events: none;
  }
}
</style>
