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
import { ref } from "vue";

export default {
  name: "ICode",
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
    type: {
      default: "number",
      validator: (value) => {
        return ["number", "text", "password"].indexOf(value) !== -1;
      }
    }
  },

  setup(props, { emit }) {
    let localValue = ref([]);

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
    width: 30px;
    height: 30px;
    font-size: 30px;
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
  }

  &__divider {
    font-size: 24px;
  }
}
</style>
