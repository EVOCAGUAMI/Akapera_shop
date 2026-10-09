// Akāpera demo data. Example pieces taken from the brand's inspiration collages; not products for sale.
// Swap images in /assets and edit this list to change what the site shows.
const PRODUCTS = [
  {id:'o1', img:'assets/o1.jpg', img2:'assets/o6.jpg', name:'Wide black trousers', desc:'With a black tee, cap and white sneakers.', price:1290, colors:['#2B2B29','#7D8B72','#D6C8B8'], rating:'4.8', n:32, size:'M', fit:'Ideal fit'},
  {id:'o2', img:'assets/o2.jpg', img2:'assets/o1.jpg', name:'Burgundy tube top', desc:'With straight jeans and a burgundy bag.', price:690, colors:['#7A2E3A','#2B2B29'], rating:'4.6', n:18, size:'S', fit:'Snug at the bust'},
  {id:'o3', img:'assets/o3.jpg', img2:'assets/o9.jpg', name:'Oversized green tee', desc:'With light baggy jeans and headphones.', price:590, colors:['#3F4A3C','#2B2B29','#F1EDE5'], rating:'4.9', n:41, size:'M', fit:'Loose at the shoulders'},
  {id:'o4', img:'assets/o4.jpg', img2:'assets/o5.jpg', name:'Plaid shirt', desc:'Over a white tee, black jeans and a backpack.', price:990, colors:['#2B2B29','#8E3B32'], rating:'4.7', n:12, size:'M', fit:'Ideal fit'},
  {id:'o5', img:'assets/o5.jpg', img2:'assets/o11.jpg', name:'White logo tee', desc:'With dark jeans, a blue cap and grey sneakers.', price:490, colors:['#F1EDE5','#2B2B29'], rating:'4.5', n:27, size:'M', fit:'Ideal fit'},
  {id:'o6', img:'assets/o6.jpg', img2:'assets/o1.jpg', name:'Grey cardigan', desc:'With a black tee, black trousers and a tote.', price:1190, colors:['#A5A18C','#2B2B29','#D6C8B8'], rating:'4.8', n:9, size:'S', fit:'Ideal fit'},
  {id:'o7', img:'assets/o7.jpg', img2:'assets/o8.jpg', name:'Yellow sweater', desc:'With a brown tank, dark jeans and a suede bag.', price:1090, colors:['#E8D36A','#C9B8A3'], rating:'4.8', n:9, size:'S', fit:'Ideal fit'},
  {id:'o8', img:'assets/o8.jpg', img2:'assets/o7.jpg', name:'Amalfi tee', desc:'With yellow striped shorts and light blue sneakers.', price:450, colors:['#BFD4E6','#E8D36A'], rating:'4.4', n:15, size:'M', fit:'Ideal fit'},
  {id:'o9', img:'assets/o9.jpg', img2:'assets/o3.jpg', name:'Graphic tee', desc:'With baggy jeans, a studded belt and Vans.', price:520, colors:['#F1EDE5','#2B2B29'], rating:'4.7', n:22, size:'M', fit:'Loose at the shoulders'},
  {id:'o10', img:'assets/o10.jpg', img2:'assets/o5.jpg', name:'Sunday tee', desc:'With navy shorts and perfume.', price:480, colors:['#F1EDE5','#2F3F63'], rating:'4.6', n:11, size:'M', fit:'Ideal fit'},
  {id:'o11', img:'assets/o11.jpg', img2:'assets/o10.jpg', name:'Striped trousers', desc:'With a white tee, NY cap and sandals.', price:890, colors:['#BFD4E6','#F1EDE5'], rating:'5.0', n:6, size:'M', fit:'Ideal fit'},
];
// Feed posts: user, piece id, rating 1 to 5, review.
const POSTS = [
  ['Mariana R.', 'o1', 5, 'Falls perfectly with sneakers. I kept the M, like my avatar said.'],
  ['Sofía L.', 'o4', 5, 'The shirt sits loose at the shoulders, exactly how I wanted it.'],
  ['Ana P.', 'o7', 4, 'The yellow is softer in person. Size S for 165 cm.'],
  ['Daniela G.', 'o9', 5, 'Properly baggy. I ordered the M following the recommendation.'],
  ['Regina M.', 'o3', 4, 'Oversized without going too far. I like it with the light jeans.'],
  ['Lucía T.', 'o11', 5, 'Blue stripes for the heat. Sandals and done.'],
];
// Demo cart: piece id, color, size, already on the avatar.
const CART = [['o1', 'Black', 'M', true], ['o4', 'Black', 'M', false], ['o6', 'Grey', 'S', false]];
