export function excludeInternalFields<T>(
  obj: T,
): Omit<
  T,
  '$inferInsert' | '$inferSelect' | '_' | 'getSQL' | 'shouldOmitSQLParens'
> {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    $inferInsert,
    $inferSelect,
    _,
    getSQL,
    shouldOmitSQLParens,
    ...cleanObj
  } = obj as any;
  /* eslint-enable @typescript-eslint/no-unused-vars */
  return cleanObj;
}
