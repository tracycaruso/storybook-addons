import addons, { makeDecorator } from '@storybook/addons';
import marked from 'marked';

function renderMarkdown(text, options) {
  return marked(text, { ...marked.defaults, ...options });
}

export const withCode = makeDecorator({
  name: 'withCode',
  parameterName: 'code',
  skipIfNoParametersOrOptions: true,
  allowDeprecatedUsage: true,
  wrapper: (getStory, context, { options, parameters }) => {
    const channel = addons.getChannel();

    const storyOptions = parameters || options;

    const { text, markdown, markdownOptions } =
      typeof storyOptions === 'string' ? { text: storyOptions } : storyOptions;

    if (!text && !markdown) {
      throw new Error('You must set of one of `text` or `markdown` on the `code` parameter');
    }

    channel.emit('storybook/code/add_code', text || renderMarkdown(markdown, markdownOptions));

    return getStory(context);
  },
});

export const withMarkdownCode = (text, options) =>
  withCode({
    markdown: text,
    markdownOptions: options,
  });
