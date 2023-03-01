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
      <div class="i-upload__button">{{ files ? "Change" : "Upload" }}</div>
    </label>

    <div v-for="(file, index) in files" :key="file.name" class="i-upload__file">
      <div>Название файла {{ file.name }}</div>
      <div>Вес файла {{ convertSizes(file.size) }}</div>
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
    multiple: Boolean
  },

  setup(props, { emit }) {
    let files = ref();

    const handleFile = (e) => {
      files.value = Array.from(e.target.files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      }));
    };

    const convertSizes = (size) => {
      const i = Math.floor(Math.log(size) / Math.log(1024));
      return (
        (size / Math.pow(1024, i)).toFixed(2) * 1 +
        " " +
        ["B", "kB", "MB", "GB", "TB"][i]
      );
    };

    const removeFile = (i) => {
      files.value.splice(i, 1);
    };

    watch(
      () => files.value,
      (updatedFiles) => {
        emit("file-updated", updatedFiles);
      }
    );

    return { files, handleFile, convertSizes, removeFile };
  }
};
</script>

<style lang="scss">
.i-upload {
  border: 1px solid green;
  padding: 14px;
  display: inline-block;

  &__default {
    color: black;
    visibility: hidden;
    display: none;
  }

  &__file {
    font-size: 14px;
  }

  .label {
    display: flex;
  }
}
</style>
