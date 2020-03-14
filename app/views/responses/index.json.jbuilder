json.array! @responses do |response|
  json.responser response.responser
  json.content   response.content
  json.date      response.created_at.to_s(:datetime_jp)
end