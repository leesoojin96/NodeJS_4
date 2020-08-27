// 'o'라는 객체 안에 값들을 그룹화하여 넣어놓음
let q = {
  v1:'v1',
  v2:'v2',
  f1:function f1() {
    console.log(this.v1);
  },
  f2:function f2() {
    console.log(this.v2);
  }
}
// 자바스크립트에서 함수는 값이다!!!

q.f1();
q.f2();
