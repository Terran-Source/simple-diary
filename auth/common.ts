export function getUserId(user: any): string {
  return `${user.provider}_${user.id}`;
}
