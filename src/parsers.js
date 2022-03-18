import yaml from 'js-yaml';

const parseFormat = (format) => {
  switch (format) {
    case 'json':
      return JSON.parse;
    case 'yml':
    case 'yaml':
      return yaml.load;
    default:
      throw new Error(`format ${format} is not supported`);
  }
};

const parseFile = (data, format) => parseFormat(format)(data);

export default parseFile;
