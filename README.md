
# Widget Wizard
Widget Wizard is an application which a user can set as their home page to allow the immediate access of various widgets. All widgets possess their own unique functionality and provide the users with tools and information which are conveniently and immediately accessible without navigating to other web pages.

### Widget Wizard link
Widget Wizard can be accessed here: https://widget-wizard.herokuapp.com/

## Features
Widget Wizard integrates a minimalistic interface with an animated side bar that holds all the widgets. Clicking the top right menu opens the widget dock and allows access to the widgets.

![Home Interface](https://github.com/jtabba/Widget_app/blob/main/client/images/README_images/interface_resized.jpeg)

Through the widget dock users can also access the login and sign up features. Signing up and logging in enables the grid layout to be saved to where ever the logged in user has positioned them on the interface.

![Home Interface](https://github.com/jtabba/Widget_app/blob/main/client/images/README_images/sidebar_resized.jpeg)

The current widget list includes a:

- Clock - display your current time.
- Cryptocurrency price and graph - search a cryptocurrency and view its daily price movement.
- Dictionary and thesaurus widget - search for word meanings and synonyms.
- Random photo generator - view and change images at the touch of a button.
- Weather widget - see the daily weather forecast based on your location.

![Home Interface](https://github.com/jtabba/Widget_app/blob/main/client/images/README_images/widgets_resized.jpeg)


# Development of back-end and front-end functionality
Widget Wizard was a collaborative project with 4 team members. Each member was self-assigned to and involved in different aspects of its development. 

A Trello board was used to create and organise the workflow of the project. A huge benefit of organising work in this manner was that tasks were easily planned and saved for team members to move on to once one task was complete.

![Home Interface](https://github.com/jtabba/Widget_app/blob/main/client/images/README_images/trello_resized.jpeg)


## Widget application development 
A main priority of the team was to integrate seamless widget movement across the interface and the easy integration of new widgets, for both a pleasant user experience and straightforward development for the project members. To achieve this, the Widget Wizard team utilised GridstackJS and created a miniature framework using a class system to implement this functionality.

### Difficulty
A primary difficulty with this aspect of the project was the simplicity of the GridstackJS library. Initially, GridstackJS did not accept script tags, which made incorporating interactive widgets impossible. The first day of the project was spent researching and writing functions to overcome this hurdle.


## Front-end and widget design
The UI of Widget Wizard developed over the course of the project’s development. Initial themes and ideas were briefly touched upon during the first day of development, which later progressed as widgets were built. A basic theme was created which gave members freedom to work and create widgets with a degree of creative freedom. The UI was created with simplicity in mind to not steer attention away from the widgets while also allowing as much useable room as possible.

Widgets were created on the client-side of the project using JavaScript, HTML and CSS. Various unique libraries and API’s were integrated into each widget to achieve its desired functionality and create a varied scope of user choices. Furthermore, widgets are held in the widget dock until they are dragged and dropped on to the interface. Widgets are easily removed by dragging and dropping them into the bin in the top left corner.

### Difficulty
The team-based nature of the project required members to be able to read and navigate each others code, which at times was difficult when something new or unknown was encountered. A significant degree of communication was required between team members, as well as the use of development tools in order to understand the codebase. 


## User login, data storage and password encryption 
A requirement of Widget Wizard was the ability to handle user data to enable logins and save users’ unique widget positions on their interface. Security was a major priority and required the integration of BCrypt to hash users’ passwords. Additionally, the use of express-sessions was necessary to enable unique instances of the application.

### Difficulty
Team members had no prior experience of using BCrypt or express-session with NodeJS, which made incorporating these features difficult. Successful implementation required the reading and discussion of documentation between the team members to troubleshoot issues. Furthermore, sending data between the client and server was problematic and segments of the process were often misunderstood, which caused errors that required a significant amount of time to patch.

# Reflection
Each member was able to bring something different and beneficial to the project. Once momentum was gained significant amounts of progress were made in a short amount of time.

Communication and team work were among the most significant aspects of this project. The team encountered no issues with discussing concepts and problems with other members, however collaborating with the use of git was troublesome. All members of the team encountered a major error with git at some point during the development. Navigating the commands plus understanding the sequence and purpose of their use was difficult, and at times caused errors and the loss of files which required a significant amount of time and effort to resolve. Despite this, by the final day we had all emerged with major improvements in our ability to use git and the process was almost seamless.

Working as a team was enjoyable for all team members and everyone emerged with some newfound skills and knowledge. Communication was a big priority from day 1, a significant portion of which was spent discussing ideas, parts of development and concepts necessary for the projects success. A Trello board was used to create tasks which needed to be completed based on this initial discussion, after which members essentially self-assigned and worked on their own segments of the project. Additionally, morning meetings were held at the start of every day where members would discuss what they had completed, what was still required and which task they would be moving on to. A clear vision of the developments progression was understood by all members which not only gave everyone an insight into what was to be done, but also enabled members to help anyone who encountered difficulty as they understood the necessary underlying concepts.

Overall, the communication and collaboration of members in conjunction with their unique ideas and implementations lead to the success of Widget Wizard. It was a rewarding experience with an outcome that we are all proud of.

## Lessons learned
- Using git and Github
- Planning and collaboration 
- Using NodeJS for server-side development
- Communicating client, server and database information
- Creating a multi-file web application
- Troubleshooting git problems
- Implementing BCrypt and express-session with NodeJS
- Parsing and saving json into the database
- Using classes
- Deploying a NodeJS project to Heroku 
- Creating widgets using GridstackJS
- Using new API’s
