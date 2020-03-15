json.array! @groups do |group|
  json.id      group.id
  json.title   group.title
  json.lateRes group.responses.last
  json.resNum  group.responses.count
  json.tags    group.tags
end