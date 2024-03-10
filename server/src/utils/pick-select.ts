export const pickSelect = (keys: string[]) => {
  return keys.reduce((obj, key) => ({...obj, [key]: true}), {})
}