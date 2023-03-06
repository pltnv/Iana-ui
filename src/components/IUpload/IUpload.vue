<template>
  <div class="i-upload">
    <label class="label">
      <input
        :id="id"
        type="file"
        :accept="accept"
        :multiple="multiple"
        class="i-upload__default"
        @change="handleFile($event)"
      />
      <div
        class="i-upload__drop-zone"
        :class="{ 'i-upload__drop-zone--dragging': dragging }"
        @dragover.prevent="dragging = true"
        @dragleave.prevent="dragging = false"
        @drop.prevent="handleDrop"
      >
        <div class="i-upload__drop-zone__button">
          {{
            files ? "Change files" : "Drag some files here, or click to select"
          }}
        </div>
      </div>
    </label>

    <div v-for="(file, index) in files" :key="file.name" class="i-upload__info">
      <div>Name {{ file.name }}</div>
      <div>Size {{ formatSize(file.size) }}</div>
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
      return [...rawObjectFiles].map((file) => {
        return {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified
        };
      });
    };

    const formatSize = (size) => {
      const deg = Math.floor(Math.log(size) / Math.log(1024));
      return (
        (size / Math.pow(1024, deg)).toFixed(2) * 1 +
        " " +
        ["B", "kB", "MB", "GB", "TB"][deg]
      );
    };

    const checkFileCount = (dragEventFiles, limit) => {
      if (props.multiple && [...dragEventFiles].length > limit) {
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
    visibility: hidden;
    position: absolute;
  }

  &__drop-zone {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    padding: 10px;
    background: rgb(231, 227, 227);
    background-clip: padding-box;
    border: 1px dashed #4ad4d2;
    cursor: pointer;

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
