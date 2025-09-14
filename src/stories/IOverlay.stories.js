import IOverlay from "../components/IOverlay/IOverlay.vue";

export default {
  title: "Components/I-Overlay",
  component: IOverlay,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**I-Overlay** — Компонент оверлея (наложения), который создает полупрозрачный слой поверх контента.`
      }
    }
  },
  argTypes: {
    id: {
      control: "text",
      description: "Уникальный идентификатор элемента"
    },
    name: {
      control: "text",
      description: "Имя элемента"
    },
    opacity: {
      control: { type: "text" },
      description: "Прозрачность оверлея (0-1)"
    },
    color: {
      control: "color",
      description: "Цвет оверлея в формате rgba или hex"
    },
    zIndex: {
      control: "text",
      description: "z-index оверлея"
    }
  }
};

const Template = (args) => ({
  components: { IOverlay },
  setup() {
    return { args };
  },
  template: '<IOverlay v-bind="args" />'
});

export const Default = Template.bind({});
Default.args = {
  // Используются значения по умолчанию из компонента
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  color: "rgba(255, 0, 0, 0.5)",
  opacity: "0.5"
};

export const HighOpacity = Template.bind({});
HighOpacity.args = {
  opacity: "0.8",
  color: "rgba(0, 0, 0, 0.8)"
};

export const LowOpacity = Template.bind({});
LowOpacity.args = {
  opacity: "0.2",
  color: "rgba(0, 0, 255, 0.2)"
};

export const WithHighZIndex = Template.bind({});
WithHighZIndex.args = {
  zIndex: "9999"
};
