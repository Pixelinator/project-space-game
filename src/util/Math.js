export const math = (function () {
  return {
    /**
     *
     * @param {*} a
     * @param {*} b
     * @returns <any>
     */
    rand_range: function (a, b) {
      return Math.random() * (b - a) + a
    },

    /**
     *
     * @returns <any>
     */
    rand_normalish: function () {
      const r = Math.random() + Math.random() + Math.random() + Math.random()
      return (r / 4.0) * 2.0 - 1
    },

    /**
     *
     * @param {*} a
     * @param {*} b
     * @returns <any>
     */
    rand_int: function (a, b) {
      return Math.round(Math.random() * (b - a) + a)
    },

    /**
     *
     * @param {*} x
     * @param {*} a
     * @param {*} b
     * @returns <any>
     */
    lerp: function (x, a, b) {
      return x * (b - a) + a
    },

    /**
     *
     * @param {*} x
     * @param {*} a
     * @param {*} b
     * @returns <any>
     */
    smoothstep: function (x, a, b) {
      x = x * x * (3.0 - 2.0 * x)
      return x * (b - a) + a
    },

    /**
     *
     * @param {*} x
     * @param {*} a
     * @param {*} b
     * @returns <any>
     */
    smootherstep: function (x, a, b) {
      x = x * x * x * (x * (x * 6 - 15) + 10)
      return x * (b - a) + a
    },

    /**
     *
     * @param {*} x
     * @param {*} a
     * @param {*} b
     * @returns <any>
     */
    clamp: function (x, a, b) {
      return Math.min(Math.max(x, a), b)
    },

    /**
     *
     * @param {*} x
     * @returns <any>
     */
    sat: function (x) {
      return Math.min(Math.max(x, 0.0), 1.0)
    },

    /**
     *
     * @param {*} x
     * @param {*} a
     * @param {*} b
     * @returns <any>
     */
    in_range: (x, a, b) => {
      return x >= a && x <= b
    }
  }
})()
