require 'rails_helper'

RSpec.describe Api::V1::SamplesController, type: :controller do

  let!(:sample1) { FactoryBot.create(:sample) }
  let!(:sample2) { FactoryBot.create(:sample) }
  
  describe 'GET#index' do
    it 'should return a list of all the samples' do
      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['samples'].length).to eq 2
      expect(returned_json['samples'][0]['kit_name']).to eq sample1.kit_name
      expect(returned_json['samples'][1]['drum_name']).to eq sample2.drum_name
    end
  end
  
  describe 'GET#show' do
    it 'should return a single sample by id' do
      get :show, params: { id: sample1.id }
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['sample']['kit_name']).to eq sample1.kit_name
      expect(returned_json['sample']['url']).to eq sample1.url
    end
  end
end