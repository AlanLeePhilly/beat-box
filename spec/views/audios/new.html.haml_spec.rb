require 'rails_helper'

RSpec.describe "audios/new", type: :view do
  before(:each) do
    assign(:audio, Audio.new())
  end

  it "renders new audio form" do
    render

    assert_select "form[action=?][method=?]", audios_path, "post" do
    end
  end
end
