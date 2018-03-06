require 'rails_helper'

RSpec.describe "audios/index", type: :view do
  before(:each) do
    assign(:audios, [
      Audio.create!(),
      Audio.create!()
    ])
  end

  it "renders a list of audios" do
    render
  end
end
