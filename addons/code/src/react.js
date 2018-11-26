import React from 'react';
import PropTypes from 'prop-types';
import addons from '@storybook/addons';

export class WithCode extends React.Component {
  render() {
    const { children, code } = this.props;
    const channel = addons.getChannel();

    channel.emit('storybook/code/add_code', code);

    return children;
  }
}

WithCode.propTypes = {
  children: PropTypes.node,
  code: PropTypes.string,
};
WithCode.defaultProps = {
  children: null,
  code: '',
};
