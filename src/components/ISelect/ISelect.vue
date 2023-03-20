<template>
  <div :id="id" class="i-select">
    <div class="i-select__label" @click="toggleShowOptions">
      {{ label }}
      <div class="chevron" :class="{ 'chevron--up': showOptions }">
        <i class="mdi mdi-chevron-down" />
      </div>
    </div>
    <template v-if="showOptions">
      <div
        v-for="item in items"
        :key="item.value"
        class="i-select__options"
        @click="selectItem(item.value)"
      >
        {{ item.text }}
      </div>
    </template>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ISelect",
  props: {
    id: String,
    modelValue: String,
    message: String,
    label: String,
    multiple: Boolean,
    maxWidth: String,
    minWidth: String,
    variant: {
      type: String,
      default: "default",
      validator: (value) => {
        return ["default", "flat", "outlined"].indexOf(value) !== -1;
      }
    },
    clearable: Boolean,
    items: Array
  },
  emits: ["update:modelValue"],

  setup(props, { emit }) {
    let showOptions = ref(false);

    const selectItem = (itemValue) => {
      console.log(itemValue);
      emit("update:modelValue", itemValue);
    };

    const toggleShowOptions = () => {
      showOptions.value = !showOptions.value;
    };

    return { showOptions, toggleShowOptions, selectItem };
  }
};
</script>

<style lang="scss">
.i-select {
  width: 300px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 2px;

  &__label {
    display: flex;
    justify-content: space-between;

    .chevron {
      transition: all 0.1s linear;

      &--up {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
