class Sample < ApplicationRecord
  
  validates_presence_of :kit_name, :drum_name, :url
end 