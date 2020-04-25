# PT-Capstone
.github/workflows/deploy.yml  -Workflow script to auto deploy to Heroku. Commented out for grading.
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
src/components/Content/Content.js             -Component controlling display of central content. Controls primary authorization check.
src/components/FooterMenu/FooterMenu.js       -Component that displays the footer menu and handles user input there
src/components/ListView/ListView.js           -Primary composite component used to display all lists and tasks
src/components/Loading/Loading.js             -Simple loading component
src/components/People/People.js               -Component to allow users to invite / add people. not finished or included in final deployment.
src/components/Profile/Profile.js             -
src/components/Settings/Settings.js
src/components/Sidebar/Sidebar.js
src/components/TopBar/TopBar.js
src/components/UserSelector/UserSelector.js
src/components/Welcome/Welcome.js
