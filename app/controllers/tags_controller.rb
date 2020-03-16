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

  def search
    unless params[:tagword] == ""
      @tags = Tag.where("name LIKE(?)", "%#{params[:tagword]}%").first(5)
    end
    render json: @tags
  end

  private

  def tag_params
    params.require(:tag).permit(name: [])
  end
end
