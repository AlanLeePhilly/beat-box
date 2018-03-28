class Api::V1::PatternsController < ApplicationController  
  def index
    render json: { patterns: Pattern.all}
  end
  
  def show
    render json: { pattern: Pattern.find(params[:id]) }
  end
  
  def create
    pattern = Pattern.new(pattern_params)
    pattern.grid = params['pattern']['grid']
    pattern.user = current_user
    if pattern.save
      render json: { pattern: pattern }
    else
      render json: { errors: pattern.errors.full_messages }
    end
  end
  
  private
  def pattern_params
    params.require(:pattern).permit(:user_id, :name, :device)
  end
end