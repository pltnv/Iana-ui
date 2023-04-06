<template>
  <div class="i-otp-input">
    <template v-for="(number, index) in +amount" :key="number">
      <input
        ref="input"
        v-model.trim="localValue[index]"
        :type="type"
        autofocus
        maxlength="1"
        min="0"
        max="9"
        :readonly="readonly"
        :disabled="disabled"
        class="i-otp-input__field"
        :class="[`i-otp-input__field--${size}`]"
        :style="{ borderColor: borderColor, color: color }"
        @input="handleInput($event, index)"
      />
      <span
        v-if="index < +amount - 1"
        v-text="divider"
        class="i-otp-input__divider"
      />
    </template>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "ICode",
  emits: ["update:modelValue"],
  props: {
    id: String,
    modelValue: String,
    name: String,
    amount: String,
    divider: String,
    color: String,
    background: String,
    borderColor: String,
    size: String,
    disabled: Boolean,
    readonly: Boolean,
    borderColor: String,
    color: String,
    type: {
      default: "number",
      validator: (value) => {
        return ["number", "text", "password"].indexOf(value) !== -1;
      }
    },
    size: {
      default: "md",
      validator: (value) => {
        return ["sm", "md", "lg"].indexOf(value) !== -1;
      }
    }
  },

  setup(props, { emit }) {
    let localValue = ref([
      ...props.modelValue.slice(0, props.amount).split("")
    ]);

    const input = ref(null);

    let handleInput = (e, i) => {
      if (
        e.inputType === "deleteContentBackward" &&
        localValue.value[i] == ""
      ) {
        input.value[i - 1].focus();
      }
      if (e.inputType === "insertText") {
        input.value[i + 1].focus();
      }
    };

    watch(props.modelValue, (newValue) => {
      localValue.value = [...newValue.slice(0, props.amount).split("")];
    });

    watch(localValue.value, () => {
      const otpString = localValue.value.join("");
      emit("update:modelValue", otpString);
    });

    return {
      localValue,
      input,

      handleInput
    };
  }
};
</script>

<style lang="scss">
.i-otp-input {
  display: flex;
  align-items: center;
  gap: 10px;

  &__field {
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 6px;
    overflow: hidden;

    &:disabled {
      cursor: not-allowed;
    }

    &:focus {
      outline: none;
      border-color: #ccc;
    }

    // removes number's input arrows
    &[type="number"]::-webkit-outer-spin-button,
    &[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &--sm {
      width: 24px;
      height: 24px;
      font-size: 20px;
    }

    &--md {
      width: 36px;
      height: 36px;
      font-size: 30px;
    }

    &--lg {
      width: 48px;
      height: 48px;
      font-size: 40px;
    }
  }

  &__divider {
    font-size: 24px;
  }
}
</style>
