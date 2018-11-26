import { storiesOf } from '@storybook/svelte';
import Centered from '@storybook/addon-centered/svelte';
import { action } from '@storybook/addon-actions';

import Button from '../components/Button.svelte';

storiesOf('Addon|Centered', module)
  .addDecorator(Centered)
  .add('rounded', () => ({
    Component: Button,
    data: {
      rounded: true,
      text: "Look, I'm centered!",
    },
  }))
  .add('with action', () => ({
    Component: Button,
    on: {
      click: action(`Tell me it ain't so! Centered and with actions! Thanks @ekhaled :)`),
    },
  }));
