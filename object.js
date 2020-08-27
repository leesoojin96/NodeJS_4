let roles = {
// object         name(Value)
  'programmer' : '이수진',
  'singer' : 'Selena gomez',
  'entertainment' : 'AOMG'
}
console.log(roles.programmer);
console.log(roles['singer']);

for(let name in roles){
  console.log('object - ', name, ' value - ',roles[name]);
}
