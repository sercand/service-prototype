API


/account/register
    - firstname
    - lastname
    - password
    - email
/account/login
    - email
    - password

/registerdevice
    - uuid
    - model
    - platform
    - version
    - app_version

/api/v1/parent
      GET     /:id
      POST    /:id/addchild
                    - name
                    - parent_id
      POST    /:id/changepassword
                    - old_password
                    - new_password
      GET     /:id/getchild/:id
      GET     /:id/getchildren

/api/v1/device
             /:id
/api/v1/child
      GET   /:id
      POST  /:id/addgame
      GET   /:id/getgames

/api/v1/game
            /:id
            /:id/getsettings
