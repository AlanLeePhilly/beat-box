# README
[ ![Build Status](https://app.codeship.com/projects/e0d06150-c633-0135-c48c-2672feea050e/status?branch=master)](https://app.codeship.com/projects/261129)  [![Code Climate](https://codeclimate.com/github/AlanLeePhilly/beat-box/badges/gpa.svg)](https://codeclimate.com/github/AlanLeePhilly/beat-box)  [![Coverage Status](https://coveralls.io/repos/github/AlanLeePhilly/beat-box/badge.svg?branch=master)](https://coveralls.io/github/AlanLeePhilly/beat-box?branch=master)

Dependencies

    Ruby 2.3.3
    React 15.6.2
    Redux 3.7.2
    Sass 3.4.25

Deployment instructions

    rake db:create && rake db:migrate && rake db:seed
    npm install && npm start
    bundle install && bundle exec rails s
    http://localhost:3000/ 

Todos:
* Change Volume to display knob
* Put Oscilloscope in seperate module
* Add Controls to Oscilloscope module
* Convert SamPlay & loader to one button
* Convert SynPlay & updater to one button

