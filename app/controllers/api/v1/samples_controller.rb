class SamplesController < ApplicationController
  def index
    render json: { samples: Samples.all}
  end
  
  def show
    render json: { sample: Samples.find(params[:id]) }
  end
end