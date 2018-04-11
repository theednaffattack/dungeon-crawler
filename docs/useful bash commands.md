Kill whatever's on port 3000
lsof -P | grep ':3000' | awk '{print $2}' | xargs kill -9

