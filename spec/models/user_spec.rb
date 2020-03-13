require 'rails_helper'

describe User do
  describe '#create' do
    it 'is valid' do
      user = build(:user)
      user.valid?
      expect(user).to be_valid
    end

    it 'is invalid without email' do
      user = build(:user, email: '')
      user.valid?
      expect(user.errors[:email]).to include("can't be blank")
    end

    it 'is invalid without password' do
      user = build(:user, password: '')
      user.valid?
      expect(user.errors[:password]).to include("can't be blank")
    end

    it 'is invalid without password_confirmation' do
      user = build(:user, password_confirmation: "")
      user.valid?
      expect(user.errors[:password_confirmation]).to include("doesn't match Password")
    end

    it 'is invalid with a duplicate email address' do
      user = create(:user)
      another_user = build(:user, email: user.email)
      another_user.valid?
      expect(another_user.errors[:email]).to include("has already been taken")
    end

    it 'is invalid with incorrect email format' do
      user = build(:user, email: "aaa@gmail,com")
      user.valid?
      expect(user.errors[:email]).to include("is invalid")
    end

    it 'should be saved lower case email address' do
      user = create(:user, email: "AAA@gmail.com")
      expect(user.email).to eq("aaa@gmail.com")
    end
  end
end