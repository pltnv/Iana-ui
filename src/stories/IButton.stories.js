import IButton from "../components/IButton/IButton.vue";

export default {
  title: "Components/I-Button",
  component: IButton,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Текст внутри кнопки" },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Размер кнопки"
    },
    variant: {
      control: { type: "select" },
      options: ["default", "flat", "outlined", "text", "plain"],
      description: "Вариант отображения"
    },
    color: { control: "color", description: "Основной цвет кнопки" },
    disabled: { control: "boolean", description: "Отключает кнопку" },
    block: { control: "boolean", description: "Растягивает на всю ширину" },
    rounded: { control: "boolean", description: "Закруглённые углы" },
    iconLeft: { control: "text", description: "Иконка слева (mdi-класс)" },
    iconRight: { control: "text", description: "Иконка справа (mdi-класс)" }
  },
  args: {
    label: "Кнопка",
    size: "md",
    variant: "default",
    color: "#1d4ed8",
    disabled: false,
    block: false,
    rounded: false,
    iconLeft: "",
    iconRight: ""
  }
};

const Template = (args) => ({
  components: { IButton },
  setup() {
    return { args };
  },
  template: '<IButton v-bind="args" />'
});

export const Default = Template.bind({});
Default.args = { label: "Кнопка" };

export const Variants = () => ({
  components: { IButton },
  template: `
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <IButton label="Default" variant="default" />
      <IButton label="Flat" variant="flat" color="#9333ea" />
      <IButton label="Outlined" variant="outlined" color="#ef4444" />
      <IButton label="Text" variant="text" color="#16a34a" />
      <IButton label="Plain" variant="plain" />
    </div>
  `
});

export const Sizes = () => ({
  components: { IButton },
  template: `
    <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
      <IButton label="XS" size="xs" />
      <IButton label="SM" size="sm" />
      <IButton label="MD" size="md" />
      <IButton label="LG" size="lg" />
      <IButton label="XL" size="xl" />
    </div>
  `
});

export const WithIcons = () => ({
  components: { IButton },
  template: `
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <IButton label="Поиск" iconLeft="mdi-magnify" />
      <IButton label="Вперёд" iconRight="mdi-arrow-right" color="#16a34a" />
      <IButton iconLeft="mdi-heart" iconRight="mdi-star" variant="outlined" color="#ef4444" />
    </div>
  `
});
