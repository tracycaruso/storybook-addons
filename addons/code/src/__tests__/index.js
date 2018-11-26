import addons from '@storybook/addons';
import { withCode } from '..';

addons.getChannel = jest.fn();

describe('Storybook Addon Code', () => {
  it('should inject text from `code` parameter', () => {
    const channel = { emit: jest.fn() };
    addons.getChannel.mockReturnValue(channel);

    const getStory = jest.fn();
    const context = { parameters: { code: 'hello' } };

    withCode(getStory, context);
    expect(channel.emit).toHaveBeenCalledWith('storybook/code/add_code', 'hello');
    expect(getStory).toHaveBeenCalledWith(context);
  });

  it('should NOT inject text if no `code` parameter', () => {
    const channel = { emit: jest.fn() };
    addons.getChannel.mockReturnValue(channel);

    const getStory = jest.fn();
    const context = {};

    withCode(getStory, context);
    expect(channel.emit).not.toHaveBeenCalled();
    expect(getStory).toHaveBeenCalledWith(context);
  });

  it('should inject markdown from `code.markdown` parameter', () => {
    const channel = { emit: jest.fn() };
    addons.getChannel.mockReturnValue(channel);

    const getStory = jest.fn();
    const context = { parameters: { code: { markdown: '# hello' } } };

    withCode(getStory, context);
    expect(channel.emit).toHaveBeenCalledWith(
      'storybook/code/add_code',
      expect.stringContaining('<h1 id="hello">hello</h1>')
    );
    expect(getStory).toHaveBeenCalledWith(context);
  });

  it('should inject info (deprecated API)', () => {
    const channel = { emit: jest.fn() };
    addons.getChannel.mockReturnValue(channel);

    const getStory = jest.fn();
    const context = { parameters: {} };

    const decoratedStory = withCode('hello')(getStory);
    decoratedStory(context);
    expect(channel.emit).toHaveBeenCalledWith('storybook/code/add_code', 'hello');
    expect(getStory).toHaveBeenCalledWith(context);
  });
});
