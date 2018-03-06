require 'rails_helper'

RSpec.describe "audios/show", type: :view do
  before(:each) do
    @audio = assign(:audio, Audio.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
