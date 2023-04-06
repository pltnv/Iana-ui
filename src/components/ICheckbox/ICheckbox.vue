<template>
  <div class="i-checkbox" :id="id" :name="name" :style="{ color: color }">
    <label class="label">
      <input
        type="checkbox"
        class="i-checkbox__default"
        :checked="modelValue"
        :disabled="disabled"
        @change="updateValue($event.target.checked)"
      />
      <span class="i-checkbox__custom" />
      <div v-text="label" />
    </label>
  </div>
</template>

<script>
export default {
  name: "ICheckbox",
  props: {
    id: String,
    name: String,
    label: String,
    modelValue: Boolean,
    color: String,
    disabled: { type: Boolean, default: false },
    ripple: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    function updateValue(newValue) {
      emit("update:modelValue", newValue);
    }

    return {
      updateValue
    };
  }
};
</script>

<style lang="scss">
.i-checkbox {
  display: inline-block;
  padding: 4px;

  &__default {
    position: absolute;
    -webkit-appearance: none;
    appearance: none;

    &:checked + .i-checkbox__custom::after {
      width: 0;
      height: 0;
    }

    &:checked + .i-checkbox__custom:hover::after {
      width: 40px;
      height: 40px;
    }

    &:checked + .i-checkbox__custom::before {
      opacity: 1;
    }

    &:disabled + .i-checkbox__custom {
      opacity: 0.2;
      border: 2px solid #4f4f4f;

      &:checked + .i-checkbox__default + .i-checkbox__custom::before {
        opacity: 1;
      }
    }
  }

  &__custom {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    border: 1px solid #807c7c;
    margin-right: 10px;
    background: white;
    text-align: left;
    cursor: pointer;

    &::before {
      content: "✔";
      position: absolute;
      left: 10%;
      top: 10%;
      width: 3px;
      height: 3px;
      text-align: center;
      transition: 0.1s ease-out;
      opacity: 0;
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.2);
      transform: translate(-50%, -50%);
      transition: width 0.1s, height 0.1s;
      pointer-events: none;
      opacity: 0.8;
    }

    &:hover::after {
      width: 44px;
      height: 44px;
    }
  }

  .label {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
  }
}
</style>
