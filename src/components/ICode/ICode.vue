<template>
  <div class="i-otp-input">
    <input
      ref="input"
      v-model.trim="localValue[index]"
      v-for="(number, index) in +amount"
      :key="number"
      autofocus
      maxlength="1"
      class="i-otp-input__field"
      @input="handleInput($event, index)"
    />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ICode",
  props: {
    id: String,
    amount: String,
    seporator: String,
    color: String,
    background: String,
    borderColor: String,
    size: String,
    modelValue: String
  },

  setup(props, { emit }) {
    let localValue = ref([]);
    const input = ref(null);

    let handleInput = (e, i) => {
      console.log(e.inputType);
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
  gap: 10px;

  &__field {
    text-align: center;
    width: 30px;
    height: 30px;
    font-size: 30px;
  }
}
</style>
