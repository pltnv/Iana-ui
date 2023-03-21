<template>
  <div>
    <i-checkbox v-model="testValue" label="Choose" color="red" />
    <i-button
      size="md"
      label="djgiejgiej"
      iconLeft="mdi-chevron-down"
      iconRight="mdi-chevron-down"
      iconLeftColor="green"
      color="red"
      variant="outlined"
      rounded
    ></i-button>
    <br />
    <i-tip
      id="2013"
      tip="Use it"
      open-delay="150"
      close-delay="300"
      position="bottom"
      style="margin-left: 40px"
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
      ></i-button>
    </i-tip>

    <i-notifications
      message="Item is deleted from the cart"
      type="error"
      duration="20000"
      @close="close"
    />
    <br />
    <i-upload multiple max-files="2" @file="onFileSelected" />
    <br />
    <br />
    <i-accordion
      title="What is FAQ?"
      content="It's a list of questions and answers relating to a particular subject, especially one giving basic information for users of a website"
      width="300"
      round="14"
    >
    </i-accordion>
    <br />
    <i-select v-model="selectedItem" :items="selectItems" label="Choose smth" />
    <br />
    <i-code amount="4" divider="*" type="text" />
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
import ICode from "./components/ICode/ICode.vue";

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
    ICode
  },
  setup(props, { emit }) {
    let testValue = ref(true);
    let selectedFile = ref();

    let selectedItem = ref();
    const selectItems = ref([
      { text: "First option", value: "first" },
      { text: "Second option", value: "second" },
      { text: "Third option", value: "third" }
    ]);

    const close = () => {
      alert("emit: close");
    };

    const onFileSelected = (files) => {
      selectedFile.value = files.value;
    };

    return {
      testValue,
      selectedFile,
      selectItems,
      selectedItem,

      close,
      onFileSelected
    };
  }
};
</script>

<style scoped></style>
