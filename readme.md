# COVIDASH
  
  ![Screenshot](/client/public/ss.png)
Comprehensive COVID-19 Tracker.

# TEAM MEMBERS
- Loughlin Claus (*10423561*)
- Irfan Shaikh (*10466853*)
- Maithili Deshmukh (*10454930*)
- Saish Sankhe (*10454992*)

  <a name="env"> </a>
# INSTALLATION 
- Install the following additional binaries before proceeding
	- [Redis (Stable)](https://redis.io/download)
	- [Imagemagick ](https://imagemagick.org/script/download.php)
		- If on a **windows** machine, imagemagick module has a known bug which makes it unable to read the PATH variable from `ENVIRONMENT`. We have manually set the path to default windows location. If it throws `Error: spawn identify ENOENT` then you may have to set the correct location to `convert.exe` and `identify.exe` binaries which is relative to your machine in `./server/routes/photo.js` file

- Run redis server
- Client
	 ```
	 cd client
	 npm i
	 npm run start
	 ```
- Server
	```
	cd server
	npm i
	node app
	```

