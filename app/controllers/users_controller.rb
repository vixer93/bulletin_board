class UsersController < ApplicationController
  def current
    render json: user_signed_in?
  end

  def user_name
    render json: current_user.name
  end
end
