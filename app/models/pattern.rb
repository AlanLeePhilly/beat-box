class Pattern < ApplicationRecord
  belongs_to :user
  
  validates_presence_of :user, :grid, :name, :device
end