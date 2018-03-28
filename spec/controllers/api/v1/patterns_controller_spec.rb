require 'rails_helper'

RSpec.describe Api::V1::PatternsController, type: :controller do
  let!(:user1) { FactoryBot.create(:user) }
  let!(:pattern1) { FactoryBot.create(:pattern) }
  let!(:pattern2) { FactoryBot.create(:pattern) }
  
  before do
    allow(controller).to receive_messages(current_user: user1)
  end
  
  describe 'GET#index' do
    it 'should return a list of all the patterns' do
      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['patterns'].length).to eq 2
      expect(returned_json['patterns'][0]['name']).to eq pattern1.name
      expect(returned_json['patterns'][1]['device']).to eq pattern2.device
    end
  end
  
  describe 'GET#show' do
    it 'should return a single pattern by id' do
      get :show, params: { id: pattern1.id }
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['pattern']['name']).to eq pattern1.name
      expect(returned_json['pattern']['device']).to eq pattern1.device
    end
  end
  
  describe 'POST#create' do
    it 'should create a new pattern belonging to the current user' do
      post :create, 
        params: {
          pattern: { 
            name: 'newPattern1',
            device: 'sequencer',
            grid: [
             [0,0,0,0,0,0,0,0],
             [1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1]
            ]
          }
        }

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(returned_json['pattern']['name']).to eq 'newPattern1'
      expect(Pattern.count).to eq 3
    end
    
    it 'should return error messages for invalid submissions' do
      post :create, 
        params: {
          pattern: { 
            name: '',
            device: '',
            grid: []
          }
        }

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(returned_json['errors']).to eq ["Grid can't be blank", "Name can't be blank", "Device can't be blank"]
    end
  end
end