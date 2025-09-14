<template>
  <div class="i-upload" :class="{ 'i-upload--disabled': disabled }">
    <label class="i-upload__label">
      <input
        :id="id"
        type="file"
        :accept="accept"
        :multiple="multiple"
        class="i-upload__input"
        :disabled="disabled"
        @change="handleFile"
      />
      <!-- Drop Zone -->
      <div
        class="i-upload__drop-zone"
        :class="{ 'i-upload__drop-zone--dragging': dragging }"
        @dragover.prevent="dragging = true"
        @dragleave.prevent="dragging = false"
        @drop.prevent="handleDrop"
      >
        <div class="i-upload__drop-zone__text">
          <i class="mdi mdi-upload" />
          <span>
            {{
              files.length
                ? "Выбрать другие файлы"
                : "Перетащите файлы сюда или нажмите"
            }}
          </span>
        </div>
      </div>
    </label>

    <!-- File List -->
    <ul v-if="files.length" class="i-upload__list">
      <li
        v-for="(file, index) in files"
        :key="file.name"
        class="i-upload__item"
      >
        <i class="mdi mdi-file-outline i-upload__icon" />
        <div class="i-upload__meta">
          <span class="i-upload__name">{{ file.name }}</span>
          <span class="i-upload__size">{{ formatSize(file.size) }}</span>
        </div>
        <button
          class="i-upload__remove"
          type="button"
          @click="removeFile(index)"
          :disabled="disabled"
        >
          <i class="mdi mdi-close" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  id: String,
  accept: String,
  multiple: Boolean,
  maxFiles: Number,
  disabled: Boolean
});

const emit = defineEmits(["update:files"]);

const files = ref([]);
const dragging = ref(false);

const formatFiles = (rawFiles) =>
  [...rawFiles].map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified
  }));

const formatSize = (size) => {
  if (!size) return "0 B";
  const units = ["B", "kB", "MB", "GB", "TB"];
  const deg = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, deg)).toFixed(1) + " " + units[deg];
};

const handleFile = (e) => {
  if (props.disabled) return;
  const selected = e.target.files;
  if (props.maxFiles && selected.length > props.maxFiles) return;
  files.value = formatFiles(selected);
};

const handleDrop = (e) => {
  if (props.disabled) return;
  const dropped = e.dataTransfer.files;
  if (props.maxFiles && dropped.length > props.maxFiles) return;
  dragging.value = false;
  files.value = formatFiles(dropped);
};

const removeFile = (i) => {
  if (props.disabled) return;
  files.value.splice(i, 1);
};

watch(
  () => files.value,
  (val) => {
    emit("update:files", val);
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.i-upload {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 280px;
  font-size: 14px;

  &--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  &__label {
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }

  &__input {
    display: none;
  }

  &__drop-zone {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border: 2px dashed #3b82f6;
    border-radius: 8px;
    background: #f9fafb;
    transition: background 0.2s, border-color 0.2s;

    &__text {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      color: #6b7280;
      font-size: 13px;

      i {
        font-size: 24px;
        color: #3b82f6;
      }
    }

    &:hover {
      background: #f3f4f6;
    }

    &--dragging {
      background: #dbeafe;
      border-color: #2563eb;
    }
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    border-top: 1px solid #e5e7eb;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 8px 0;
    gap: 8px;
    border-bottom: 1px solid #f3f4f6;
  }

  &__icon {
    font-size: 20px;
    color: #6b7280;
  }

  &__meta {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &__name {
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__size {
    font-size: 12px;
    color: #6b7280;
  }

  &__remove {
    background: none;
    border: none;
    cursor: pointer;
    color: #ef4444;
    font-size: 16px;

    &:hover {
      color: #b91c1c;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
}
</style>
