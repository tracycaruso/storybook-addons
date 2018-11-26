import React from 'react';
import PropTypes from 'prop-types';
import addons from '@storybook/addons';

import styled from '@emotion/styled';

const Panel = styled.div({
  padding: 10,
  boxSizing: 'border-box',
  width: '100%',
});

export class Code extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { text: '' };
    this.onAddCode = this.onAddCode.bind(this);
  }

  componentDidMount() {
    const { channel, api } = this.props;
    // Listen to the code and render it.
    channel.on('storybook/code/add_code', this.onAddCode);

    // Clear the current code on every story change.
    this.stopListeningOnStory = api.onStory(() => {
      this.onAddCode('');
    });
  }

  // This is some cleanup tasks when the Code panel is unmounting.
  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }

    this.unmounted = true;
    const { channel } = this.props;
    channel.removeListener('storybook/code/add_code', this.onAddCode);
  }

  onAddCode(text) {
    this.setState({ text });
  }

  render() {
    const { active } = this.props;
    const { text } = this.state;
    const textAfterFormatted = text
      ? text
          .trim()
          .replace(/(<\S+.*>)\n/g, '$1')
          .replace(/\n/g, '<br />')
      : '';

    return active ? (
      <Panel
        className="addon-code-container"
        dangerouslySetInnerHTML={{ __html: textAfterFormatted }}
      />
    ) : null;
  }
}

Code.propTypes = {
  active: PropTypes.bool.isRequired,
  channel: PropTypes.shape({
    on: PropTypes.func,
    emit: PropTypes.func,
    removeListener: PropTypes.func,
  }).isRequired,
  api: PropTypes.shape({
    onStory: PropTypes.func,
    getQueryParam: PropTypes.func,
    setQueryParams: PropTypes.func,
  }).isRequired,
};

addons.register('storybook/code', api => {
  const channel = addons.getChannel();
  addons.addPanel('storybook/code/panel', {
    title: 'Code',
    // eslint-disable-next-line react/prop-types
    render: ({ active }) => <Code channel={channel} api={api} active={active} />,
  });
});
