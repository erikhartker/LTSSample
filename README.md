# LTSSample
Interview Project for Learn to Start. 
- Demo/Walkthrough found here: https://youtu.be/E0nFjSd1UNs 

# LTSFrontend
- Created in React Native for IOS
- Utilizes React Native Paper for UI
- Responsible for displaying all course info and category info to the screen.
  - User has autonomy over adding courses, removing courses, searching for courses based on name, changing the category of a course, removing a course's category, creating a new category, removing a category, sorting courses by their category type.
  - Communicates with the backend to get, post, update, and delete relevant information to the database.
 
# LTSBackend
- Express.js, Sequelizer and MySql for database management
- The Express portion is responsible for creating routes and handling requests from the frontend by traversing the database through the use of sequelizer
- SQL used for the database through the means of MySql. Two tables were created (courses and categories)
  - Sequelizer used to abstract database operations for ease of use.
