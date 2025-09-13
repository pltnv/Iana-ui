<template>
  <div class="otp-container">
    <div class="otp-input-group" :class="[`otp-input-group--${size}`]">
      <input
        v-for="(_, index) in digitsCount"
        :key="index"
        ref="inputRefs"
        v-model.trim="digits[index]"
        :type="inputType"
        inputmode="numeric"
        pattern="[0-9]*"
        autocomplete="one-time-code"
        maxlength="1"
        :readonly="readonly"
        :disabled="disabled"
        :aria-label="`Digit ${index + 1} of ${digitsCount}`"
        :class="[
          'otp-input',
          `otp-input--${size}`,
          {
            'otp-input--filled': digits[index],
            'otp-input--error': hasError,
            'otp-input--focus': focusedIndex === index
          }
        ]"
        @input="handleInput($event, index)"
        @keydown="handleKeydown($event, index)"
        @paste="handlePaste"
        @focus="focusedIndex = index"
        @blur="focusedIndex = -1"
      />
    </div>

    <div v-if="hasError && errorMessage" class="otp-error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  digits: {
    type: Number,
    default: 6,
    validator: (value) => value >= 4 && value <= 8
  },
  type: {
    type: String,
    default: "number",
    validator: (value) => ["number", "text", "password"].includes(value)
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value)
  },
  disabled: Boolean,
  readonly: Boolean,
  errorMessage: String,
  autoFocus: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(["update:modelValue", "complete", "focus", "blur"]);

const inputRefs = ref([]);
const digits = ref(Array(props.digits).fill(""));
const focusedIndex = ref(-1);
const hasError = computed(() => !!props.errorMessage);

const digitsCount = computed(() => props.digits);
const inputType = computed(() =>
  props.type === "number" ? "tel" : props.type
);

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue === digits.value.join("")) return;

    const newDigits = newValue.split("").slice(0, props.digits);
    digits.value = [
      ...newDigits,
      ...Array(props.digits - newDigits.length).fill("")
    ];
  }
);

watch(
  digits,
  (newDigits) => {
    const value = newDigits.join("");
    emit("update:modelValue", value);

    if (value.length === props.digits) {
      emit("complete", value);
    }
  },
  { deep: true }
);

onMounted(() => {
  if (props.autoFocus && !props.disabled && !props.readonly) {
    nextTick(() => {
      inputRefs.value[0]?.focus();
    });
  }
});

const handleInput = (event, index) => {
  const value = event.target.value;

  if (value.length > 1) {
    event.target.value = value[0];
    digits.value[index] = value[0];
  }

  if (value && index < props.digits - 1) {
    nextTick(() => {
      inputRefs.value[index + 1]?.focus();
    });
  }

  if (!value && event.inputType === "deleteContentBackward" && index > 0) {
    nextTick(() => {
      inputRefs.value[index - 1]?.focus();
    });
  }
};

const handleKeydown = (event, index) => {
  if (event.key === "Backspace" && !digits.value[index] && index > 0) {
    event.preventDefault();
    inputRefs.value[index - 1]?.focus();
  }

  if (event.key === "ArrowLeft" && index > 0) {
    event.preventDefault();
    inputRefs.value[index - 1]?.focus();
  }

  if (event.key === "ArrowRight" && index < props.digits - 1) {
    event.preventDefault();
    inputRefs.value[index + 1]?.focus();
  }

  if (
    props.type === "number" &&
    !/^\d$|Backspace|ArrowLeft|ArrowRight|Delete|Tab/.test(event.key)
  ) {
    event.preventDefault();
  }
};

const handlePaste = (event) => {
  event.preventDefault();
  const pasteData = event.clipboardData
    ?.getData("text")
    .replace(/\D/g, "")
    .slice(0, props.digits);

  if (pasteData) {
    const newDigits = pasteData.split("");
    digits.value = [
      ...newDigits,
      ...Array(props.digits - newDigits.length).fill("")
    ];

    const lastFilledIndex = Math.min(newDigits.length, props.digits - 1);
    nextTick(() => {
      inputRefs.value[lastFilledIndex]?.focus();
    });
  }
};

const focus = () => {
  inputRefs.value[0]?.focus();
};

const clear = () => {
  digits.value = Array(props.digits).fill("");
  nextTick(() => {
    inputRefs.value[0]?.focus();
  });
};

defineExpose({
  focus,
  clear
});
</script>

<style scoped>
.otp-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.otp-input-group {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.otp-input-group--sm {
  gap: 8px;
}

.otp-input-group--lg {
  gap: 16px;
}

.otp-input {
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  text-align: center;
  font-weight: 600;
  transition: all 0.2s ease;
  outline: none;
  color: #1a202c;
}

.otp-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

.otp-input--filled {
  border-color: #10b981;
  background-color: #f0fdf4;
}

.otp-input--error {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.otp-input--focus {
  border-color: #3b82f6;
}

.otp-input:disabled {
  background-color: #f8fafc;
  border-color: #e2e8f0;
  color: #94a3b8;
  cursor: not-allowed;
}

.otp-input:read-only {
  background-color: #f1f5f9;
  cursor: default;
}

.otp-input--sm {
  width: 48px;
  height: 48px;
  font-size: 18px;
  border-radius: 8px;
}

.otp-input--md {
  width: 56px;
  height: 56px;
  font-size: 20px;
  border-radius: 12px;
}

.otp-input--lg {
  width: 64px;
  height: 64px;
  font-size: 24px;
  border-radius: 16px;
}

.otp-input::-webkit-outer-spin-button,
.otp-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.otp-input[type="number"] {
  --moz-appearance: textfield;
}

.otp-error-message {
  color: #ef4444;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}

.otp-input {
  animation: fadeInUp 0.3s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .otp-input-group {
    gap: 8px;
  }

  .otp-input--sm {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }

  .otp-input--md {
    width: 48px;
    height: 48px;
    font-size: 18px;
  }

  .otp-input--lg {
    width: 56px;
    height: 56px;
    font-size: 20px;
  }
}
</style>
