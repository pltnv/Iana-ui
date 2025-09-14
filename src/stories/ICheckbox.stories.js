import ICheckbox from "../components/ICheckbox/ICheckbox.vue";

export default {
  title: "Components/I-Checkbox",
  component: ICheckbox,
  parameters: {
    docs: {
      description: {
        component: `I-Checkbox - компонент чекбокса с поддержкой различных размеров, цветов и состояний`
      }
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#1f2937" },
        { name: "light", value: "#ffffff" }
      ]
    }
  },
  argTypes: {
    modelValue: {
      description: "Значение чекбокса (v-model)",
      control: { type: "boolean" },
      table: {
        category: "Props",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" }
      }
    },
    label: {
      description: "Текст лейбла чекбокса",
      control: { type: "text" },
      table: {
        category: "Props",
        type: { summary: "string" },
        defaultValue: { summary: "''" }
      }
    },
    size: {
      description: "Размер чекбокса",
      control: { type: "select" },
      options: ["small", "medium", "large"],
      table: {
        category: "Props",
        type: { summary: "string" },
        defaultValue: { summary: "'medium'" }
      }
    },
    color: {
      description: "Цвет чекбокса в активном состоянии",
      control: { type: "color" },
      table: {
        category: "Props",
        type: { summary: "string" },
        defaultValue: { summary: "'#10b981'" }
      }
    },
    hoverColor: {
      description: "Цвет чекбокса при наведении",
      control: { type: "color" },
      table: {
        category: "Props",
        type: { summary: "string" },
        defaultValue: { summary: "'#059669'" }
      }
    },
    disabled: {
      description: "Отключенное состояние чекбокса",
      control: { type: "boolean" },
      table: {
        category: "Props",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" }
      }
    },
    id: {
      description: "HTML id атрибут",
      control: { type: "text" },
      table: {
        category: "Props",
        type: { summary: "string" },
        defaultValue: { summary: "undefined" }
      }
    },
    name: {
      description: "HTML name атрибут",
      control: { type: "text" },
      table: {
        category: "Props",
        type: { summary: "string" },
        defaultValue: { summary: "undefined" }
      }
    },
    "update:modelValue": {
      description: "Событие изменения значения чекбокса",
      action: "update:modelValue",
      table: {
        category: "Events",
        type: { summary: "(value: boolean) => void" }
      }
    }
  },
  tags: ["autodocs"]
};

const Template = (args) => ({
  components: { ICheckbox },
  setup() {
    return { args };
  },
  template: `
    <ICheckbox v-bind="args" @update:modelValue="args['update:modelValue']" />
  `
});

export const Default = Template.bind({});
Default.args = {
  label: "Checkbox label",
  modelValue: false
};
Default.parameters = {
  docs: {
    description: {
      story: "Базовый пример использования чекбокса с лейблом."
    }
  }
};

export const Checked = Template.bind({});
Checked.args = {
  label: "Checked checkbox",
  modelValue: true
};
Checked.parameters = {
  docs: {
    description: {
      story: "Чекбокс в отмеченном состоянии."
    }
  }
};

export const Small = Template.bind({});
Small.args = {
  label: "Small checkbox",
  size: "small",
  modelValue: false
};
Small.parameters = {
  docs: {
    description: {
      story: "Чекбокс маленького размера."
    }
  }
};

export const Large = Template.bind({});
Large.args = {
  label: "Large checkbox",
  size: "large",
  modelValue: false
};
Large.parameters = {
  docs: {
    description: {
      story: "Чекбокс большого размера."
    }
  }
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled checkbox",
  disabled: true,
  modelValue: false
};
Disabled.parameters = {
  docs: {
    description: {
      story: "Отключенный чекбокс в неотмеченном состоянии."
    }
  }
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  label: "Disabled checked",
  disabled: true,
  modelValue: true
};
DisabledChecked.parameters = {
  docs: {
    description: {
      story: "Отключенный чекбокс в отмеченном состоянии."
    }
  }
};

export const CustomColors = Template.bind({});
CustomColors.args = {
  label: "Custom colors",
  color: "#3b82f6",
  hoverColor: "#2563eb",
  modelValue: false
};
CustomColors.parameters = {
  docs: {
    description: {
      story: "Чекбокс с кастомными цветами (синий)."
    }
  }
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  label: "",
  modelValue: false
};
WithoutLabel.parameters = {
  docs: {
    description: {
      story: "Чекбокс без лейбла."
    }
  }
};

export const WithIdAndName = Template.bind({});
WithIdAndName.args = {
  label: "With ID and Name",
  id: "custom-checkbox",
  name: "custom-checkbox-group",
  modelValue: false
};
WithIdAndName.parameters = {
  docs: {
    description: {
      story: "Чекбокс с заданными HTML атрибутами id и name."
    }
  }
};

export const AllStates = (args) => ({
  components: { ICheckbox },
  setup() {
    return { args };
  },
  template: `
    <div style="display: flex; flex-direction: column; gap: 16px; padding: 20px;">
      <div>
        <h3>Default States</h3>
        <div style="display: flex; gap: 20px; margin-top: 10px;">
          <ICheckbox label="Unchecked" :modelValue="false" />
          <ICheckbox label="Checked" :modelValue="true" />
        </div>
      </div>
      
      <div>
        <h3>Disabled States</h3>
        <div style="display: flex; gap: 20px; margin-top: 10px;">
          <ICheckbox label="Disabled unchecked" :modelValue="false" disabled />
          <ICheckbox label="Disabled checked" :modelValue="true" disabled />
        </div>
      </div>
      
      <div>
        <h3>Sizes</h3>
        <div style="display: flex; gap: 20px; margin-top: 10px; align-items: center;">
          <ICheckbox label="Small" size="small" />
          <ICheckbox label="Medium" size="medium" />
          <ICheckbox label="Large" size="large" />
        </div>
      </div>
      
      <div>
        <h3>Custom Colors</h3>
        <div style="display: flex; gap: 20px; margin-top: 10px;">
          <ICheckbox label="Blue" color="#3b82f6" hoverColor="#2563eb" />
          <ICheckbox label="Red" color="#ef4444" hoverColor="#dc2626" />
          <ICheckbox label="Purple" color="#8b5cf6" hoverColor="#7c3aed" />
        </div>
      </div>
    </div>
  `
});
AllStates.parameters = {
  docs: {
    description: {
      story:
        "Демонстрация всех возможных состояний чекбокса: обычные, отключенные, разные размеры и цвета."
    }
  }
};
