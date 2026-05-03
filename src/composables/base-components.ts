import type { App, Component } from 'vue';

import BaseLayout from '@/layouts/BaseLayout.vue';

interface BaseComponent {
  name: string;
  component: Component;
}

export const useBaseComponents = () => {
  const components: BaseComponent[] = [
    {
      name: 'BaseLayout',
      component: BaseLayout
    }
  ];

  function initialize(app: App<Element>): void {
    if (components.length > 0) {
      components.forEach((baseComponent) => {
        app.component(baseComponent.name, baseComponent.component);
      });
    }
  }
  return {
    initialize
  };
};
