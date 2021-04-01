export default function (contents, name) {
  if (name.endsWith('.svg')) {
    return contents.toString('utf8').split(/\n */).join(' ').replace(/\s+/g, ' ').trim();
  }
  return contents;
}
