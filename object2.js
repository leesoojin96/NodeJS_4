let f = function () {
  console.log(10*1);

}
let a = [f];
a[0]();
// 배열의 원소로서 함수가 존재할 수 있다

let o = {
  func:f
}
o.func();
