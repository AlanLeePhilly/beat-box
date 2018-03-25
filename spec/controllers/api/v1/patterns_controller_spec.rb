require 'rails_helper'

RSpec.describe Api::V1::PatternsController, type: :controller do
  let!(:user1) {
    User.create({
      provider: "google",
      uid: "100017581895406409568",
      first_name: "Alan",
      last_name: "Lee",
      email: "alanjlee89@gmail.com"
    })
  }

  let!(:pattern1) {
    Pattern.create({
      user: user1,
      name: 'pattern1',
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
  }

  let!(:pattern2) {
    Pattern.create({
      user: user1,
      name: 'pattern2',
      device: 'sequencer',
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
  }
  
  describe 'GET#index' do
    it 'should return a list of all the patterns' do
      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['patterns'].length).to eq 2
      expect(returned_json['patterns'][0]['name']).to eq 'pattern1'
      expect(returned_json['patterns'][1]['device']).to eq 'sequencer'
    end
  end
  describe 'GET#show' do
    it 'should return a single pattern by id' do
      get :show, params: { id: pattern1.id }
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['pattern']['name']).to eq 'pattern1'
      expect(returned_json['pattern']['device']).to eq 'synth'
    end
  end
end