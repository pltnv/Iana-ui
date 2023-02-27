<template>
  <div class="i-tip">
    <div class="i-tip__trigger" @mouseover="openTip" @mouseleave="closeTip">
      <slot></slot>
    </div>
    <div
      v-if="showTip"
      class="i-tip__content"
      :class="`i-tip__content--${position}`"
      :style="{ minWidth: minWidth, maxWidth: maxWidth }"
    >
      <template v-if="$slots.tip">
        <slot name="tip"> </slot>
      </template>
      <div v-else v-text="tip" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "ITip",
  props: {
    id: String,
    position: {
      type: String,
      default: "top",
      validator: (value) => {
        return ["top", "right", "bottom", "left"].indexOf(value) !== -1;
      }
    },
    openDelay: [Number, String],
    closeDelay: [Number, String],
    openOnClick: Boolean,
    openOnHover: {
      type: Boolean,
      default: true
    },
    tip: String,
    permanent: Boolean,
    maxWidth: String,
    minWidth: String
  },

  setup(props, { emit }) {
    let showTip = ref(false);

    const openTip = () => {
      setTimeout(() => {
        showTip.value = true;
      }, props.openDelay);
    };

    const closeTip = () => {
      setTimeout(() => {
        showTip.value = false;
      }, props.closeDelay);
    };
    return {
      showTip,

      openTip,
      closeTip
    };
  }
};
</script>

<style lang="scss">
.i-tip {
  position: relative;
  display: inline-block;

  &__content {
    position: absolute;
    z-index: 15;
    background-color: #000;
    color: #fff;
    border-radius: 10px;
    padding: 8px 10px;
    opacity: 0.7;
    height: auto;
    white-space: wrap;
    word-wrap: break-word;
    &--top {
      bottom: calc(100% + 10px);
      left: 50%;
      transform: translateY(-50%);
      transform: translateX(-50%);
    }

    &--right {
      top: 50%;
      transform: translateY(-50%);
      left: calc(100% + 10px);
      right: auto;
    }

    &--bottom {
      top: calc(100% + 10px);
      left: 50%;
      transform: translateY(-50%);
      transform: translateX(-50%);
    }

    &--left {
      top: 50%;
      transform: translateY(-50%);
      right: calc(100% + 10px);
      left: auto;
    }
  }

  &__trigger {
    display: inline-block;
  }
}
</style>
