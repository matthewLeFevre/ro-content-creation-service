export default function update(updatedValues, existingObject) {
  const newObject = JSON.parse(JSON.stringify(existingObject));
  const existingKeys = Object.keys(existingObject);
  for (const key in updatedValues) {
    if (existingKeys.includes(key)) {
      newObject[key] = updatedValues[key];
    }
  }
  return newObject;
}
