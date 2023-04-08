<template>
  <div
    :id="id"
    :name="name"
    class="i-select"
    :class="selectClasses"
    v-click-outside="clickOutsude"
  >
    <div
      class="i-select__label"
      :class="labelClasses"
      @click="toggleShowOptions"
    >
      <div v-if="selectedItem" v-text="selectedItem.text" />
      <div v-else v-text="label" />

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
            'i-select__option--active': item.value == selectedItem.value
          }"
          @click="selectItem(item)"
        >
          {{ item.text }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { ref, watch, computed, toRef } from "vue";

export default {
  name: "ISelect",
  props: {
    id: String,
    name: String,
    modelValue: Object,
    items: Array,
    label: String,
    multiple: Boolean,
    maxWidth: String,
    minWidth: String,
    disabled: Boolean,
    readonly: Boolean,
    variant: {
      type: String,
      default: "default",
      validator: (value) => {
        return ["default", "underline"].indexOf(value) !== -1;
      }
    },
    type: {
      type: String,
      default: "default",
      validator: (value) => {
        return ["default", "rounded"].indexOf(value) !== -1;
      }
    },
    clearable: Boolean
  },
  emits: ["update:modelValue"],

  setup(props, { emit }) {
    let showOptions = ref(false);
    let selectedItem = ref(props.modelValue || {});
    let modelValueRef = toRef(props, "modelValue");

    const selectClasses = computed(() => {
      return {
        "i-select--disabled": props.disabled,
        "i-select--readonly": props.readonly
      };
    });

    const labelClasses = computed(() => {
      return [
        `i-select__label--${props.variant}`,
        `i-select__label--${props.type}`
      ];
    });

    const toggleShowOptions = () => {
      showOptions.value = !showOptions.value;
    };

    const selectItem = (itemValue) => {
      selectedItem.value = itemValue;
      showOptions.value = false;
      emit("update:modelValue", selectedItem.value);
    };

    const clickOutsude = () => {
      showOptions.value = false;
    };

    watch(modelValueRef, (updatedModelValueRef) => {
      selectedItem.value = updatedModelValueRef;
    });

    return {
      showOptions,
      selectedItem,
      modelValueRef,
      selectClasses,
      labelClasses,

      toggleShowOptions,
      selectItem,
      clickOutsude
    };
  }
};
</script>

<style lang="scss">
.i-select {
  width: 300px;

  &--disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &--readonly {
    pointer-events: none;
    opacity: 1;
  }

  &__label {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 2px;
    border-bottom: 1px solid transparent;

    &--underline {
      box-shadow: none;
      border-bottom: 1px solid rgb(105, 104, 104);
    }

    &--rounded {
      border-radius: 10px;
    }

    .chevron {
      transition: all 0.1s linear;

      &--up {
        transform: rotate(180deg);
      }
    }
  }

  .options {
    border-top: 1px solid rgb(105, 104, 104);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }

  &__option {
    padding: 10px;

    &:hover {
      background: #f0f0f0;
    }

    &.i-select__option--active {
      background: #b9b6b6;
    }
  }

  .options-enter-active,
  .options-leave-active {
    transition: opacity 0.1s ease-in;
  }

  .options-enter-from,
  .options-leave-to {
    opacity: 0;
  }
}
</style>
