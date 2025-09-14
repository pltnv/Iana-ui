<template>
  <Transition name="i-notification-fade" @after-leave="$emit('destroy')">
    <div
      v-if="isVisible"
      :id="id"
      class="i-notification"
      :class="[`i-notification--${type}`, `i-notification--${position}`]"
      :style="{ maxWidth: maxWidth, minWidth: minWidth }"
      role="alert"
      aria-live="polite"
    >
      <div class="i-notification__content">
        <div class="i-notification__icon">
          <i :class="iconClass" />
        </div>
        <div class="i-notification__message" v-text="message" />
      </div>

      <button
        class="i-notification__close-btn"
        @click="close"
        aria-label="Close notification"
      >
        <i class="mdi mdi-close" />
      </button>

      <div
        v-if="duration && showProgress"
        class="i-notification__progress-bar"
        :class="`i-notification__progress-bar--${type}`"
      >
        <div
          class="i-notification__progress-bar-inner"
          :style="`width: ${progress}%`"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  id: String,
  position: {
    type: String,
    default: "top-right",
    validator: (value) =>
      [
        "top",
        "bottom",
        "top-right",
        "top-left",
        "bottom-right",
        "bottom-left"
      ].includes(value)
  },
  type: {
    type: String,
    default: "default",
    validator: (value) =>
      ["default", "success", "warning", "error", "info"].includes(value)
  },
  message: {
    type: String,
    required: true
  },
  openDelay: {
    type: [Number, String],
    default: 0
  },
  closeDelay: {
    type: [Number, String],
    default: 0
  },
  duration: {
    type: [Number, String],
    default: 4500
  },
  maxWidth: {
    type: String,
    default: "400px"
  },
  minWidth: {
    type: String,
    default: "300px"
  },
  showProgress: {
    type: Boolean,
    default: true
  },
  closable: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(["close", "destroy"]);

const isVisible = ref(false);
const progress = ref(100);
const intervalId = ref(null);
const timeoutId = ref(null);

const iconClass = computed(() => {
  const icons = {
    success: "mdi mdi-check-circle",
    error: "mdi mdi-alert-circle",
    warning: "mdi mdi-alert",
    info: "mdi mdi-information",
    default: "mdi mdi-bell"
  };
  return icons[props.type] || icons.default;
});

const close = () => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
  }
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
  isVisible.value = false;
  emit("close");
};

const startProgress = () => {
  if (!props.duration || props.duration <= 0) return;

  const totalDuration = Number(props.duration);
  const intervalTime = 50;
  const decrement = (intervalTime / totalDuration) * 100;

  intervalId.value = setInterval(() => {
    progress.value = Math.max(0, progress.value - decrement);
    if (progress.value <= 0) {
      close();
    }
  }, intervalTime);
};

const initializeNotification = () => {
  timeoutId.value = setTimeout(() => {
    isVisible.value = true;
    startProgress();
  }, Number(props.openDelay));
};

onMounted(() => {
  initializeNotification();
});

onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
  }
});

watch(
  () => props.duration,
  (newDuration) => {
    if (intervalId.value) {
      clearInterval(intervalId.value);
    }
    progress.value = 100;
    startProgress();
  }
);

defineExpose({
  close
});
</script>

<style lang="scss" scoped>
.i-notification {
  position: relative;
  display: flex;
  align-items: flex-start;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border-left: 4px solid;
  transition: all 0.3s ease;
  min-height: 60px;
  overflow: hidden;

  &--top {
    margin: 8px auto;
  }

  &--top-right {
    margin: 8px 16px 8px auto;
  }

  &--top-left {
    margin: 8px auto 8px 16px;
  }

  &--bottom {
    margin: 8px auto;
  }

  &--bottom-right {
    margin: 8px 16px 8px auto;
  }

  &--bottom-left {
    margin: 8px auto 8px 16px;
  }

  &--default {
    border-left-color: #64748b;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    color: #334155;

    .i-notification__icon {
      color: #64748b;
    }
  }

  &--success {
    border-left-color: #22c55e;
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
    color: #166534;

    .i-notification__icon {
      color: #22c55e;
    }
  }

  &--error {
    border-left-color: #ef4444;
    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
    color: #991b1b;

    .i-notification__icon {
      color: #ef4444;
    }
  }

  &--warning {
    border-left-color: #f59e0b;
    background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
    color: #92400e;

    .i-notification__icon {
      color: #f59e0b;
    }
  }

  &--info {
    border-left-color: #3b82f6;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    color: #1e40af;

    .i-notification__icon {
      color: #3b82f6;
    }
  }

  &__content {
    display: flex;
    align-items: flex-start;
    flex: 1;
    margin-right: 12px;
  }

  &__icon {
    margin-right: 12px;
    font-size: 20px;
    margin-top: 2px;
    flex-shrink: 0;
  }

  &__message {
    font-size: 14px;
    line-height: 1.5;
    font-weight: 500;
  }

  &__close-btn {
    background: none;
    border: none;
    color: inherit;
    opacity: 0.7;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: opacity 0.2s ease;
    flex-shrink: 0;

    &:hover {
      opacity: 1;
      background: rgba(0, 0, 0, 0.1);
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  }

  &__progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 0 0 12px 12px;
    overflow: hidden;

    &-inner {
      height: 100%;
      transition: width 0.05s linear;
      border-radius: 0 0 12px 12px;

      .i-notification--default & {
        background: #64748b;
      }

      .i-notification--success & {
        background: #22c55e;
      }

      .i-notification--error & {
        background: #ef4444;
      }

      .i-notification--warning & {
        background: #f59e0b;
      }

      .i-notification--info & {
        background: #3b82f6;
      }
    }
  }
}

.i-notification-fade {
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }

  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease;
  }
}

@media (max-width: 640px) {
  .i-notification {
    min-width: 280px !important;
    max-width: calc(100vw - 32px) !important;
    margin: 8px 16px;
  }
}
</style>