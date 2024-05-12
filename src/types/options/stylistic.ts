export interface OptionsStylistic {
  /**
   * Whether to enable semicolons
   * Similar to `semi` option in Prettier
   *
   * @default false
   */
  semi?: boolean

  /**
   * Quote style
   * Similar to `singleQuote` option in Prettier
   *
   * @default 'single'
   */
  quotes?: 'single' | 'double'

  /**
   * Indentation level
   * Similar to the `tabWidth` options in Prettier
   *
   * @default 2
   */
  indent?: number

  /**
   * When to enable comma dangles
   * Similar to `trailingComma` option in Prettier
   *
   * @default 'always-multiline'
   */
  commaDangle?: 'never' | 'always' | 'always-multiline' | 'only-multiline'
}
