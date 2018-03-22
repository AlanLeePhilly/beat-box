require 'rails_helper'

RSpec.describe Sample, type: :model do
  let(:sample) { Sample.new }
  let(:kit_name) { 'myKitName' }
  let(:drum_name) { 'myDrumName' }
  let(:url) { 'https://s3.amazonaws.com/test-folder/DemoKit1/kick.wav' }

  
  it "is valid with valid attributes" do
    sample.kit_name = kit_name
    sample.drum_name = drum_name
    sample.url = url
    
    expect(sample).to be_valid
  end
  
  it "is not valid without a kit_name" do
    sample.drum_name = drum_name
    sample.url = url
    
    expect(sample).to_not be_valid
  end
  
  it "is not valid without a drum_name" do
    sample.kit_name = kit_name
    sample.url = url
    
    expect(sample).to_not be_valid
  end
  
  
  it "is not valid without a url" do
    sample.kit_name = kit_name
    sample.drum_name = drum_name

    expect(sample).to_not be_valid
  end
end