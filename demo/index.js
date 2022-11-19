import examples from './examples';

const urlParams = new URLSearchParams(location.search);
const exampleName = urlParams.get('example');
const example = examples[exampleName] ? new examples[exampleName]() : new examples.Basic();
