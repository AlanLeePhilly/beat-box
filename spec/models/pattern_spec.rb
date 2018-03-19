require 'rails_helper'

RSpec.describe Pattern, type: :model do
  let(:pattern) { Pattern.new }
  let(:user) { User.create }
  let(:name) { 'myPatternName' }
  let(:device) { 'synth' }
  let(:grid) {[
    [1,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0],
    [0,0,0,1,0,0,0,0],
    [0,0,0,0,1,0,0,0],
    [0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,1,0],
    [0,0,0,0,0,0,0,1]
  ]}
  
  it "is valid with valid attributes" do
    pattern.user = user
    pattern.name = name
    pattern.device = device
    pattern.grid = grid
    expect(pattern).to be_valid
  end
  
  it "is not valid without a user" do
    pattern.name = name
    pattern.device = device
    pattern.grid = grid
    expect(pattern).to_not be_valid
  end
  
  it "is not valid without a name" do
    pattern.user = user
    pattern.device = device
    pattern.grid = grid
    expect(pattern).to_not be_valid
  end
  
  it "is not valid without a grid" do
    pattern.user = user
    pattern.name = name
    pattern.device = device
    expect(pattern).to_not be_valid
  end
  
  it "is not valid without a device" do
    pattern.user = user
    pattern.name = name
    pattern.grid = grid
    expect(pattern).to_not be_valid
  end
end