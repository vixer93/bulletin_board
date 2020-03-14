class TagsCollection
  include ActiveModel::Conversion
  extend  ActiveModel::Naming
  extend  ActiveModel::Translation
  include ActiveModel::AttributeMethods
  include ActiveModel::Validations

  attr_accessor :collection

  def initialize(tags=[])
    if tags.present?
      self.collection = tags["name"].map do |tag|
        Tag.new(name: tag)
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
end