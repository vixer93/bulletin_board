class ResponsesController < ApplicationController
  def index
    group = Group.find(params[:group_id])
    @responses = group.responses
    render :index, formats: 'json', handlers: 'jbuilder'
  end

  def create
    group = Group.find(params[:group_id])
    @response = group.responses.new(response_params)
    if @response.save
      render json: @response
    else
      redirect_to group_path(params[:group_id])
    end
  end

  private

  def response_params
    params.require(:response).permit(:content)
                             .merge(responser: current_user.name,
                                    user_id: current_user.id)
  end
end
