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
  end

  def info
    @groups = Group.all.order("id DESC")
    render json: @groups
  end

  private

  def group_params
    params.require(:group).permit(:title).merge(user_id: current_user.id)
  end

end
