// This file holds all routes and fulfills requests by traversing the database (handled by sequelizer and mysql)

const db = require('./models/index');
const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, () => console.log('Server running on port, ' , port));

const courses = db.Course.findAll({
}).then ((allCourses) =>  {
    console.log('Test Course', allCourses);
})
.catch((error) => {
    console.log('Error adding test course', error);
});


// Create a course in the database via a POST request
app.post('/courses', (req, res) => {
    const { name, description, teacher, status, video_link, category_id } = req.body;
  
    // Create a new course instance, omitting fields with defaults
    db.Course.create({
        name,
        description,
        teacher,
        status,
        video_link,
        category_id,
    })
        .then((course) => {
            // Course created successfully
            res.status(201).json({ course });
        })
        .catch((error) => {
            // Error occurred during course creation
            console.error('Error creating course:', error);
            res.status(500).json({ error: 'Failed to create course' });
        });
});

// Create a category in the database via a POST request
app.post('/categories', (req, res) => {
    const { name } = req.body;
  
    // Create a new course instance, omitting fields with defaults
    db.Category.create({
        name,
    })
        .then((category) => {
            // Course created successfully
            res.status(201).json({ category });
        })
        .catch((error) => {
            // Error occurred during course creation
            console.error('Error creating category:', error);
            res.status(500).json({ error: 'Failed to create category' });
        });
});

// GET a singular course based on its ID
app.get('/courses/:id', (req, res) => {
    const courseId = req.params.id;
  
    // Find the course by ID in the database
    db.Course.findByPk(courseId)
      .then((course) => {
        if (!course) {
          // Course not found
          return res.status(404).json({ error: 'Course not found' });
        }
  
        // Course found, return it as a response
        res.status(200).json({ course });
      })
      .catch((error) => {
        // Error occurred while retrieving the course
        console.error('Error retrieving course:', error);
        res.status(500).json({ error: 'Failed to retrieve course' });
      });
});

// GET a list of all courses (in a json file)
app.get('/courses', (req, res) => {
    db.Course.findAll()
      .then((courses) => {
        res.status(200).json({ courses });
      })
      .catch((error) => {
        console.error('Error retrieving courses:', error);
        res.status(500).json({ error: 'Failed to retrieve courses' });
      });
});

// GET all categories
app.get('/categories', (req, res) => {
    db.Category.findAll()
      .then((categories) => {
        res.status(200).json({ categories });
      })
      .catch((error) => {
        console.error('Error retrieving categories:', error);
        res.status(500).json({ error: 'Failed to retrieve categories' });
      });
});

// GET courses based on category
app.get('/categories/:id', (req, res) => {
    const categoryId = req.params.id;
  
    db.Course.findAll({
      where: {
        category_id: categoryId
      }
    })
      .then((courses) => {
        res.status(200).json({ courses });
      })
      .catch((error) => {
        console.error('Error retrieving courses:', error);
        res.status(500).json({ error: 'Failed to retrieve courses' });
      });
});

// GET courses by a filter for their name/status
app.get('/courses/search/:courseName', (req, res) => {
    const name = req.params.courseName;
    const whereCondition = {};

    if (name) {
        whereCondition.name = name;
    }
  
    db.Course.findAll({
      where: whereCondition
    })
      .then((courses) => {
        res.status(200).json({ courses });
      })
      .catch((error) => {
        console.error('Error retrieving courses:', error);
        res.status(500).json({ error: 'Failed to retrieve courses' });
      });
});

// Delete a course from the database given its id
app.delete('/courses/:id', (req, res) => {
    const courseId = req.params.id;
  
    db.Course.destroy({
      where: {
        id: courseId
      }
    })
      .then((deletedCount) => {
        if (deletedCount === 1) {
          res.status(200).json({ message: 'Course deleted successfully' });
        } else {
          res.status(404).json({ error: 'Course not found' });
        }
      })
      .catch((error) => {
        console.error('Error deleting course:', error);
        res.status(500).json({ error: 'Failed to delete course' });
      });
});

app.delete('/categories/:name', (req, res) => {
    const categoryName = req.params.name;
  
    db.Category.destroy({
      where: {
        name: categoryName
      }
    })
      .then((deletedCount) => {
        if (deletedCount === 1) {
          res.status(200).json({ message: 'Category deleted successfully' });
        } else {
          res.status(404).json({ error: 'Category not found' });
        }
      })
      .catch((error) => {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Failed to delete category' });
      });
});

// assuming a one to many relationship between categories and courses.

// adding a course to a category
app.post('/categories/:categoryId/courses', (req, res) => {
    const { categoryId } = req.params;
    const { courseId } = req.body;
  
    db.Category.findByPk(categoryId)
      .then((category) => {
        if (category) {
          category.addCourse(courseId);
          res.status(200).json({ message: 'Course added to category successfully' });
        } else {
          res.status(404).json({ error: 'Category not found' });
        }
      })
      .catch((error) => {
        console.error('Error adding course to category:', error);
        res.status(500).json({ error: 'Failed to add course to category' });
      });
});

// updating a course's category
app.put('/courses/:id', (req, res) => {
    const courseId = req.params.id;
  
    db.Course.findByPk(courseId)
      .then((course) => {
        if (course) {
          course.category_id = null; // disassociate from the category
          return course.save();
        } else {
          throw new Error('Course not found');
        }
      })
      .then(() => {
        res.status(200).json({ message: 'Course disassociated from category successfully' });
      })
      .catch((error) => {
        console.error('Error disassociating course from category:', error);
        res.status(500).json({ error: 'Failed to disassociate course from category' });
      });
});

app.put('/courses/:id/:categoryId', (req, res) => {
    const courseId = req.params.id;
    const categoryId = req.params.categoryId;
  
    db.Course.findByPk(courseId)
      .then((course) => {
        if (course) {
          course.category_id = categoryId; // change the category
          return course.save();
        } else {
          throw new Error('Course not found');
        }
      })
      .then(() => {
        res.status(200).json({ message: 'Course disassociated from category successfully' });
      })
      .catch((error) => {
        console.error('Error disassociating course from category:', error);
        res.status(500).json({ error: 'Failed to disassociate course from category' });
      });
});

// GET category by name
app.get('/categories/name/:name', (req, res) => {
    console.log(req.params.name);
    const categoryName = req.params.name;
  
    db.Category.findOne({ where: { name: categoryName } })
      .then((category) => {
        if (!category) {
          return res.status(404).json({ error: 'Category not found' });
        }
        console.log(category);
        res.status(200).json({ category });
      })
      .catch((error) => {
        console.error('Error retrieving category:', error);
        res.status(500).json({ error: 'Failed to retrieve category' });
      });
  });
