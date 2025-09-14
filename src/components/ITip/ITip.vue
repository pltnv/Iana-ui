<template>
  <div class="i-tip">
    <div
      class="i-tip__trigger"
      @mouseover="openOnHover ? openTip() : null"
      @mouseleave="openOnHover ? closeTip() : null"
      @click="openOnClick ? toggleTip() : null"
    >
      <slot></slot>
    </div>

    <transition name="fade">
      <div
        v-if="showTip || permanent"
        class="i-tip__content"
        :class="`i-tip__content--${position}`"
        :style="{ minWidth: minWidth, maxWidth: maxWidth }"
      >
        <template v-if="$slots.tip">
          <slot name="tip"></slot>
        </template>
        <div v-else v-text="tip" />
      </div>
    </transition>
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
      validator: (value) => ["top", "right", "bottom", "left"].includes(value)
    },
    openDelay: {
      type: [Number, String],
      default: 0
    },
    closeDelay: {
      type: [Number, String],
      default: 0
    },
    openOnClick: {
      type: Boolean,
      default: false
    },
    openOnHover: {
      type: Boolean,
      default: true
    },
    tip: String,
    permanent: Boolean,
    maxWidth: {
      type: String,
      default: "220px"
    },
    minWidth: {
      type: String,
      default: "120px"
    }
  },

  setup(props) {
    const showTip = ref(false);
    let openTimeout = null;
    let closeTimeout = null;

    const openTip = () => {
      clearTimeout(closeTimeout);
      openTimeout = setTimeout(() => {
        showTip.value = true;
      }, Number(props.openDelay));
    };

    const closeTip = () => {
      if (props.permanent) return;
      clearTimeout(openTimeout);
      closeTimeout = setTimeout(() => {
        showTip.value = false;
      }, Number(props.closeDelay));
    };

    const toggleTip = () => {
      showTip.value = !showTip.value;
    };

    return {
      showTip,
      openTip,
      closeTip,
      toggleTip
    };
  }
};
</script>

<style lang="scss">
.i-tip {
  position: relative;
  display: inline-block;

  &__trigger {
    display: inline-block;
    cursor: pointer;
  }

  &__content {
    z-index: 10;
    position: absolute;
    padding: 8px 12px;
    border-radius: 6px;
    background: #222;
    color: #fff;
    font-size: 14px;
    line-height: 1.4;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    opacity: 0.95;
    word-wrap: break-word;

    &::after {
      content: "";
      position: absolute;
      border: 6px solid transparent;
    }

    &--top {
      bottom: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%);
      &::after {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-top-color: #222;
      }
    }

    &--bottom {
      top: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%);
      &::after {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-bottom-color: #222;
      }
    }

    &--left {
      top: 50%;
      right: calc(100% + 10px);
      transform: translateY(-50%);
      &::after {
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
        border-left-color: #222;
      }
    }

    &--right {
      top: 50%;
      left: calc(100% + 10px);
      transform: translateY(-50%);
      &::after {
        top: 50%;
        right: 100%;
        transform: translateY(-50%);
        border-right-color: #222;
      }
    }
  }
}

/* Анимация */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
