import ITip from "../components/ITip/ITip.vue";

export default {
  title: "Components/I-Tip",
  component: ITip,
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Позиция появления тултипа относительно триггера"
    },
    openDelay: {
      control: "number",
      description: "Задержка перед открытием (мс)"
    },
    closeDelay: {
      control: "number",
      description: "Задержка перед закрытием (мс)"
    },
    openOnClick: {
      control: "boolean",
      description: "Открывать тултип по клику"
    },
    openOnHover: {
      control: "boolean",
      description: "Открывать тултип по наведению"
    },
    tip: {
      control: "text",
      description: "Текст тултипа (если не используется слот `tip`)"
    },
    permanent: {
      control: "boolean",
      description: "Держать тултип всегда открытым"
    },
    maxWidth: {
      control: "text",
      description: "Максимальная ширина тултипа"
    },
    minWidth: {
      control: "text",
      description: "Минимальная ширина тултипа"
    }
  },
  args: {
    tip: "Подсказка: наведи или кликни",
    position: "top",
    openDelay: 200,
    closeDelay: 200,
    openOnClick: false,
    openOnHover: true,
    permanent: false
  },
  parameters: {
    layout: "centered"
  },
  decorators: [
    () => ({
      template: `
        <div style="min-height: 180px; display: flex; justify-content: center; align-items: center;">
          <story />
        </div>
      `
    })
  ]
};

export const Default = (args) => ({
  components: { ITip },
  setup() {
    return { args };
  },
  template: `
    <ITip v-bind="args">
      <button>Наведи сюда</button>
    </ITip>
  `
});

export const CustomSlot = (args) => ({
  components: { ITip },
  setup() {
    return { args };
  },
  template: `
    <ITip v-bind="args">
      <button>Слот с кастомным тултипом</button>
      <template #tip>
        <strong>🔥 Гибкий контент!</strong><br/>
        Можно вставить HTML или другой компонент.
      </template>
    </ITip>
  `
});
