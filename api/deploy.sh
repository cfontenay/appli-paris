#!/bin/zsh

heroku container:push web  -a api-appli-paris   
heroku container:release web -a api-appli-paris
heroku ps:scale web=1 -a api-appli-paris 