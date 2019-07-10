# tweet-tweet #

This webapp contains 2 parts, namely a frontend (FE) section and a backend (BE) server section. The FE is written in ReactJS with Redux for state management and the BE server is written in NodeJS. Below are the instructions on how to install and run the app.

Both the FE and server have automated unit tests written to handle most test cases the the app may experience. The FE contains one integration test to test the flow the app will undergo. The FE unit tests are written using `Jest + Enzyme` and the server unit tests are written in `Mocha` with the `Chai` assertion library. Further down is an explanation on how to run these tests.

### Requirement ###
This app was designed to read in two text files, namely *user.txt* and *tweet.txt* and print to the console a pre-defined output.
<br/>

The format of the *user.txt* file is as follows:

    Ward follows Alan
    Alan follows Martin
    Ward follows Martin, Alan

The format of the *tweet.txt* file is as follows:

    Alan> If you have a procedure with 10 parameters, you probably missed some.
    Ward> There are only two hard things in Computer Science: cache invalidation, naming things and off-by-1 errors.
    Alan> Random numbers should not be generated with a method chosen at random.

The output was to look like the below:

    Alan
        @Alan: If you have a procedure with 10 parameters, you probably missed some.
        @Alan: Random numbers should not be generated with a method chosen at random.
    Martin
    Ward
        @Alan: If you have a procedure with 10 parameters, you probably missed some.
        @Ward: There are only two hard things in Computer Science: cache invalidation, naming things and off-by-1 errors.
        @Alan: Random numbers should not be generated with a method chosen at random.
  
- - - - 
### Install Instructions: ###
1. Clone the repository by clicking the green 'Clone or Download' button near the top right and copying the url.
2. Create a folder to house the project and `cd` into that folder using the command line.
3. Type in git clone and the url copied above - `git clone https://github.com/SeanCollings/tweet-tweet.git` and hit enter
4. `cd` into the folder using `cd tweet-tweet`
5. Run `npm install`
6. `cd` into the client folder - `cd client`
7. Run `npm install` again
8. Everything should be installed correctly

### Startup Instructions: ###
1. `cd` into the root directory of the project if not already there - i.e. inside `/tweet-tweet`
2. Run `npm run dev` to start up the application
3. This should start both the server and the client. The client should open in your default web browser under `localhost:3000`
4. One of the better browsers to view this app in is Chrome

### Running Tests: ###
Both the FE `Jest + Enzyme` tests as well as the server `Mocha + Chai` tests can be run at the same time and from the same command window. This allows all changes throughout the app to be run at once and for errors to be found haste-haste. They both contain a watch tag so if they are running, they will automatically re-run the tests after every save.

The tests can be run as follows:
1. From within a command window in the `tweet-tweet` root folder, run the command `npm run test`
2. This will start up both tests. When first run, they may take some time to start up.

They can also be run seperatly so as to test only the client or server at a time.

For the client and from within the root directory, run:
1. `npm run test-client`

For the server and from within the root directory, run:
1. `npm run test-server`

- - - -

### Using the application without modifications: ###
From the browser with the application running and loaded to `localhost:3000`
1. Click the `Load Tweets` button
2. The tweets load to the screen
3. Click the `Clear` button
4. The tweets will be removed
5. Clicking the red ribbon in the top-left of the app with the title `Sean Collings` will open a new browser tab with the link to this repository.

### Modifying the app on the FE ###
There isn't much to modify here but the app does cater for offline mode after the inital load. When offline, it'll catch the `Network Error` error, hide the loader and display an error message to the user. This functionality is also available for all errors sent from the server and will display an error message to the user to notify them that the app functionality is hindered for the moment.

### Modifying the app on the server ###
The files that get uploaded can be found under the `uploads` folder in the root directory. Here, you can change the contents of both the `user.txt` and `tweet.txt` files following the assumptions stated below. The other files are there for testing purposes.

Another way to select different files from with in the codebase is to find the `tweetRoutes.js` file under the `routes` folder and find the line 

    const promises = await filesToUpload(FILES_TO_UPLOAD.CORRECT_FILES);. 
    
The `FILES_TO_UPLOAD.CORRECT_FILES` constant can be changed to cater for other file scenarios uncluding missing files and corrupted files. 

- - - -

### Assumptions ###
I went with the following assumptions when designing this app:

#### *user.txt* ####
1. Names are case sensitive therefore the name `'Alan'` will be different from the name `'alan'` 
2. There are no numbers in the names
3. There will only be one name before the word `'follow'`
4. There can be multiple names after the word `'follow'` delimited by a `','` only 
5. `'follow'` will be the only string that seperates the follower from the followees. Any other seperator will be ignored.
6. There will be only one line per 'followers' line and there will be no newline characters
7. Names will not contain `'\n'` or `'\r'` characters
8. The file contains only ASCII characters

#### *tweet.txt* ####
1. Names are case sensitive therefore in order to match with names in the user.txt file, they must be exact
2. There is only one name before the `'>'` character
3. There is only 1 tweet after the `'>'` character
4. `'>'` will be the only seperator between the tweeter and their tweet. Any other characters will be ignored.
5. Tweets will not contain the `'\n'` or `'\r'` characters
6. Tweets will only be on one line and won't contain newline characters
7. The file will only contain ASCII characters so a non-ASCII delimiter character may be introduced used to seperate strings

- - - -

#### Taking it further ####
There wasn't enough time for me to do everything that I wanted within this app and there a few things that if time permitted, would have made for some nice additions:
1. Added a feature on the FE to allow a user to upload their own `tweet.txt` or `user.txt` files. These files would then be sent to the server for processing to be returned and displayed in the correct format on the FE.
2. Deployed the code to Heroku so that the app would be available everywhere. This would have been done after point 1 so that users could make changes to the the tweets and users that get displayed.
3. Add a `CI/CD` implementation in Heroku so that any pushes to this repo would run all unit tests and if they passed, would then deploy it to Heroku automatically
