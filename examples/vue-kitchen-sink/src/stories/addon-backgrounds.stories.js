import { storiesOf } from '@storybook/vue';
import { withBackgrounds } from '@storybook/addon-backgrounds';

storiesOf('Addon|Backgrounds', module)
  .addDecorator(
    withBackgrounds([
      { name: 'twitter', value: '#00aced' },
      { name: 'facebook', value: '#3b5998', default: true },
    ])
  )
  .add('story 1', () => {
    const content = 'You should be able to switch backgrounds for this story';

    return {
      template: `<button>${content}</button>`,
    };
  })
  .add('story 2', () => {
    const content = 'This one too!';

    return {
      template: `<button>${content}</button>`,
    };
  });
