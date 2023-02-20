<template>
  <div class="i-checkbox" :style="{ color: color }">
    <label class="label">
      <input type="checkbox" class="i-checkbox__default" :checked="modelValue" :disabled="disabled"
        @change="updateValue($event.target.checked)" />
      <span class="i-checkbox__custom"></span>
      {{ label }}
    </label>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'ICheckbox',
  props: {
    label: String,
    modelValue: Boolean,
    color: String,
    disabled: Boolean,
    ripple: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    function updateValue(newValue) {
      emit('update:modelValue', newValue)
    }

    return {
      updateValue
    }
  }
}
</script>


<style>
.i-checkbox {
  display: inline-block;
  padding: 4px 4px 4px 4px;
}

.i-checkbox__default {
  position: absolute;
  -webkit-appearance: none;
  appearance: none;
}

.i-checkbox__custom {
  position: relative;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 5px;
  border: 2px solid gray;
  text-align: left;
  margin-right: 10px;
}

.i-checkbox__custom::before {
  content: '✔';
  text-align: center;
  position: absolute;
  left: 10%;
  top: 10%;
  width: 3px;
  height: 3px;
  transition: 0.1s ease-out;
  opacity: 0;
}


.i-checkbox__default:checked+.i-checkbox__custom::before {
  opacity: 1;
}

.i-checkbox__default:disabled+.i-checkbox__custom {
  opacity: 0.2;
  border: 2px solid #4f4f4f;
}

.i-checkbox__default:checked .i-checkbox__default:disabled+.i-checkbox__custom::before {
  opacity: 1;
}

.label {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>