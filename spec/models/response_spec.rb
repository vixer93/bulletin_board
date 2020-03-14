require 'rails_helper'

describe Response do
  describe '#create' do
    before do
      @user = create(:user)
      @group = create(:group, user_id: @user.id)
    end
    it 'is valid' do
      response = build(:response, user_id: @user.id, group_id: @group.id)
      response.valid?
      expect(response).to be_valid
    end

    it 'is invalid without content' do
      response = build(:response, content: "", user_id: @user.id, group_id: @group.id)
      response.valid?
      expect(response.errors[:content]).to include("can't be blank")
    end

    it 'is invalid without responser' do
      response = build(:response, responser: "", user_id: @user.id, group_id: @group.id)
      response.valid?
      expect(response.errors[:responser]).to include("can't be blank")
    end

    it 'is invalid without user_id' do
      response = build(:response, group_id: @group.id)
      response.valid?
      expect(response.errors[:user]).to include("must exist")
    end

    it 'is invalid without group_id' do
      response = build(:response, user_id: @user.id)
      response.valid?
      expect(response.errors[:group]).to include("must exist")
    end

  end
end