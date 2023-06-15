<template>
  <div
    :id="id"
    :name="name"
    class="i-overlay"
    :style="{ backgroundColor: color, opacity: opacity, zIndex: zIndex }"
  />
</template>

<script>
export default {
  name: "IOverlay",
  props: {
    id: String,
    name: String,
    opacity: String,
    color: {
      type: String,
      default: "rgba(0, 0, 0, 0.3)"
    },
    zIndex: {
      type: String,
      default: "1"
    }
  }
};
</script>

<style lang="scss">
.i-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
