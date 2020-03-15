require 'rails_helper'


describe Tag do
  describe '#create' do
    it 'is valid' do
      tag = build(:tag)
      tag.valid?
      expect(tag).to be_valid
    end

    it 'is invalid without name' do
      tag = build(:tag, name: "")
      tag.valid?
      expect(tag.errors[:name]).to include("can't be blank")
    end
  end
end