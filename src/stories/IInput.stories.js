import IInput from "../components/IInput/IInput.vue";

export default {
  title: "Components/I-Input",
  component: IInput,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      control: "text",
      description: "Текущее значение поля ввода (v-model)"
    },
    label: {
      control: "text",
      description: "Подпись для поля ввода"
    },
    placeholder: {
      control: "text",
      description: "Текст-подсказка внутри поля"
    },
    variant: {
      control: { type: "select" },
      options: ["default", "outlined", "underline"],
      description: "Вариант отображения инпута"
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md"],
      description: "Размер поля"
    },
    type: {
      control: { type: "select" },
      options: ["text", "phone", "email", "password", "number"],
      description: "Тип инпута"
    },
    clearable: {
      control: "boolean",
      description: "Кнопка очистки текста"
    },
    count: {
      control: "boolean",
      description: "Отображать счетчик введенных символов"
    },
    maxlength: {
      control: "number",
      description: "Максимальное количество символов"
    },
    block: {
      control: "boolean",
      description: "Инпут занимает всю ширину"
    },
    disabled: {
      control: "boolean",
      description: "Отключает ввод"
    },
    readonly: {
      control: "boolean",
      description: "Делает поле только для чтения"
    },
    required: {
      control: "boolean",
      description: "Помечает поле как обязательное"
    },
    error: {
      control: "boolean",
      description: "Флаг ошибки"
    },
    errorMessage: {
      control: "text",
      description: "Сообщение об ошибке"
    },
    // События
    onUpdateModelValue: { action: "update:modelValue" },
    onBlur: { action: "blur" },
    onFocus: { action: "focus" }
  },
  args: {
    modelValue: "",
    label: "Label",
    placeholder: "Введите текст...",
    variant: "default",
    size: "sm",
    type: "text",
    clearable: false,
    count: false,
    maxlength: 50,
    block: false,
    disabled: false,
    readonly: false,
    required: false,
    error: false,
    errorMessage: ""
  }
};

// ---------- Stories ----------

export const Default = {
  args: {
    label: "Имя",
    placeholder: "Введите имя"
  }
};

export const Outlined = {
  args: {
    variant: "outlined",
    label: "Email",
    placeholder: "Введите email",
    type: "email"
  }
};

export const Underline = {
  args: {
    variant: "underline",
    label: "Телефон",
    placeholder: "+7 (___) ___-__-__",
    type: "phone"
  }
};

export const WithPasswordToggle = {
  args: {
    label: "Пароль",
    placeholder: "Введите пароль",
    type: "password",
    clearable: true
  }
};

export const WithCounter = {
  args: {
    label: "Комментарий",
    placeholder: "Введите текст...",
    maxlength: 100,
    count: true,
    clearable: true,
    block: true
  }
};

export const WithError = {
  args: {
    label: "Email",
    placeholder: "Введите email",
    type: "email",
    error: true,
    errorMessage: "Некорректный email"
  }
};

export const Disabled = {
  args: {
    label: "Отключенное поле",
    placeholder: "Ввод недоступен",
    disabled: true
  }
};
