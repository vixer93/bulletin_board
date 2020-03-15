class TagsCollection
  include ActiveModel::Conversion
  extend  ActiveModel::Naming
  extend  ActiveModel::Translation
  include ActiveModel::AttributeMethods
  include ActiveModel::Validations

  attr_accessor :collection

  def initialize(tags=[])
    self.collection = tags["name"].map do |tag|
      if Tag.where(name: tag).count == 0
        Tag.new(name: tag)
      else
        Tag.find_by(name: tag)
      end
    end
  end

  def save
    is_success = true
    ActiveRecord::Base.transaction do
      collection.each do |result|
        is_success = false unless result.save
      end
      raise ActiveRecord::RecordInvalid unless is_success
    end
    rescue
      puts 'エラー'
    ensure
      return is_success
  end

  def tag_ids
    tag_ids = collection.map do |tag|
      tag.id
    end
  end
end