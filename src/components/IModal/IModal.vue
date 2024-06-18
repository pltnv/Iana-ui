<script setup>
import { onMounted, onBeforeUnmount, computed, ref } from "vue";
import IOverlay from "../IOverlay/IOverlay.vue";
import IButton from "../IButton/IButton.vue";

const props = defineProps({
  id: String,
  modelValue: Boolean,
  persistent: Boolean,
  size: {
    type: String,
    default: "dialog",
    validator: (value) => {
      return ["dialog", "sm", "md", "lg"].indexOf(value) !== -1;
    }
  },
  title: String,
  dialogText: String,
  showAcceptButton: Boolean,
  showCancelButton: Boolean,
  acceptButtonTitle: String,
  cancelButtonTitle: String,
  disabledCancelButton: Boolean,
  disabledAcceptButton: Boolean,
  shadowEffect: Boolean
});

const emit = defineEmits(["update:modelValue", "accept", "cancel"]);

const modalVisible = ref(props.value);
const defaultBlock = ref(null);

const isShadowEffectVisible = ref(false);

const acceptButtonTitle = computed(() =>
  props.acceptButtonTitle ? props.acceptButtonTitle : "Подтвердить"
);

const cancelButtonTitle = computed(() =>
  props.cancelButtonTitle ? props.cancelButtonTitle : "Отменить"
);

const close = () => {
  emit("update:modelValue", false);
};
const closeOutside = () => {
  if (!props.persistent) {
    close();
  }
};

const accept = () => {
  emit("accept");
  close();
};

const cancel = () => {
  close();
  emit("cancel");
};

const escHandler = (e) => {
  // 27 === Esc
  if (e.keyCode === 27) {
    close();
  }
};

onMounted(() => {
  if (props.shadowEffect) {
    const { scrollHeight, clientHeight } = defaultBlock.value;
    if (scrollHeight > clientHeight) {
      isShadowEffectVisible.value = true;
    }
  }

  document.addEventListener("keyup", escHandler);
});

onBeforeUnmount(() => document.removeEventListener("keyup", escHandler));

function checkScrollEnd() {
  const { scrollTop, scrollHeight, clientHeight } = defaultBlock.value;
  if (scrollHeight - (scrollTop + clientHeight) <= 6) {
    isShadowEffectVisible.value = false;
  } else {
    isShadowEffectVisible.value = true;
  }
}
</script>

<template>
  <teleport to="#modal">
    <div v-if="modelValue">
      <div class="i-modal" :class="`i-modal--${size}`">
        <div>
          <template v-if="$slots.title">
            <slot name="title" />
          </template>
          <div v-else class="i-modal__title" v-text="title" />

          <i class="i-modal__close mdi mdi-close" @click="close" />
        </div>

        <div class="default">
          <div
            v-if="$slots.default || dialogText"
            ref="defaultBlock"
            @scroll="checkScrollEnd"
            class="i-modal__default"
            :class="{ 'shadow-effect': shadowEffect && isShadowEffectVisible }"
          >
            <template v-if="$slots.default"> <slot name="default" /></template>
            <div
              v-else-if="dialogText && size === 'dialog'"
              v-text="dialogText"
            />
          </div>
        </div>

        <div class="i-modal__footer">
          <template v-if="$slots.footer">
            <slot name="footer" />
          </template>

          <template v-else>
            <i-button
              v-if="showAcceptButton"
              size="md"
              :disabled="disabledAcceptButton"
              :label="acceptButtonTitle"
              @click="accept"
            />
            <i-button
              v-if="showCancelButton"
              size="md"
              :disabled="disabledCancelButton"
              :label="cancelButtonTitle"
              @click="cancel"
            />
          </template>
        </div>
      </div>
      <i-overlay @click="closeOutside" />
    </div>
  </teleport>
</template>

<style lang="scss">
.i-modal {
  position: fixed;
  z-index: 10;
  left: 50%;
  top: 50%;
  display: flex;
  flex-direction: column;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 14px rgba(70, 80, 88, 0.1);
  background-color: white;
  border-radius: 18px;
  padding: 10px 20px;

  &--dialog {
    width: 500px;
    min-height: 120px;
  }

  &--sm {
    width: 500px;
    height: 380px;
  }

  &--md {
    width: 600px;
    height: 460px;
  }

  &--lg {
    width: 800px;
    height: 600px;
  }

  &__title {
    font-size: 20px;
    word-break: break-word;
    padding-right: 15px;
    padding-bottom: 4px;
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 4px;
  }

  &__default {
    overflow-y: auto;
    padding-right: 12px;
    height: calc(100% - 2px);
  }

  &__default.shadow-effect::before {
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    right: 0;
    height: 16px;
    background: linear-gradient(to top, #f6f6f6, transparent);
    visibility: visible;
  }

  &__default::before {
    visibility: hidden;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 40px;
    padding: 6px 0;
    gap: 20px;
    margin-top: auto;
  }

  .default {
    position: relative;
    overflow-y: hidden;
    height: calc(100% - 40px);
    padding-right: 12px;
  }
}
</style>
