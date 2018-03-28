class Api::V1::SamplesController < ApplicationController
  def index
    render json: { samples: Sample.all}
  end
  
  def show
    render json: { sample: Sample.find(params[:id]) }
  end
end