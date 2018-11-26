/** @jsx m */

import m from 'mithril';

import { storiesOf } from '@storybook/mithril';

import { withBackgrounds } from '@storybook/addon-backgrounds';
import BaseButton from '../BaseButton';

storiesOf('Addons|Backgrounds', module)
  .addDecorator(
    withBackgrounds([
      { name: 'twitter', value: '#00aced' },
      { name: 'facebook', value: '#3b5998', default: true },
    ])
  )
  .add('story 1', () => ({
    view: () => <BaseButton label="You should be able to switch backgrounds for this story" />,
  }))
  .add('story 2', () => ({
    view: () => <BaseButton label="This one too!" />,
  }));
