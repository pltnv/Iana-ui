<template>
  <div class="container">
    <i-checkbox v-model="testValue" label="Choose" color="red" />

    <i-button
      size="md"
      label="button"
      iconLeft="mdi-chevron-down"
      iconRight="mdi-chevron-down"
      iconLeftColor="green"
      color="red"
      variant="text"
      rounded
      @click="click"
    />

    <div class="tip">
      <i-tip
        id="2013"
        tip="Use it"
        open-delay="150"
        close-delay="300"
        position="bottom"
        min-width="10px"
        max-width="100px"
      >
        <template #tip> Keep trying keep keep keep keep keep</template>
        <i-button
          size="md"
          label="Show me a tip"
          iconLeftColor="green"
          color="red"
          variant="outlined"
          rounded
        />
      </i-tip>
    </div>

    <i-notifications
      message="Item is deleted from the cart"
      type="error"
      duration="20000"
      @close="close"
    />

    <i-upload multiple max-files="2" @file="onFileSelected" />

    <i-accordion
      title="What is FAQ?"
      content="It's a list of questions and answers relating to a particular subject, especially one giving basic information for users of a website"
      width="300"
      round="8"
      block
    />

    <i-select
      v-model="selectedItem"
      :items="selectItems"
      label="Choose smth"
      multiple
    />

    <IOTPInput
      v-model="otp"
      amount="4"
      divider="*"
      type="text"
      size="md"
      border-color="green"
    />

    <i-input
      v-model="inputValue"
      maxlength="100"
      variant="outlined"
      count
      clearable
    />

    <i-slider count="6" controller :items="sliderItems" loop />
    <i-overlay v-if="showOverlay" />
    <i-modal
      v-if="showModal"
      v-model="showModal"
      size="md"
      title="Some text"
      showAcceptButton
      showCancelButton
      shadowEffect
    >
      fiejfioj34ifoj34ofj314oijfg34iojgfio43jfio
      <br />
      fiejfioj34ifoj34ofj314oijfg34iojgfio43jfio
      <br />
      fiejfioj34ifoj34ofj314oijfg34iojgfio43jfio
      <br />
      fiejfioj34ifoj34ofj314oijfg34iojgfio43jfio
      <br />
      fiejfioj34ifoj34ofj314oijfg34iojgfio43jfio
      <br />
      fiejfioj34ifoj34ofj314oijfg34iojgfio43jfio
      <br />
      fiejfioj34ifoj34ofj314oijfg34iojgfio43jfio
      <br />
      fiejfioj34ifoj34ofj314oijfg34iojgfio43jfio
      <br />
      <br />
      fiejfioj34ifoj34ofj314oijfg34iojgfio43jfio
      <br />
      fiejfioj34ifoj34ofj314oijfg34iojgfio43jfio
      <br />
      fiejfioj34ifoj34ofj314oijfg34iojgfio43jfio
    </i-modal>
    <button @click="showModal = true" />
  </div>
</template>

<script>
import { ref } from "vue";
import ICheckbox from "./components/ICheckbox/ICheckbox.vue";
import IButton from "./components/IButton/IButton.vue";
import ITip from "./components/ITip/ITip.vue";
import INotifications from "./components/INotifications/INotifications.vue";
import IUpload from "./components/IUpload/IUpload.vue";
import IAccordion from "./components/IAccordion/IAccordion.vue";
import ISelect from "./components/ISelect/ISelect.vue";
import IOTPInput from "./components/IOTPInput/IOTPInput.vue";
import IInput from "./components/IInput/IInput.vue";
import ISlider from "./components/ISlider/ISlider.vue";
import IModal from "./components/IModal/IModal.vue";
import IOverlay from "./components/IOverlay/IOverlay.vue";

export default {
  name: "App.vue",
  components: {
    ICheckbox,
    IButton,
    ITip,
    INotifications,
    IUpload,
    IAccordion,
    ISelect,
    IOTPInput,
    IInput,
    ISlider,
    IModal,
    IOverlay
  },
  setup(props, { emit }) {
    let testValue = ref(true);
    let selectedFile = ref();
    let otp = ref("123355");

    let selectedItem = ref({ text: "Third option", value: "third" });
    const selectItems = ref([
      { text: "Choose smth", value: "" },
      { text: "First option", value: "first" },
      { text: "Second option", value: "second" },
      { text: "Third option", value: "third" }
    ]);

    let inputValue = ref("text");

    const sliderItems = ref([
      { text: "f", src: "../src/assets/sliderImages/1.jpeg", alt: "first" },
      {
        text: "s",
        src: "../src/assets/sliderImages/2.png",
        alt: "second"
      },
      { text: "th", src: "../src/assets/sliderImages/3.jpeg", alt: "third" }
    ]);

    let showOverlay = ref(false);
    let showModal = ref(false);

    const close = () => {
      alert("emit: close");
    };

    const click = () => {
      alert("emit: click");
    };

    const onFileSelected = (files) => {
      selectedFile.value = files.value;
    };

    return {
      testValue,
      selectedFile,
      selectItems,
      selectedItem,
      otp,
      inputValue,
      sliderItems,
      showOverlay,
      showModal,
      close,
      click,
      onFileSelected
    };
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .tip {
    width: 130px;
    margin-left: 40px;
  }
}
</style>
