class Api::V1::PatternsController < ApplicationController  
  def index
    render json: { patterns: Pattern.all}
  end
  
  def show
    render json: { pattern: Pattern.find(params[:id]) }
  end
  
  def create
    pattern = Pattern.new(pattern_params)
    pattern.save
  end
  
  private
  def pattern_params
    params.require(:pattern).permit(:user_id, :name, :grid, :device)
  end
end