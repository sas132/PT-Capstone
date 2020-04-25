# PT-Capstone
```
.github/workflows/deploy.yml  -Workflow script to auto deploy to Heroku. Commented out so we don't break the app while you grade it.
controllers/list.js   -controller for list operations
controllers/task.js   -controller for task operations
controllers/user.js   -controller for user operations
models/db.js    -functions for db and db schema
models/list.js  -list model
models/task.js  -task model
models/user.js  -user model
public/favicon.ico  -icon for web app. default icon from react (whoops we never changed it)
public/index.html   -landing page for web app
public/*            -default logos, robot.txt, manifest.json
services/listService.js   -functions to handle list db read / write
services/taskService.js   -functions to handle task db read / write
services/userService.js   -functions to handle user db read / write
services/token.js         -functions related to handling authorization token
src/components/Content/Content.js             -Component controlling display of central content. Controls primary authorization check.
src/components/FooterMenu/FooterMenu.js       -Component that displays the footer menu and handles user input there
src/components/ListView/ListView.js           -Primary composite component used to display all lists and tasks
src/components/Loading/Loading.js             -Simple loading component
src/components/People/People.js               -Component to allow users to invite / add people. not finished or included in final deployment.
src/components/Profile/Profile.js             -Component displays profile details of current user
src/components/Settings/Settings.js           -Settings Component. Mock up
src/components/Sidebar/Sidebar.js             -Side navigation bar component handles user input
src/components/TopBar/TopBar.js               -Top navigation bar component handles user input
src/components/UserSelector/UserSelector.js   -Component to simplify selecting a valid user
src/components/Welcome/Welcome.js             -Welcome component. Only view when not authenticated
src/utils/history.js                              -Browser history. Not yet implemented as our route never changes, but used for Auth0.
src/App.css           -basic styling for overall app
src/App.js            -Primary parent component. Tracks overall application state and views.
src/App.test.js       -Jest test for App.js. incomplete.
src/auth_config.js    -identifiers for Auth0 token utilization. Safe to be public.
src/index.css         -basic css used if react fails to initialize. (adblockers, NoScript, etc.)
src/index.js          -entry point for react app
src/logo.svg          -we never made a good logo so this is the default one.
src/serviceWorker.js  -default create-react-app service worker.
src/setupTests.js     -script to handle test configuration
.gitingnire         -files/folders for git to ignore
README.md           -this file
credentials.js      -identifiers for MongoDB
package-lock.json   -contains package names and versions to use for npm
package.json        -contains list of dependencies and development commands
server.js           -Primary server. has endpoint definitions and listen method
```
