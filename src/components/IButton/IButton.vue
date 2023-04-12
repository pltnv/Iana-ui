<template>
  <button
    :id="id"
    :name="name"
    :type="type"
    :disabled="disabled"
    class="i-button"
    :class="classes"
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
        return (
          ["default", "flat", "outlined", "text", "plain"].indexOf(value) !== -1
        );
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
    const classes = computed(() => {
      return {
        "i-button--block": props.block,
        "i-button--rounded": props.rounded,
        [`i-button--${props.size}`]: true,
        [`i-button--${props.variant}`]: true
      };
    });

    const handleClick = () => {
      emit("click");
    };

    return { classes, handleClick };
  }
});
</script>

<style lang="scss">
.i-button {
  display: inline-block;
  align-items: center;
  padding: 10px;
  width: 140px; // to fix
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 2px;
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

  &--rounded {
    border-radius: 10px;
  }

  &--flat {
    background-color: transparent;
    transition: background-color 0.3s ease;

    &:hover {
      opacity: 0.6;
    }
  }

  &--outlined {
    box-shadow: none;
    border: 1px solid gray;

    &:hover {
      opacity: 0.6;
    }
  }

  &--text {
    border: none;
    box-shadow: none;
  }

  &:hover {
    background: rgb(237, 235, 235);
  }

  &--plain {
    border: none;
    box-shadow: none;

    &:hover {
      background: none;
    }
  }

  &:disabled {
    pointer-events: none;
    background: none;
    opacity: 0.5;
  }
}
</style>
