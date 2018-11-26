import { document, Node } from 'global';
import styles from './styles';

const INNER_ID = 'sb-addon-centered-inner';
const WRAPPER_ID = 'sb-addon-centered-wrapper';

function getOrCreate(id, style) {
  const elementOnDom = document.getElementById(id);

  if (elementOnDom) {
    return elementOnDom;
  }

  const element = document.createElement('div');
  element.setAttribute('id', id);
  Object.assign(element.style, style);

  return element;
}

function getInnerDiv() {
  return getOrCreate(INNER_ID, styles.innerStyle);
}

function getWrapperDiv() {
  return getOrCreate(WRAPPER_ID, styles.style);
}

export default function(storyFn) {
  const inner = getInnerDiv();
  const wrapper = getWrapperDiv();
  wrapper.appendChild(inner);

  const component = storyFn();

  if (typeof component === 'string') {
    inner.innerHTML = component;
  } else if (component instanceof Node) {
    inner.innerHTML = '';
    inner.appendChild(component);
  } else {
    return component;
  }

  return wrapper;
}
