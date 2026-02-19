export function mergeAuth<T extends object>(existing: T | undefined, updates: Partial<T>): T {
  const base = (existing || {}) as T

  const pick = <K extends keyof T>(key: K): NonNullable<T[K]> | null => {
    const updateVal = updates[key]
    if (updateVal === undefined || updateVal === '' || updateVal === null) {
      return base[key] ?? null
    }
    return updateVal
  }
  const result = {} as T
  for (const key of Object.keys({ ...base, ...updates }) as (keyof T)[]) {
    // @ts-expect-error We intentionally allow null for missing values
    result[key] = pick(key)
  }
  return result
}
