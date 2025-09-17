import { ref } from "vue";
import OTPInput from "../components/IOTPInput/IOTPInput.vue";

export default {
  title: "Components/I-OTPInput",
  component: OTPInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**I-OTPInput** — компонент для ввода одноразовых кодов (OTP).  
Поддерживает разные размеры, типы ввода (\`number\`, \`text\`, \`password\`), количество цифр и обработку ошибок.  
Можно использовать для подтверждения входа, двухфакторной аутентификации или верификации действий пользователя.
        `
      }
    }
  },
  argTypes: {
    modelValue: {
      control: "text",
      description: "Текущее значение OTP (двухстороннее связывание)"
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Размер полей ввода"
    },
    type: {
      control: { type: "select" },
      options: ["number", "text", "password"],
      description: "Тип ввода для каждой ячейки"
    },
    digits: {
      control: { type: "number", min: 4, max: 8 },
      description: "Количество цифр (ячейки для ввода)"
    },
    disabled: {
      control: "boolean",
      description: "Отключает ввод"
    },
    readonly: {
      control: "boolean",
      description: "Делает поля только для чтения"
    },
    autoFocus: {
      control: "boolean",
      description: "Фокусируется на первой ячейке при монтировании"
    },
    errorMessage: {
      control: "text",
      description: "Сообщение об ошибке, отображается под полями"
    },
    onUpdateModelValue: {
      action: "update:modelValue",
      description: "Вызывается при изменении значения",
      table: { category: "Events" }
    },
    onComplete: {
      action: "complete",
      description: "Срабатывает, когда пользователь заполнил все поля",
      table: { category: "Events" }
    },
    onFocus: {
      action: "focus",
      description: "Фокус на одном из полей",
      table: { category: "Events" }
    },
    onBlur: {
      action: "blur",
      description: "Потеря фокуса поля",
      table: { category: "Events" }
    }
  },
  args: {}
};

const Template = (args) => ({
  components: { OTPInput },
  setup() {
    return { args };
  },
  template: '<OTPInput v-bind="args" />'
});

export const Default = Template.bind({});
Default.args = {
  modelValue: "",
  digits: 6,
  size: "md",
  type: "number"
};
Default.parameters = {
  docs: {
    description: {
      story: "Базовый пример OTPInput с 6 цифрами и числовым вводом."
    }
  }
};

export const Small = Template.bind({});
Small.args = { ...Default.args, size: "sm" };
Small.parameters = {
  docs: {
    description: {
      story: "OTPInput с маленьким размером ячеек (`sm`)."
    }
  }
};

export const Large = Template.bind({});
Large.args = { ...Default.args, size: "lg" };
Large.parameters = {
  docs: {
    description: {
      story: "OTPInput с большим размером ячеек (`lg`)."
    }
  }
};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = { ...Default.args, modelValue: "123456" };
WithInitialValue.parameters = {
  docs: {
    description: {
      story: "Инициализирован значением `123456`."
    }
  }
};

export const Disabled = Template.bind({});
Disabled.args = { ...Default.args, disabled: true, modelValue: "123456" };
Disabled.parameters = {
  docs: {
    description: {
      story:
        "Компонент в состоянии `disabled`, пользователь не может вводить значения."
    }
  }
};

export const Readonly = Template.bind({});
Readonly.args = { ...Default.args, readonly: true, modelValue: "123456" };
Readonly.parameters = {
  docs: {
    description: {
      story:
        "Компонент в режиме `readonly`, отображает значение, но не даёт редактировать."
    }
  }
};

export const WithError = Template.bind({});
WithError.args = { ...Default.args, errorMessage: "Invalid verification code" };
WithError.parameters = {
  docs: {
    description: {
      story: "Пример отображения ошибки под полями."
    }
  }
};

export const FourDigits = Template.bind({});
FourDigits.args = { ...Default.args, digits: 4 };
FourDigits.parameters = {
  docs: {
    description: {
      story: "OTPInput с 4 цифрами."
    }
  }
};

export const EightDigits = Template.bind({});
EightDigits.args = { ...Default.args, digits: 8 };
EightDigits.parameters = {
  docs: {
    description: {
      story: "OTPInput с 8 цифрами."
    }
  }
};

export const PasswordType = Template.bind({});
PasswordType.args = { ...Default.args, type: "password" };
PasswordType.parameters = {
  docs: {
    description: {
      story: "Ячейки отображаются как пароли (●●●)."
    }
  }
};

export const TextType = Template.bind({});
TextType.args = { ...Default.args, type: "text" };
TextType.parameters = {
  docs: {
    description: {
      story: "Ячейки отображают вводимый текст (обычный режим)."
    }
  }
};

export const WithoutAutoFocus = Template.bind({});
WithoutAutoFocus.args = { ...Default.args, autoFocus: false };
WithoutAutoFocus.parameters = {
  docs: {
    description: {
      story: "Фокус не устанавливается автоматически на первую ячейку."
    }
  }
};

export const InteractiveDemo = (args) => ({
  components: { OTPInput },
  setup() {
    const otpValue = ref("");
    const errorMessage = ref("");

    const handleComplete = (value) => {
      console.log("OTP completed:", value);
      if (value === "123456") {
        errorMessage.value = "";
        alert("Verification successful!");
      } else {
        errorMessage.value = "Invalid code. Try 123456";
      }
    };

    const handleUpdate = (value) => {
      otpValue.value = value;
    };

    return { args, otpValue, errorMessage, handleComplete, handleUpdate };
  },
  template: `
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px; margin: 0 auto;">
      <div>
        <h3>Interactive OTP Input Demo</h3>
        <p>Try entering: <strong>123456</strong> for success</p>
        <p>Current value: {{ otpValue }}</p>
      </div>
      
      <OTPInput
        v-bind="args"
        :model-value="otpValue"
        :error-message="errorMessage"
        @update:model-value="handleUpdate"
        @complete="handleComplete"
      />
      
      <div style="display: flex; gap: 10px;">
        <button @click="otpValue = ''; errorMessage = ''" style="padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 6px;">
          Clear
        </button>
        <button @click="otpValue = '123456'" style="padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 6px;">
          Auto-fill (123456)
        </button>
      </div>
    </div>
  `
});
InteractiveDemo.args = { ...Default.args };
InteractiveDemo.parameters = {
  docs: {
    description: {
      story:
        "Интерактивная демо-версия: при вводе `123456` появляется успешное сообщение, иначе отображается ошибка."
    }
  }
};
