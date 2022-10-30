require('json')
json = JSON.parse(open('./_data/organizers.json').read)

json.each do |organizer|
	next if organizer['type'] == 'group'
	title = ''
	if organizer['comapny'] != ''
		title = "#{organizer['name']}@#{organizer['company']}"
	else
		title = organizer['name']
	end
	
  content = <<-EOS
---
layout: person
permalink: /organizers/#{organizer['id']}/
title: #{title}
ogp: /japan-2023/image/ogp/#{organizer['id']}.jpg
type: organizer
id: #{organizer['id']}
---
#{organizer['profile_ja']}
  EOS
  f = open("./organizers/#{organizer['id']}.md", 'w')
  f.write(content)
  f.close
end
