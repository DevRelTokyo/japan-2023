require('json')
json = JSON.parse(open('./_data/speakers.json').read)

json.each do |speaker|
	next if speaker['conference'] == 'con'
	title = ''
	if speaker['comapny_ja'] != ''
		title = "#{speaker['name_ja']}@#{speaker['company_ja']}"
	else
		title = speaker['name_ja']
	end
	
  content = <<-EOS
---
layout: person
permalink: /speakers/#{speaker['id']}/
title: #{title}
ogp: /japan-2023/image/ogp/#{speaker['id']}.jpg
type: speaker
id: #{speaker['id']}
---
#{speaker['profile_ja']}
  EOS
  f = open("./speakers/#{speaker['id']}.md", 'w')
  f.write(content)
  f.close
end
