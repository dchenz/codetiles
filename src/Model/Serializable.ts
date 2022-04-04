export interface Serializable {
  toObject: () => Record<string, unknown>
}