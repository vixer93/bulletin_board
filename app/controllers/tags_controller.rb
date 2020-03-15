class TagsController < ApplicationController
  require_relative '../commonclass/tags_collection.rb'

  def create
    @tags = TagsCollection.new(tag_params)
    if @tags.save
      render json: @tags.tag_ids
    else
      redirect_to root_path
    end
  end

  private

  def tag_params
    params.require(:tag).permit(name: [])
  end
end
