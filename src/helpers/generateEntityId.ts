export default function generateEntityId(): string {
  const id = (Math.random() * (99 - 1) + 1).toFixed(19).toString();
  return id.slice(0, id.indexOf('.')) + id.slice(id.indexOf('.') + 1);
}
