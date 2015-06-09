<<<<<<< HEAD
#API

###√ ACCOUNT
####√ Register
```
POST    /account/register
            - firstname
            - lastname
            - password
            - email
```
####√ Login
```
POST    /account/login
            - email
            - password
```
####√ DEVICE REGISTER
```
POST    /registerdevice
            - uuid
            - model
            - platform
            - os_version
            - app_version
```
##V1 API
####Parent
```
/api/v1/parent
    GET     /:id
    POST    /:id/addchild
                - name
    POST    /:id/changepassword
                - old_password
                - new_password
    GET     /:id/getchild/:id
    GET     /:id/getchildren
```
####Child
```
/api/v1/child
    GET     /:id
    POST    /:id/addgame
    GET     /:id/getgames
```
####Device
```
/api/v1/device
    GET     /:id
```
####Game
```
/api/v1/game
    GET     /:id
    GET     /:id/getsettings
    POST    /create
        - name
        - owner
    POST    /:id/update
        -data
        -data

```
=======
This README.md file is displayed on your project page. You should edit this 
file to describe your project, including instructions for building and 
running the project, pointers to the license under which you are making the 
project available, and anything else you think would be useful for others to
know.

We have created an empty license.txt file for you. Well, actually, it says,
"<Replace this text with the license you've chosen for your project.>" We 
recommend you edit this and include text for license terms under which you're
making your code available. A good resource for open source licenses is the 
[Open Source Initiative](http://opensource.org/).

Be sure to update your project's profile with a short description and 
eye-catching graphic.

Finally, consider defining some sprints and work items in Track & Plan to give 
interested developers a sense of your cadence and upcoming enhancements.
>>>>>>> cdb8e9a0217d74f989ab5b3b702c0e31c96a2c37
