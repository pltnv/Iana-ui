<template>
  <div :id="id" :name="name" class="i-slider">
    <div v-for="(slide, i) in items" :key="slide" class="container">
      <div v-if="i === activeSlideIndex" class="i-slider__slide">
        {{ slide.text }}
      </div>
    </div>
    <button @click="setPrevSlide">orev</button>
    <button @click="setNextSlide">next</button>
    <div v-if="controller" class="controllers">
      <div
        v-for="(el, i) in items.length"
        :key="i"
        class="i-slider__controller"
        :class="{ 'i-slider__controller--active': i === activeSlideIndex }"
        @click="setActiveSlide(i)"
      >
        {{ i }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "ISlider",
  props: {
    id: String,
    name: String,
    modelValue: String,
    items: Array,
    disabled: Boolean,
    readonly: Boolean,
    block: Boolean,
    variant: {
      type: String,
      default: "default",
      validator: (value) => {
        return ["default", "underline"].indexOf(value) !== -1;
      }
    },
    controller: Boolean,
    count: String || Number
  },
  emits: ["update:modelValue"],

  setup(props, { emit }) {
    let activeSlideIndex = ref("");

    let setActiveSlide = (i) => {
      activeSlideIndex.value = i;
      console.log(activeSlideIndex.value);
    };

    let setPrevSlide = () => {
      if (activeSlideIndex.value <= 0) return;
      activeSlideIndex.value -= 1;
      console.log("prev");
    };

    let setNextSlide = () => {
      if (activeSlideIndex.value >= props.items.length - 1) return;
      activeSlideIndex.value += 1;
      console.log("next");
    };

    onMounted(() => {
      activeSlideIndex.value = 0;
    });

    return {
      activeSlideIndex,
      setActiveSlide,
      setNextSlide,
      setPrevSlide
    };
  }
};
</script>

<style lang="scss">
.i-slider {
  color: gray;

  &__slide {
    color: red;
  }

  .controllers {
    display: flex;
    flex-direction: row;
    gap: 4px;
  }

  &__controller {
    background: rgb(227, 222, 222);
    color: transparent;
    border-radius: 50%;
    width: 14px;
    height: 14px;

    &:hover {
      background: rgb(174, 170, 170);
    }

    &--active {
      background: rgb(76, 74, 74);

      &:hover {
        background: rgb(76, 74, 74);
      }
    }
  }
}
</style>
