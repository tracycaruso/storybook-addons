import { mount, unregister, tag2 as tag } from 'riot';
import compiler from 'riot-compiler';
import { document } from 'global';
import { alreadyCompiledMarker, getRidOfRiotNoise, setConstructor } from '../compileStageFunctions';

function guessRootName(stringified) {
  const whiteSpaceLocation = stringified.indexOf(' ', stringified.indexOf('<') + 1);
  const firstWhitespace = whiteSpaceLocation === -1 ? stringified.length : whiteSpaceLocation;
  const supposedName = stringified.trim().match(/^<[^ >]+\/>$/)
    ? stringified.trim().replace(/[<>/]/g, '')
    : stringified.substring(
        stringified.indexOf('<') + 1,
        Math.min(firstWhitespace, stringified.indexOf('>'))
      );
  const matchingBuiltInTag = document.createElement(supposedName).constructor.name;
  return matchingBuiltInTag === 'HTMLUnknownElement' ? supposedName : 'root';
}

function compileText(code, rootName) {
  const sourceCodeEndOfHtml =
    (Math.min(code.indexOf('<style') + 1, code.indexOf('<script') + 1) || code.length + 1) - 1;
  const sourceCodeReformatted =
    code.substring(0, sourceCodeEndOfHtml).replace(/[\n\r\s]+/g, ' ') +
    code.substring(sourceCodeEndOfHtml);
  const sourceCode =
    rootName === 'root' ? `<root>${sourceCodeReformatted}</root>` : sourceCodeReformatted;
  return compiler
    .compile(sourceCode, {})
    .replace(alreadyCompiledMarker, '')
    .trim();
}

export default function renderStringified({
  tags,
  template = `<${(tags[0] || []).boundAs || guessRootName(tags[0] || '')}/>`,
  tagConstructor,
}) {
  const tag2 = tag; // eslint-disable-line no-unused-vars
  tags.forEach(oneTag => {
    const rootName = oneTag.boundAs || guessRootName(oneTag);
    const { content } = oneTag || {};
    const code = content ? content.trim() : oneTag || '';
    const compiled =
      code.indexOf(alreadyCompiledMarker) !== -1 ? code : compileText(code, rootName);
    unregister(rootName);
    eval(getRidOfRiotNoise(`${compiled}`)); // eslint-disable-line no-eval
  });
  const sourceCode = `<root>${template}</root>`;
  const compiledRootSource = !tagConstructor
    ? `${compiler.compile(sourceCode, {})}`
    : setConstructor(`${compiler.compile(sourceCode, {})}`, tagConstructor);

  if (template !== '<root/>') eval(getRidOfRiotNoise(compiledRootSource)); // eslint-disable-line no-eval

  mount('*');
}
