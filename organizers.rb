require('json')
json = JSON.parse(open('./_data/organizers.json').read)

json.each do |organizer|
	next if organizer['type'] == 'group'
  content = <<-EOS
---
layout: person
permalink: /organizers/#{organizer['id']}/
id: #{organizer['id']}
---
  EOS
  f = open("./organizers/#{organizer['id']}.md", 'w')
  f.write(content)
  f.close
end
