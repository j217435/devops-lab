'use strict';
 
// 將金額加上千分位與幣別，例如 1234567 → TWD 1,234,567
function formatPrice(amount, currency = 'TWD') {
  if (typeof amount !== 'number' || Number.isNaN(amount)) {
    throw new TypeError('amount 必須是數字');
  }
  const text = Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${currency} ${text}`;
}
 
// 計算訂單總額：每個品項為 { price, qty }
function sum(items) {
  return items.reduce((total, item) => total + item.price * item.qty, 0);
}
 
// 依百分比計算折扣後金額，例如 applyDiscount(1000, 15) → 850
function applyDiscount(amount, percent) {
  if (percent < 0 || percent > 100) {
    throw new RangeError('折扣錯誤');
  }
  return Math.round(amount * (100 - percent) / 100);
}
 
module.exports = { formatPrice, sum, applyDiscount };

以下列內容完整取代 tests/app.test.js：
'use strict';
 
const test = require('node:test');
const assert = require('node:assert');
const { formatPrice, sum, applyDiscount } = require('../src/app.js');
 
test('formatPrice 加上千分位與幣別', () => {
  assert.strictEqual(formatPrice(1234567), 'TWD 1,234,567');
});
 
test('formatPrice 拒絕非數字', () => {
  assert.throws(() => formatPrice('abc'), TypeError);
});
 
test('sum 計算訂單總額', () => {
  assert.strictEqual(sum([{ price: 100, qty: 2 }, { price: 50, qty: 1 }]), 250);
});
 
test('applyDiscount 計算折扣後金額', () => {
  assert.strictEqual(applyDiscount(1000, 15), 850);
});
 
test('applyDiscount 拒絕超出範圍的折扣', () => {
  assert.throws(() => applyDiscount(1000, 120), RangeError);
});
