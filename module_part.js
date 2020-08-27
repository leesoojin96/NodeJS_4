let m = {
  v:'v',
  f:function () {
    console.log(this.v);
  }
}

module.exports = m;
// m이 가리키는 객체를 외부에서 사용하도록 
