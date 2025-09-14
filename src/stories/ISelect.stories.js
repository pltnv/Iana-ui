import ISelect from "../components/ISelect/ISelect.vue";

export default {
  title: "Components/I-Select",
  component: ISelect,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      control: "object",
      description: "Выбранный объект { text, value }"
    },
    items: {
      control: "object",
      description: "Список опций [{ text, value }]"
    },
    label: {
      control: "text",
      description: "Текст placeholder (если не выбран item)"
    },
    variant: {
      control: { type: "select" },
      options: ["default", "underline"],
      description: "Вид оформления"
    },
    type: {
      control: { type: "select" },
      options: ["default", "rounded"],
      description: "Форма инпута"
    },
    block: { control: "boolean", description: "На всю ширину" },
    disabled: { control: "boolean", description: "Отключает выбор" },
    readonly: { control: "boolean", description: "Только для чтения" },
    clearable: { control: "boolean", description: "Очистка выбора (WIP)" },
    onUpdateModelValue: { action: "update:modelValue" }
  },
  args: {
    items: [
      { text: "Первый", value: 1 },
      { text: "Второй", value: 2 },
      { text: "Третий", value: 3 }
    ],
    label: "Выберите значение",
    variant: "default",
    type: "default",
    block: false,
    disabled: false,
    readonly: false
  }
};

export const Default = {
  args: {
    label: "Выберите город"
  }
};

export const WithSelected = {
  args: {
    modelValue: { text: "Второй", value: 2 }
  }
};

export const Underline = {
  args: {
    variant: "underline",
    label: "Подчеркнутый select"
  }
};

export const Rounded = {
  args: {
    type: "rounded",
    label: "Округлый select"
  }
};

export const Disabled = {
  args: {
    disabled: true,
    label: "Отключено"
  }
};

export const Block = {
  args: {
    block: true,
    label: "Select на всю ширину"
  }
};
