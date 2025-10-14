/** @type {import("prettier").Config} */
export default {
  semi: false, // セミコロンを付けない
  singleQuote: true, // シングルクォートに統一
  trailingComma: "all", // 末尾カンマを許可
  tabWidth: 2, // インデント幅2スペース
  printWidth: 100, // 1行の最大長
  bracketSpacing: true, // オブジェクトの中のスペース { foo: bar }
  arrowParens: "avoid", // アロー関数の引数1つならカッコ省略
  endOfLine: "lf", // 改行コードをLFに統一
};
