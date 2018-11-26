import React from 'react';
import { Text } from 'react-native';

import { storiesOf, addDecorator, addParameters } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-ondevice-notes';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import knobsWrapper from './Knobs';
import Button from './Button';
import CenterView from './CenterView';
import Welcome from './Welcome';

addDecorator(withNotes);
addDecorator(
  withBackgrounds([
    { name: 'twitter', value: '#6cff5d', default: true },
    { name: 'facebook', value: '#3b5998' },
  ])
);

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />, {
  notes: `
# Markdown!\n
* List Item
* [List Item with Link](https://twitter.com/Charles_Mangwa)
`,
});

storiesOf('Button', module)
  .addParameters({
    backgrounds: [
      { name: 'red', value: '#F44336' },
      { name: 'blue', value: '#2196F3', default: true },
    ],
    notes: `
# Custom note\n
_This component doesn't look right_
`,
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <Button onPress={action('clicked-text')}>
      <Text>Hello Button</Text>
    </Button>
  ))
  .add('with some emoji', () => (
    <Button onPress={action('clicked-emoji')}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ));

storiesOf('Knobs', module)
  .addDecorator(withKnobs)
  .add('with knobs', knobsWrapper);

const globalParameter = 'globalParameter';
const chapterParameter = 'chapterParameter';
const storyParameter = 'storyParameter';

addParameters({ globalParameter });

storiesOf('Core|Parameters', module)
  .addParameters({ chapterParameter })
  .add(
    'passed to story',
    ({ parameters }) => <Text>Parameters are {JSON.stringify(parameters)}</Text>,
    {
      storyParameter,
    }
  );
