module.exports = {
  // ... otras configuraciones
  module: {
    rules: [
      {
        test: /\scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
