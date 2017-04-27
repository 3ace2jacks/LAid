# Building the application, development setup
This project is written in Django, and requires python 3.x. We are not sure what x is needed, but we have used 3.6. 

You should probably use a [virtualenv](https://virtualenv.pypa.io/en/stable/userguide/) to keep the dependencies for this project.

To install the requirements you can run `pip install -r requirements.txt`.

You will have to copy the backend/local-settings.py.example to backend/local-settings.py. This makes sure that you can use different settings for different environments.

You will have to migrate the database. The default database is a SQLite database that should install automatically when running the `python manage.py migrate` command.

To run the development server use the command `python manage.py runserver`. This will by default host the application on a lightweight web server located at `localhost:8000`. 

Beware that this server is not intended for end-users to use, but as a tool for the front-end application to use. It is therefore diffcult to navigate, you need the exact urls to get some information from it.
