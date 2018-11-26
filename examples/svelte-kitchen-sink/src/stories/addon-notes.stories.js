import { storiesOf } from '@storybook/svelte';
import { withNotes } from '@storybook/addon-notes';

import ButtonView from './views/ButtonView.svelte';

storiesOf('Addon|Notes', module)
  .addDecorator(withNotes)
  .add(
    'Simple note',
    () => ({
      Component: ButtonView,
    }),
    { notes: 'My notes on the ButtonView component' }
  )
  .add(
    'Note with HTML',
    () => ({
      Component: ButtonView,
      data: {
        text: '🤔😳😯😮😄😩😓😱🤓😑😶😊',
      },
    }),
    {
      notes: `
      <h2>My notes on emojies</h2>

      <em>It's not all that important to be honest, but..</em>

      Emojis are great, I love emojis, in fact I like using them in my Component notes too! 😇
    `,
    }
  );
