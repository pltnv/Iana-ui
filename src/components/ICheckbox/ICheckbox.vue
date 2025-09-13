<template>
  <div
    class="i-checkbox"
    :class="{ 'i-checkbox--disabled': disabled, [`i-checkbox--${size}`]: size }"
  >
    <label class="i-checkbox__label">
      <input
        :id="id"
        :name="name"
        type="checkbox"
        class="i-checkbox__input"
        :checked="modelValue"
        :disabled="disabled"
        @change="updateValue($event.target.checked)"
      />
      <span
        class="i-checkbox__custom"
        :style="{
          '--checkbox-color': color || '#10b981',
          '--checkbox-hover-color': hoverColor || '#059669'
        }"
      >
        <svg
          class="i-checkbox__checkmark"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
      </span>
      <span v-if="label" class="i-checkbox__label-text">{{ label }}</span>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  id: String,
  name: String,
  label: String,
  modelValue: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: "#10b981"
  },
  hoverColor: {
    type: String,
    default: "#059669"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium", "large"].includes(value)
  }
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (newValue) => {
  if (!props.disabled) {
    emit("update:modelValue", newValue);
  }
};
</script>

<style lang="scss" scoped>
.i-checkbox {
  display: inline-flex;
  align-items: center;
  position: relative;

  &--small {
    .i-checkbox__custom {
      width: 16px;
      height: 16px;
      border-radius: 4px;
    }

    .i-checkbox__label-text {
      font-size: 14px;
    }
  }

  &--medium {
    .i-checkbox__custom {
      width: 20px;
      height: 20px;
      border-radius: 6px;
    }

    .i-checkbox__label-text {
      font-size: 16px;
    }
  }

  &--large {
    .i-checkbox__custom {
      width: 24px;
      height: 24px;
      border-radius: 8px;
    }

    .i-checkbox__label-text {
      font-size: 18px;
    }
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;

    .i-checkbox__label {
      cursor: not-allowed;
    }
  }

  &__label {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    gap: 10px;
    transition: all 0.2s ease;

    &:hover:not(.i-checkbox--disabled &) {
      .i-checkbox__custom {
        border-color: var(--checkbox-hover-color);
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
      }
    }
  }

  &__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
    border: none;
    outline: none;

    &:checked + .i-checkbox__custom {
      background-color: var(--checkbox-color);
      border-color: var(--checkbox-color);

      .i-checkbox__checkmark {
        opacity: 1;
        transform: scale(1);
      }
    }

    &:disabled + .i-checkbox__custom {
      background-color: #f9fafb;
      border-color: #e5e7eb;
      cursor: not-allowed;
    }
  }

  &__custom {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border: 1.5px solid #e5e7eb;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  &__checkmark {
    width: 65%;
    height: 65%;
    color: white;
    opacity: 0;
    transform: scale(0.7);
    transition: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    stroke-width: 2.5;
  }

  &__label-text {
    color: #1f2937;
    font-weight: 500;
    line-height: 1.5;
    transition: color 0.2s ease;
  }
}

@media (prefers-color-scheme: dark) {
  .i-checkbox {
    &__custom {
      background-color: #111827;
      border-color: #374151;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    &__label-text {
      color: #f3f4f6;
    }

    &__input:disabled + .i-checkbox__custom {
      background-color: #1f2937;
      border-color: #4b5563;
    }
  }
}
</style>
