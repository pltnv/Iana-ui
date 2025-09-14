<template>
  <button
    :id="id"
    :name="name"
    :type="type"
    :disabled="disabled"
    class="i-button"
    :class="classes"
    :style="{ borderRadius: round }"
    @click="handleClick"
  >
    <i
      v-if="iconLeft"
      class="mdi i-button__icon-left"
      :class="iconLeft"
      :style="{ color: iconLeftColor }"
    ></i>

    <span v-if="label" class="i-button__label">{{ label }}</span>

    <i
      v-if="iconRight"
      class="mdi i-button__icon-right"
      :class="iconRight"
      :style="{ color: iconRightColor }"
    ></i>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  id: String,
  name: String,
  label: String,
  color: { type: String, default: "#1d4ed8" },
  type: {
    type: String,
    default: "button",
    validator: (v) => ["button", "submit", "reset"].includes(v)
  },
  round: { type: String, default: "6px" },
  rounded: Boolean,
  size: {
    type: String,
    default: "sm",
    validator: (v) => ["xs", "sm", "md", "lg", "xl"].includes(v)
  },
  variant: {
    type: String,
    default: "default",
    validator: (v) =>
      ["default", "flat", "outlined", "text", "plain"].includes(v)
  },
  block: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  ripple: { type: Boolean, default: false },
  iconLeft: String,
  iconRight: String,
  iconRightColor: String,
  iconLeftColor: String
});

const emit = defineEmits(["click"]);

const classes = computed(() => ({
  "i-button--block": props.block,
  "i-button--rounded": props.rounded,
  [`i-button--${props.size}`]: true,
  [`i-button--${props.variant}`]: true
}));

const handleClick = () => {
  if (!props.disabled) {
    emit("click");
  }
};
</script>

<style lang="scss" scoped>
.i-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 500;
  padding: 0 14px;
  min-width: fit-content;
  transition: all 0.25s ease;
  cursor: pointer;
  border: none;
  background-color: var(--btn-color, #1d4ed8);
  color: #fff;
  user-select: none;

  &--block {
    width: 100%;
  }

  &--xs {
    height: 24px;
    font-size: 12px;
  }

  &--sm {
    height: 32px;
    font-size: 14px;
  }

  &--md {
    height: 40px;
    font-size: 15px;
  }

  &--lg {
    height: 48px;
    font-size: 16px;
  }

  &--xl {
    height: 56px;
    font-size: 18px;
  }

  &--rounded {
    border-radius: 9999px;
  }

  &--default {
    background-color: v-bind("color");
    &:hover {
      filter: brightness(1.1);
    }
    &:active {
      filter: brightness(0.9);
    }
  }

  &--flat {
    background-color: transparent;
    color: v-bind("color");
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  &--outlined {
    background-color: transparent;
    border: 1px solid v-bind("color");
    color: v-bind("color");
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  &--text {
    background: none;
    color: v-bind("color");
    &:hover {
      text-decoration: underline;
    }
  }

  &--plain {
    background: none;
    color: inherit;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &__icon-left,
  &__icon-right {
    font-size: 1.2em;
  }
}
</style>
