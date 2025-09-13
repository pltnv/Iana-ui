import ICheckbox from "../components/ICheckbox/ICheckbox.vue";

export default {
  title: "Components/I-Checkbox",
  component: ICheckbox,
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#1f2937" },
        { name: "light", value: "#ffffff" }
      ]
    }
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"]
    },
    color: {
      control: { type: "color" }
    },
    hoverColor: {
      control: { type: "color" }
    },
    disabled: {
      control: { type: "boolean" }
    },
    modelValue: {
      control: { type: "boolean" }
    },
    label: {
      control: { type: "text" }
    },
    id: {
      control: { type: "text" }
    },
    name: {
      control: { type: "text" }
    },
    "update:modelValue": {
      action: "update:modelValue"
    }
  }
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

export const Checked = Template.bind({});
Checked.args = {
  label: "Checked checkbox",
  modelValue: true
};

export const Small = Template.bind({});
Small.args = {
  label: "Small checkbox",
  size: "small",
  modelValue: false
};

export const Large = Template.bind({});
Large.args = {
  label: "Large checkbox",
  size: "large",
  modelValue: false
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled checkbox",
  disabled: true,
  modelValue: false
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  label: "Disabled checked",
  disabled: true,
  modelValue: true
};

export const CustomColors = Template.bind({});
CustomColors.args = {
  label: "Custom colors",
  color: "#3b82f6",
  hoverColor: "#2563eb",
  modelValue: false
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  label: "",
  modelValue: false
};

export const WithIdAndName = Template.bind({});
WithIdAndName.args = {
  label: "With ID and Name",
  id: "custom-checkbox",
  name: "custom-checkbox-group",
  modelValue: false
};

// Группа состояний
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

// Интерактивный пример
export const InteractiveExample = (args) => ({
  components: { ICheckbox },
  setup() {
    const checkboxes = [
      { id: "opt1", label: "Option 1", value: false },
      { id: "opt2", label: "Option 2", value: true },
      { id: "opt3", label: "Option 3", value: false }
    ];

    const toggleAll = (value) => {
      checkboxes.forEach((checkbox) => {
        checkbox.value = value;
      });
    };

    return { args, checkboxes, toggleAll };
  },
  template: `
    <div style="padding: 20px; max-width: 400px;">
      <h2>Checkbox Group Example</h2>
      
      <div style="margin-bottom: 20px;">
        <ICheckbox 
          label="Select all" 
          :modelValue="checkboxes.every(opt => opt.value)"
          @update:modelValue="toggleAll"
        />
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 12px; border: 1px solid #e5e7eb; padding: 16px; border-radius: 8px;">
        <ICheckbox 
          v-for="(option, index) in checkboxes"
          :key="option.id"
          :label="option.label"
          :modelValue="option.value"
          @update:modelValue="newValue => option.value = newValue"
          name="options"
        />
      </div>
      
      <div style="margin-top: 20px; padding: 16px; background: #f9fafb; border-radius: 8px;">
        <h4>Selected options:</h4>
        <ul>
          <li v-for="option in checkboxes.filter(opt => opt.value)" :key="option.id">
            {{ option.label }}
          </li>
          <li v-if="!checkboxes.some(opt => opt.value)">No options selected</li>
        </ul>
      </div>
    </div>
  `
});

// Документация
Default.parameters = {
  docs: {
    description: {
      component: `
# Checkbox Component

Универсальный компонент чекбокса с поддержкой различных размеров, цветов и состояний.

## Features
- Поддержка размеров: small, medium, large
- Кастомные цвета для состояний
- Полная доступность (ARIA)
- Поддержка v-model
- Темная тема (auto-detection)
- Disabled состояния
      `
    }
  }
};
