export default function cleanValues(v: string) {
  v = v
    .split('')
    .map(char => {
      if (char.match(/[a-fA-F0-9]/g)) {
        return char
      } else {
        return ''
      }
    })
    .join('')
    .toUpperCase()
  return v.slice(0, 6)
}
