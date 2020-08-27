// let m = {
//   v:'v',
//   f:function () {
//     console.log(this.v);
//   }
// }

        // 다른 파일을 가져와서 변수에 그 내용을 대입
let m = require('./module_part.js');
console.log(m);
m.f();
