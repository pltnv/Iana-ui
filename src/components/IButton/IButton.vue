<template>
  <button
    :id="id"
    :name="name"
    :type="type"
    :disabled="disabled"
    class="i-button"
    :class="[`i-button--${size}`, { 'i-button--block': block }]"
    :style="{ color: color, borderRadius: rounded }"
    @click="click"
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
export default {
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
    rounded: String,
    size: {
      type: String,
      default: "sm",
      validator: (value) => {
        return ["xs", "sm", "md", "lg", "xl"].indexOf(value) !== -1;
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
    return {};
  }
};
</script>

<style lang="scss">
.i-button {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: transparent;
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

  &:disabled {
    pointer-events: none;
  }
}
</style>
