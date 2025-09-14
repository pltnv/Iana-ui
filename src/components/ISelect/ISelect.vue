<template>
  <div class="i-select" :class="selectClasses" v-click-outside="clickOutside">
    <div
      class="i-select__label"
      :class="labelClasses"
      @click="toggleShowOptions"
    >
      <span v-if="selectedItem?.text">{{ selectedItem.text }}</span>
      <span v-else class="i-select__placeholder">{{ label }}</span>

      <div class="chevron" :class="{ 'chevron--up': showOptions }">
        <i class="mdi mdi-chevron-down" />
      </div>
    </div>

    <Transition name="options">
      <div v-if="showOptions" class="options">
        <div
          v-for="item in items"
          :key="item.value"
          class="i-select__option"
          :class="{
            'i-select__option--active': item.value === selectedItem?.value
          }"
          @click="selectItem(item)"
        >
          {{ item.text }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  id: String,
  name: String,
  modelValue: Object,
  items: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    default: "Выберите значение"
  },
  multiple: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  block: Boolean,
  variant: {
    type: String,
    default: "default",
    validator: (v) => ["default", "underline"].includes(v)
  },
  type: {
    type: String,
    default: "default",
    validator: (v) => ["default", "rounded"].includes(v)
  },
  clearable: Boolean
});

const emit = defineEmits(["update:modelValue"]);

const showOptions = ref(false);
const selectedItem = ref(props.modelValue || null);

const selectClasses = computed(() => ({
  "i-select--disabled": props.disabled,
  "i-select--readonly": props.readonly,
  "i-select--block": props.block
}));

const labelClasses = computed(() => [
  `i-select__label--${props.variant}`,
  `i-select__label--${props.type}`
]);

const toggleShowOptions = () => {
  if (!props.disabled && !props.readonly) {
    showOptions.value = !showOptions.value;
  }
};

const selectItem = (item) => {
  selectedItem.value = item;
  showOptions.value = false;
  emit("update:modelValue", item);
};

const clickOutside = () => {
  showOptions.value = false;
};

watch(
  () => props.modelValue,
  (val) => {
    selectedItem.value = val;
  }
);
</script>

<style lang="scss" scoped>
.i-select {
  width: 280px;
  font-size: 14px;
  position: relative;

  &--block {
    width: 100%;
  }

  &--disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &--readonly {
    pointer-events: none;
    opacity: 0.8;
  }

  &__label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: #fff;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:hover {
      border-color: #9ca3af;
    }

    &--underline {
      border: none;
      border-bottom: 1px solid #d1d5db;
      border-radius: 0;
    }

    &--rounded {
      border-radius: 9999px;
    }

    .i-select__placeholder {
      color: #9ca3af;
    }

    .chevron {
      transition: transform 0.2s ease-in-out;

      &--up {
        transform: rotate(180deg);
      }
    }
  }

  .options {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: #fff;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    z-index: 10;
  }

  &__option {
    padding: 10px 12px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #f3f4f6;
    }

    &--active {
      background: #e5e7eb;
      font-weight: 500;
    }
  }

  .options-enter-active,
  .options-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
  }

  .options-enter-from,
  .options-leave-to {
    opacity: 0;
    transform: translateY(-5px);
  }
}
</style>
