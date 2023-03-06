<template>
  <div
    class="i-notification"
    :class="[`i-notification--${type}`]"
    :style="{ maxWidth: maxWidth, minWidth: minWidth }"
  >
    <div class="i-notification__message" v-text="message" />
    <div
      v-if="duration"
      class="i-notification__progress-bar"
      :style="`width: ${progress}%`"
    />
    <div class="i-notification__close-btn mdi mdi-close" @click="close" />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "ITip",
  props: {
    id: String,
    position: {
      type: String,
      default: "top",
      validator: (value) => {
        return ["top", "bottom"].indexOf(value) !== -1;
      }
    },
    type: {
      type: String,
      default: "default",
      validator: (value) => {
        return ["default", "success", "warning", "error"].indexOf(value) !== -1;
      }
    },
    message: String,
    openDelay: [Number, String],
    closeDelay: [Number, String],
    duration: String,
    maxWidth: String,
    minWidth: String
  },

  setup(props, { emit }) {
    let progress = ref(100);
    let intervalId;

    const close = () => {
      clearInterval(intervalId);
      emit("close");
    };

    const countProgress = () => {
      intervalId = setInterval(() => {
        progress.value -= 100 / (props.duration / 100);
        if (progress.value <= 0) {
          clearInterval(intervalId);
        }
      }, 100);
    };

    onMounted(() => countProgress());

    onUnmounted(() => clearInterval(this.intervalId));

    return {
      progress,
      intervalId,

      close
    };
  }
};
</script>

<style lang="scss">
.i-notification {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  padding: 16px 12px 6px;
  min-height: 40px;

  &--defailt {
    color: #030f00;
    color: #ffffff;
  }

  &--success {
    background: #5dc144;
    border: 1px solid #144508;
    color: #ffffff;
  }

  &--error {
    color: #ffffff;
    background: #c14444;
    border: 1px solid #75160b;
  }
  &--warning {
    color: #ffffff;
    background: #ddb763;
    border: 1px solid #846f13;
  }
  &--info {
    color: #ffffff;
    background: #3aa7d9;
    border: 1px solid #077b8d;
  }

  &__progress-bar {
    height: 4px;
    background-color: #4caf50;
    border-radius: 2px;
    transition: width 0.1s ease-in-out;
  }

  &__close-btn {
    position: absolute;
    top: 6px;
    right: 6px;
    cursor: pointer;
  }
}
</style>
