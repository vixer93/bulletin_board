class GroupsController < ApplicationController

  def index
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      render json: @group
    else
      redirect_to root_path
    end
  end

  def show
    @group = Group.find(params[:id])
    @tags  = @group.tags
  end

  def info
    @groups = Group.includes([:responses, :tags]).order("id DESC")
    render :info, formats: 'json', handlers: 'jbuilder'
  end

  private

  def group_params
    params.require(:group).permit(:title, tag_ids: []).merge(user_id: current_user.id)
  end

end
