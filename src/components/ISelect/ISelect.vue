<template>
  <div
    :id="id"
    :name="name"
    class="i-select"
    :class="{ 'i-select--disabled': disabled, 'i-select--readonly': readonly }"
  >
    <div class="i-select__label" @click="toggleShowOptions">
      <div v-if="selectedItem" v-text="selectedItem" />
      <div v-else>{{ label }}</div>
      <div class="chevron" :class="{ 'chevron--up': showOptions }">
        <i class="mdi mdi-chevron-down" />
      </div>
    </div>
    <div v-if="showOptions" class="options">
      <div
        v-for="item in items"
        :key="item.value"
        class="i-select__option"
        @click="selectItem(item.value)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, toRef } from "vue";

export default {
  name: "ISelect",
  props: {
    id: String,
    name: String,
    modelValue: String,
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
        return ["default", "flat", "outlined"].indexOf(value) !== -1;
      }
    },
    clearable: Boolean
  },
  emits: ["update:modelValue"],

  setup(props, { emit }) {
    let showOptions = ref(false);
    let selectedItem = ref(props.modelValue || "");
    let modelValueRef = toRef(props, "modelValue");

    const selectItem = (itemValue) => {
      selectedItem.value = itemValue;
      showOptions.value = false;
      emit("update:modelValue", itemValue);
    };

    const toggleShowOptions = () => {
      showOptions.value = !showOptions.value;
    };

    watch(modelValueRef, (updatedmodelValueRef) => {
      selectedItem.value = updatedmodelValueRef;
    });

    return {
      showOptions,
      selectedItem,
      modelValueRef,

      toggleShowOptions,
      selectItem
    };
  }
};
</script>

<style lang="scss">
.i-select {
  width: 300px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 2px;

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

    .chevron {
      transition: all 0.1s linear;

      &--up {
        transform: rotate(180deg);
      }
    }
  }

  .options {
    border-top: 1px solid rgb(105, 104, 104);
  }

  &__option {
    padding: 10px;

    &:hover {
      background: #f0f0f0;
    }
  }
}
</style>
