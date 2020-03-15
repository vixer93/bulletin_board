require 'rails_helper'

describe GroupTagRelation do
  describe '#create' do
    before do
      @user  = create(:user)
      @group = create(:group, user_id: @user.id)
      @tag   = create(:tag)
    end

    it 'is valid' do
      group_tag = build(:group_tag_relation, group_id: @group.id, tag_id: @tag.id)
      group_tag.valid?
      expect(group_tag).to be_valid
    end

    it 'is invalid without group_id' do
      group_tag = build(:group_tag_relation, tag_id: @tag.id)
      group_tag.valid?
      expect(group_tag.errors[:group]).to include("must exist")
    end

    it 'is invalid without tag_id' do
      group_tag = build(:group_tag_relation, group_id: @group.id)
      group_tag.valid?
      expect(group_tag.errors[:tag]).to include("must exist")
    end
  end
end