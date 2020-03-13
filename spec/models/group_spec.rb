require 'rails_helper'

describe Group do
  describe '#create' do
    it 'is valid' do
      user = create(:user)
      group = build(:group, user_id: user.id)
      expect(group).to be_valid
    end

    it 'is invalid without title' do
      user = create(:user)
      group = build(:group, title: "", user_id: user.id)
      group.valid?
      expect(group.errors[:title]).to include("can't be blank")
    end

    it 'is invalid without user_id' do
      user = create(:user)
      group = build(:group)
      group.valid?
      expect(group.errors[:user]).to include("must exist")
    end
  end
end
