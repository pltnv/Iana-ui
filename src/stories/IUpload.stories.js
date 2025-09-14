import IUpload from "../components/IUpload/IUpload.vue";

export default {
  title: "Components/I-Upload",
  component: IUpload,
  tags: ["autodocs"],
  argTypes: {
    accept: {
      control: "text",
      description: `Разрешенные типы файлов.
    Примеры:
    - ".pdf" (по расширению)
    - "application/pdf" (по MIME)
    - "image/*" (все изображения)
    - ".jpg,.png" (несколько форматов)`
    },
    multiple: {
      control: "boolean",
      description: "Можно выбрать несколько файлов"
    },
    maxFiles: {
      control: "number",
      description: "Максимальное количество файлов (если multiple)"
    },
    disabled: {
      control: "boolean",
      description: "Отключает загрузку"
    },
    onUpdateFiles: { action: "update:files" }
  },
  args: {
    accept: "",
    multiple: false,
    maxFiles: 3,
    disabled: false
  },
  parameters: {
    layout: "centered"
  }
};

export const Default = {
  args: {}
};

export const Multiple = {
  args: {
    multiple: true,
    label: "Загрузите несколько файлов"
  }
};

export const WithLimit = {
  args: {
    multiple: true,
    maxFiles: 2
  }
};

export const Disabled = {
  args: {
    disabled: true
  }
};
