<template>
  <div class="i-input" :class="{ 'i-input--block': block }">
    <label v-if="label" class="i-input__label" :for="id">
      {{ label }}
      <sup v-if="required">*</sup>
    </label>

    <div class="i-input__wrapper" :class="classes">
      <input
        :id="id"
        :name="name"
        v-model="localValue"
        :maxlength="maxlength"
        :autofocus="autofocus"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly"
        :type="localType"
        @blur="emit('blur')"
        @focus="emit('focus')"
      />

      <button
        v-if="clearable && localValue.length && !disabled && !readonly"
        class="i-input__clear"
        type="button"
        @click="clear"
      >
        <i class="mdi mdi-close"></i>
      </button>

      <div v-if="count && (amount > 0 || maxlength)" class="i-input__info">
        <span>{{ amount }}</span>
        <span v-if="maxlength"> / {{ maxlength }}</span>
      </div>

      <button
        v-if="isTypePassword && !disabled"
        type="button"
        class="i-input__toggle"
        @click="toggleShowPassword"
      >
        <i class="mdi" :class="passwordIcon"></i>
      </button>
    </div>

    <!-- Ошибка -->
    <p v-if="errorMessage && error" class="i-input__error">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  id: String,
  name: String,
  modelValue: String,
  autofocus: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  maxlength: String,
  placeholder: String,
  required: Boolean,
  showError: Boolean,
  label: String,
  variant: {
    type: String,
    default: "default",
    validator: (value) => ["default", "outlined", "underline"].includes(value)
  },
  size: {
    type: String,
    default: "sm",
    validator: (value) => ["xs", "sm", "md"].includes(value)
  },
  type: {
    type: String,
    default: "text",
    validator: (value) =>
      ["text", "phone", "email", "password", "number"].includes(value)
  },
  clearable: Boolean,
  count: Boolean,
  error: Boolean,
  errorMessage: String,
  block: Boolean
});

const emit = defineEmits(["update:modelValue", "blur", "focus"]);

const localValue = ref(props.modelValue);
const localType = ref(props.type);

const amount = computed(() => localValue.value?.length || 0);
const isTypePassword = computed(() => props.type === "password");

const passwordIcon = computed(() => {
  if (isTypePassword.value && localType.value === "password") {
    return "mdi-eye-outline";
  }
  if (isTypePassword.value && localType.value === "text") {
    return "mdi-eye-off-outline";
  }
  return "";
});

const classes = computed(() => [
  `i-input--${props.variant}`,
  `i-input--${props.size}`,
  {
    error: props.error && !props.disabled,
    "i-input--disabled": props.disabled,
    "i-input--block": props.block
  }
]);

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue;
  }
);

watch(localValue, (val) => {
  emit("update:modelValue", val);
});

const clear = () => {
  localValue.value = "";
};

const toggleShowPassword = () => {
  if (isTypePassword.value) {
    localType.value = localType.value === "password" ? "text" : "password";
  }
};
</script>

<style lang="scss" scoped>
.i-input {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 280px;

  &--block {
    width: 100%;
  }

  &__label {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    display: flex;
    align-items: center;
    gap: 2px;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    gap: 6px;
    position: relative;
    padding: 8px 10px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    background: #fff;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus-within {
      border-color: #2563eb;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
    }

    &.error {
      border-color: #ef4444;
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 14px;
      color: #111;
      background: transparent;

      &::placeholder {
        color: #9ca3af;
      }
    }
  }

  &__clear,
  &__toggle {
    background: none;
    border: none;
    cursor: pointer;
    color: #6b7280;
    padding: 2px;
    transition: color 0.2s;

    &:hover {
      color: #111;
    }
  }

  &__info {
    font-size: 12px;
    color: #6b7280;
  }

  &__error {
    font-size: 12px;
    color: #ef4444;
    margin-top: 2px;
  }
}
</style>
