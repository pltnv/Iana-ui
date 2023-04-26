<template>
  <div
    :id="id"
    :name="name"
    class="i-slider"
    :class="{ 'i-slider--disabled': disabled }"
  >
    <div v-for="(slide, i) in items" :key="`slide-${i}`" class="slider">
      <div v-if="i === activeSlideIndex" class="i-slider__slide">
        <img :src="slide.src" />

        <div class="icon-wrapper">
          <i
            class="i-slider__button i-slider__button--prev mdi mdi-chevron-left"
            @click="setPrevSlide"
          />
        </div>
        <div class="icon-wrapper">
          <i
            class="i-slider__button i-slider__button--next mdi mdi-chevron-right"
            @click="setNextSlide"
          />
        </div>
      </div>
    </div>

    <div v-if="controller" class="controllers">
      <div
        v-for="(_, i) in items.length"
        :key="`controller-${i}`"
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
import { ref } from "vue";

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
    loop: Boolean,
    controller: Boolean,
    count: String || Number
  },
  emits: ["update:modelValue"],

  setup(props, { emit }) {
    let activeSlideIndex = ref(0);

    const setActiveSlide = (i) => {
      if (props.readonly) return;

      activeSlideIndex.value = i;
    };

    const setPrevSlide = () => {
      if (props.readonly) return;

      if (activeSlideIndex.value <= 0) {
        if (props.loop) {
          activeSlideIndex.value = props.items.length - 1;
          return;
        }
        return;
      }
      activeSlideIndex.value -= 1;
    };

    const setNextSlide = () => {
      if (props.readonly) return;

      if (activeSlideIndex.value >= props.items.length - 1) {
        if (props.loop) {
          activeSlideIndex.value = 0;
          return;
        }
        return;
      }
      activeSlideIndex.value += 1;
    };

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
  width: 200px;
  height: 200px;

  &--disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  .slider {
    width: 100%;
  }

  &__slide {
    position: relative;
    width: 100%;
    color: red;

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }

  &__button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    color: rgb(118, 113, 113);
    font-size: 40px;

    &:hover {
      cursor: pointer;
    }

    &--prev {
      left: 0;
      transform: translateX(-50%) translateY(-50%);
    }

    &--next {
      right: 0;
      transform: translateX(50%) translateY(-50%);
    }
  }

  .controllers {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }

  &__controller {
    width: 14px;
    height: 14px;
    background: rgb(227, 222, 222);
    border-radius: 50%;
    color: transparent;

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
