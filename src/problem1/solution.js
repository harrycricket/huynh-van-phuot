const sum_to_n_a = function (n) {
  return (n * (n + 1)) / 2;
};

const sum_to_n_b = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

const sum_to_n_c = function (n) {
  let i = 1;
  let sum = 0;
  do {
    sum += i;
    i++;
  } while (i <= n);
  return sum;
};

const sum_to_n_d = function (n) {
  if (n <= 0) {
    return 0;
  }
  return n + sum_to_n_d(n - 1);
};

const sum_to_n_e = function (n, sum = 0) {
  if (n <= 0) return sum;
  return sum_to_n_e(n - 1, sum + n);
};

const sum_to_n_f = function (n) {
  return (n * (n + 1)) >> 1;
};

console.log(sum_to_n_a(10)); // 55
console.log(sum_to_n_b(11)); // 66
console.log(sum_to_n_c(12)); // 78
console.log(sum_to_n_d(13)); // 91
console.log(sum_to_n_e(14)); // 105
console.log(sum_to_n_f(15)); // 120