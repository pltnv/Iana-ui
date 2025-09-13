import IAccordion from "../components/IAccordion/IAccordion.vue";

export default {
  title: "Components/IAccordion",
  component: IAccordion,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**IAccordion** — Можно использовать как одиночный компонент или в составе группы.
        `
      }
    }
  },
  argTypes: {
    title: {
      control: "text",
      description: "Заголовок аккордеона"
    },
    content: {
      control: "text",
      description: "Контент, если слот не используется"
    },
    width: {
      control: "number",
      description: "Ширина в пикселях (игнорируется, если `block` = true)"
    },
    round: {
      control: "number",
      description: "Скругление углов (px)"
    },
    alwaysOpened: {
      control: "boolean",
      description: "Если true — аккордеон всегда открыт и не сворачивается"
    },
    block: {
      control: "boolean",
      description: "Если true — занимает всю ширину контейнера"
    },
    toggle: {
      action: "toggled",
      description: "Событие при изменении состояния (true/false)",
      table: {
        category: "Events"
      }
    }
  }
};

const Template = (args) => ({
  components: { IAccordion },
  setup() {
    return { args };
  },
  template: `<IAccordion v-bind="args" />`
});

export const Default = Template.bind({});
Default.args = {
  title: "Accordion Title",
  content: "This is some default content inside accordion.",
  width: 320,
  round: 12,
  alwaysOpened: false,
  block: false
};
Default.parameters = {
  docs: {
    description: {
      story: "Базовый аккордеон с текстовым контентом через `props.content`."
    }
  }
};

export const AlwaysOpened = Template.bind({});
AlwaysOpened.args = {
  title: "Always Opened Accordion",
  content: "This accordion stays opened.",
  alwaysOpened: true
};
AlwaysOpened.parameters = {
  docs: {
    description: {
      story: "Аккордеон в режиме `alwaysOpened`, не закрывается по клику."
    }
  }
};

export const WithSlot = (args) => ({
  components: { IAccordion },
  setup() {
    return { args };
  },
  template: `
    <IAccordion v-bind="args" title="Accordion with slot">
      <div style="padding: 12px;">
        <p><b>Custom content</b> with <i>HTML slot</i>.</p>
        <ul>
          <li>Point A</li>
          <li>Point B</li>
        </ul>
      </div>
    </IAccordion>
  `
});
WithSlot.args = {
  width: 350
};
WithSlot.parameters = {
  docs: {
    description: {
      story: "Пример использования **слота** для кастомного содержимого."
    }
  }
};
