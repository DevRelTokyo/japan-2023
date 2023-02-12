#!bin/bash
wget https://script.google.com/macros/s/$DEVREL_GOOGLE_ID/exec?name=organizers -O _data/organizers.json
wget https://script.google.com/macros/s/$DEVREL_GOOGLE_ID/exec?name=sessions -O _data/sessions.json
wget https://script.google.com/macros/s/$DEVREL_GOOGLE_ID/exec?name=speakers -O _data/speakers.json
wget https://script.google.com/macros/s/$DEVREL_GOOGLE_ID/exec?name=sponsors -O _data/sponsors.json
wget https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fzenn.dev%2Fp%2Fdevrel%2Ffeed -O _data/blog.json
ruby organizers.rb
ruby speakers.rb
npx ts-node feed.ts
npx ts-node index.ts
