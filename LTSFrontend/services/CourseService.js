import axios from 'axios';

// File for requests to the backend.


// API call to create a course
export const createCourse = async (courseData) => {
  const url = 'http://localhost:3000/courses';

  try {
    const response = await axios.post(url, courseData);
    return response.data; // Optionally return the created course data
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

// API call to create a category
export const createCategory = async (categoryData) => {
  const url = 'http://localhost:3000/categories';

  try {
    const response = await axios.post(url, categoryData);
    return response.data; // Optionally return the created course data
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

// API call to retrieve a list of all courses
export const getCourses = async () => {
    const url = 'http://localhost:3000/courses';
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error retrieving courses:', error);
        throw error;
    }
};

// API call to retrieve a list of all categories
export const getCategories = async () => {
    const url = 'http://localhost:3000/categories';
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error retrieving courses:', error);
        throw error;
    }
};

// API call to delete a course
export const removeCourse = async (courseId) => {
  const url = `http://localhost:3000/courses/${courseId}`;
  try {
      const response = await axios.delete(url);
      return response.data;
  } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
  }
};

// API call to get a course based on its id
export const getCourse = async (id) => {
  const url = 'http://localhost:3000/courses/';
  url += id;
  try {
      const response = await axios.get(url);
      return response.data;
  } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
  }
};

// API call to retrieve a category given its name (used for changing a course's category)
export const getCategoryByName = async (name) => {
  const url = `http://localhost:3000/categories/name/${name}`;
  try {
      const response = await axios.get(url);
      return response.data;
  } catch (error) {
      console.error('Error getting category by name:', error);
      throw error;
  }
};

// API call to update a course's category id (used in changing a course's category)
export const updateCourseCategoryID = async (courseId, categoryID) => {
  const url = `http://localhost:3000/courses/${courseId}/${categoryID}`;
  try {
      const response = await axios.put(url);
      return response.data;
  } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
  }
};

// API call to retrieve a course that matches a particular course name
export const getCourseSearch = async (courseName) => {
  const url = `http://localhost:3000/courses/search/${courseName}`;
  try {
      const response = await axios.get(url);
      return response.data;
  } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
  }
};

// API call to delete a category
export const removeCategory = async (name) => {
  console.log(name);
  const url = `http://localhost:3000/categories/${name}`;
  try {
      const response = await axios.delete(url);
      return response.data;
  } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
  }
};

