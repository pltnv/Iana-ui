<template>
  <div class="i-upload">
    <label class="label">
      <input
        :id="id"
        type="file"
        :accept="accept"
        :multiple="multiple"
        @change="handleFile($event)"
        class="i-upload__default"
      />
      <div
        class="i-upload__drop"
        :class="{ 'i-upload__drop--dragging': dragging }"
        @dragover.prevent="dragging = true"
        @dragleave.prevent="dragging = false"
        @drop.prevent="handleDrop"
      >
        <div class="i-upload__drop__button">
          {{ files ? "Change" : "Upload" }}
        </div>
      </div>
    </label>

    <div v-for="(file, index) in files" :key="file.name" class="i-upload__info">
      <div>Название файла {{ file.name }}</div>
      <div>Вес файла {{ formatSize(file.size) }}</div>
      <div class="mdi mdi-close" @click="removeFile(index)" />
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "IUpload",
  props: {
    id: String,
    accept: String,
    multiple: Boolean,
    maxFiles: String
  },

  setup(props, { emit }) {
    let files = ref();
    let dragging = ref(false);

    const formatFiles = (rawObjectFiles) => {
      return Array.from(rawObjectFiles).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      }));
    };

    const formatSize = (size) => {
      const deg = Math.floor(Math.log(size) / Math.log(1024));
      return (
        (size / Math.pow(1024, deg)).toFixed(2) * 1 +
        " " +
        ["B", "kB", "MB", "GB", "TB"][deg]
      );
    };

    const checkFileCount = (filesFromEvent, limit) => {
      if (props.multiple && Array.from(filesFromEvent).length > limit) {
        return true;
      }
      return false;
    };

    const handleFile = (e) => {
      if (checkFileCount(e.target.files, props.maxFiles)) {
        return;
      }
      files.value = formatFiles(e.target.files);
    };

    const handleDrop = (e) => {
      if (checkFileCount(e.dataTransfer.files, props.maxFiles)) {
        return;
      }
      dragging.value = false;
      files.value = formatFiles(e.dataTransfer.files);
    };

    const removeFile = (i) => {
      files.value.splice(i, 1);
    };

    watch(
      () => files.value,
      (updatedFiles) => {
        emit("file", updatedFiles);
      }
    );

    return {
      files,
      dragging,

      formatFiles,
      formatSize,
      checkFileCount,
      handleFile,
      handleDrop,
      removeFile
    };
  }
};
</script>

<style lang="scss">
.i-upload {
  display: inline-block;
  padding: 14px;
  border-radius: 14px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 4px;

  &--disabled {
    cursor: not-allowed;
  }

  &__default {
    color: black;
    visibility: hidden;
    display: none;
  }

  &__drop {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    background: rgb(231, 227, 227);
    background-clip: padding-box;
    border: 1px dashed #4ad4d2;

    &--dragging {
      background: red;
      background-clip: padding-box;
    }
  }

  &__info {
    font-size: 14px;
  }

  .label {
    display: flex;
  }
}
</style>
