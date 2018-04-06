# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Pattern.delete_all
Sample.delete_all
User.delete_all

u1 = User.create({
  provider: "google",
  uid: "111017581895406409568",
  first_name: "Alan",
  last_name: "Lee",
  email: "alanjlee89@gmail.com"
})

p1 = Pattern.create({
  user: User.last,
  name: 'Ascending',
  device: 'synth',
  grid: [
   [1,0,0,0,0,0,0,0],
   [0,1,0,0,0,0,0,0],
   [0,0,1,0,0,0,0,0],
   [0,0,0,1,0,0,0,0],
   [0,0,0,0,1,0,0,0],
   [0,0,0,0,0,1,0,0],
   [0,0,0,0,0,0,1,0],
   [0,0,0,0,0,0,0,1]
 ]
})

p2 = Pattern.create({
  user: User.last,
  name: 'All Cells',
  device: 'synth',
  grid: [
   [1,1,1,1,1,1,1,1],
   [1,1,1,1,1,1,1,1],
   [1,1,1,1,1,1,1,1],
   [1,1,1,1,1,1,1,1],
   [1,1,1,1,1,1,1,1],
   [1,1,1,1,1,1,1,1],
   [1,1,1,1,1,1,1,1],
   [1,1,1,1,1,1,1,1]
 ]
})

p3 = Pattern.create({
  user: User.last,
  name: 'Simple Drums',
  device: 'sampler',
  grid: [
   [1,0,0,0,0,0,0,0],
   [0,0,1,0,0,0,0,0],
   [0,0,1,0,0,0,0,0],
   [0,0,1,0,0,0,0,0],
   [0,1,0,0,0,0,0,0],
   [0,0,1,0,0,0,0,0],
   [0,0,1,0,0,0,0,0],
   [0,0,1,0,0,0,0,0]
 ]
})

s1 = Sample.create(kit_name: 'DemoKit1', drum_name: 'Kick', url: 'https://s3.amazonaws.com/beat-box-samples/DemoKit1/kick.wav')
s2 = Sample.create(kit_name: 'DemoKit1', drum_name: 'Snare', url: 'https://s3.amazonaws.com/beat-box-samples/DemoKit1/snare.wav')
s3 = Sample.create(kit_name: 'DemoKit1', drum_name: 'HiHat', url: 'https://s3.amazonaws.com/beat-box-samples/DemoKit1/hihat.wav')
s4 = Sample.create(kit_name: 'DemoKit1', drum_name: 'Tom1', url: 'https://s3.amazonaws.com/beat-box-samples/DemoKit1/tom1.wav')
s5 = Sample.create(kit_name: 'DemoKit1', drum_name: 'Tom2', url: 'https://s3.amazonaws.com/beat-box-samples/DemoKit1/tom2.wav')
s6 = Sample.create(kit_name: 'DemoKit1', drum_name: 'Tom3', url: 'https://s3.amazonaws.com/beat-box-samples/DemoKit1/tom3.wav')

s7 = Sample.create(kit_name: 'DemoKit2', drum_name: 'Kick', url: 'https://s3.amazonaws.com/beat-box-samples/DemoKit1/kick.wav')
s8 = Sample.create(kit_name: 'DemoKit2', drum_name: 'Snare', url: 'https://s3.amazonaws.com/beat-box-samples/DemoKit1/snare.wav')
s9 = Sample.create(kit_name: 'DemoKit2', drum_name: 'HiHat', url: 'https://s3.amazonaws.com/beat-box-samples/DemoKit1/hihat.wav')
s10 = Sample.create(kit_name: 'DemoKit2', drum_name: 'Tom1', url: 'https://s3.amazonaws.com/beat-box-samples/DemoKit1/tom1.wav')
s11 = Sample.create(kit_name: 'DemoKit2', drum_name: 'Tom2', url: 'https://s3.amazonaws.com/beat-box-samples/DemoKit1/tom2.wav')
s12 = Sample.create(kit_name: 'DemoKit2', drum_name: 'Tom3', url: 'https://s3.amazonaws.com/beat-box-samples/DemoKit1/tom3.wav')
