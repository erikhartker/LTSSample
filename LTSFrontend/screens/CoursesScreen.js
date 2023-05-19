import React, { useEffect, useState } from 'react';
import { View, FlatList, ScrollView, Text, Modal, StyleSheet, Pressable} from 'react-native';
import { Card, Title, Paragraph, TextInput, Searchbar, Appbar, List, Button } from 'react-native-paper';
import { getCourses, getCategories, removeCourse, getCategoryByName, createCourse, updateCourseCategoryID, getCourseSearch, createCategory, removeCategory } from '../services/CourseService.js';
import CourseCard from '../components/CourseCard';
import CategoryChips from '../components/CategoryChips';
import CreateCourseButton from '../components/CreateCourseButton.js';
import { Section } from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';

// file to represent the main screen of the app.


const CoursesScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [categoryUpdate, setCategoryUpdate] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [catModalVisible, setCatModalVisible] = useState(false);
  const [removeCatModalVisible, setRemoveCatModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [link, setLink] = useState('');
  const [teacher, setTeacher] = useState('');
  const [description, setDescription] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const [expanded2, setExpanded2] = React.useState(true);

  const handlePress2 = () => setExpanded2(!expanded2);

  const handleSubmit = async () => {
    try {
        // Get the category ID based on the category name
        const category = await getCategoryByName(categoryName);
        console.log(categoryName);
        //console.log(category);

        const category_id = category.category.id;
        console.log(category);


        const courseData = {
            name: name,
            description: description,
            teacher: teacher,
            status: status,
            video_link: link,
            category_id: category_id,
        };

        console.log(courseData);
  
        const newCourse = await createCourse(courseData);
  
        setName('');
        setStatus('');
        setLink('');
        setTeacher('');
        setDescription('');
        setCategoryName('');
        setModalVisible(false);
        fetchCourses();
    } catch (error) {
        console.error('Error creating course:', error);
    }
  };

  const handleSubmitCategory = async () => {
    try {
        const categoryData = {
            name: newCategory
        };
        const createdCategory = await createCategory(categoryData);
        console.log('Category created:', createdCategory);
        setNewCategory('');
        setCatModalVisible(false);
        fetchCategoriesData();

    } catch (error) {
        console.error('Error creating category:', error);
    }
  };

  const handleSubmitRemoveCategory = async () => {
    try {
        const deleteCategory = await removeCategory(newCategory);
        console.log('Category removed:', deleteCategory);
        setNewCategory('');
        setRemoveCatModalVisible(false);
        fetchCategoriesData();

    } catch (error) {
        console.error('Error removing category:', error);
    }
  };

  const handleUpdateCourseCategory = async (courseID, newCategoryName) => {
    try {
        console.log(newCategoryName);
        // Get the category ID based on the category name
        const category = await getCategoryByName(newCategoryName);
        console.log(category);
        //console.log(category);

        const category_id = category.category.id;
        console.log(category);
  
        const newCategory = await updateCourseCategoryID(courseID, category_id);
        setCategoryUpdate(!categoryUpdate);
        fetchCategoriesData();
  
    } catch (error) {
        console.error('Error updating category:', error);
    }
  };

  const handleRemoveCourseCategory = async (courseID) => {
    try{
        const newCategory = await updateCourseCategoryID(courseID, 0);
        setCategoryUpdate(!categoryUpdate);
        fetchCategoriesData();
    } catch (error) {
        console.error('Error removing course from category', error);
    }
  };


  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data.courses);
      console.log(courses);
    } catch (error) {
      console.error('Error retrieving courses:', error);
    }
  };

  const handleRemoveCourse = async (courseId) => {
    try {
      //console.log(courseId);
      await removeCourse(courseId);
      // After successful removal, update the courses list by filtering out the removed course
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));
    } catch (error) {
      console.error('Error removing course:', error);
    }
  };

  const fetchCategoriesData = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData.categories);
      console.log(categories);
    } catch (error) {
      console.error('Error retrieving categories:', error);
    }
  };

  const handleChipPress = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories((prevSelected) => [...prevSelected, categoryId]);
    }
  };


  useEffect(() => {
    fetchCourses();
    fetchCategoriesData();
  }, [categoryUpdate]);

  const filteredCourses = selectedCategories.length
  ? courses.filter((course) => selectedCategories.includes(course.category_id))
  : courses;

  const searchedCourses = searchQuery
  ? filteredCourses.filter((course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : filteredCourses;


  return (
      <View>
        <Appbar.Header>
            <Appbar.Content title="LTS Sample App"></Appbar.Content>
        </Appbar.Header>
        <View style={styles.sectionContainer}>
            <List.Section>
            <Searchbar
            placeholder="Search Courses"
            onChangeText={onChangeSearch}
            value={searchQuery}
            />
            </List.Section>

            <List.Section title="Actions">
                <List.Accordion
                    title="Filter by Category"
                    left={props => <List.Icon {...props} icon="card-bulleted-settings-outline" />}
                    expanded={expanded}
                    onPress={handlePress}>
                    <View style={styles.containerAccordian}>
                    <CategoryChips
                        style={styles.sectionDescription}
                        categories={categories}
                        selectedCategories={selectedCategories}
                        handleChipPress={handleChipPress}
                    />
                    </View>
                </List.Accordion>
                <List.Accordion
                    title="Edit Courses/Categories"
                    left={props => <List.Icon {...props} icon="square-edit-outline" />}
                    expanded={expanded2}
                    onPress={handlePress2}>
                    <ScrollView horizontal>
                    <View style={styles.containerAccordian}>
                        <Button  compact style={styles.buttonStyle} buttonColor='#fffeff' mode="outlined" onPress={() => setModalVisible(true)}>
                            <Text >Add Course</Text>
                        </Button>
                        <Modal visible={modalVisible} animationType="slide">
                        <Appbar.Header>
                            <Appbar.Content title="Create a Course" />
                        </Appbar.Header>
                            <List.Section style={styles.sectionContainer}>
                        
                            <View>
                                <TextInput
                                placeholder="Course Name"
                                value={name}
                                onChangeText={setName}
                                />
                                <TextInput
                                label="Description"
                                value={description}
                                onChangeText={setDescription}
                                />
                                <TextInput
                                label="Status"
                                value={status}
                                onChangeText={setStatus}
                                />
                                <TextInput
                                label="Teacher"
                                value={teacher}
                                onChangeText={setTeacher}
                                />
                                <TextInput
                                label="Link"
                                value={link}
                                onChangeText={setLink}
                                />
                                <TextInput
                                label="Category"
                                value={categoryName}
                                onChangeText={setCategoryName}
                                />
                                <List.Section style={styles.containerModal}>
                                    <Button style={styles.buttonStyle} buttonColor='#fffeff' mode="outlined" onPress={() => setModalVisible(false)}>
                                    Cancel
                                    </Button>
                                    <Button style={styles.buttonStyle} buttonColor='#fffeff' mode="outlined" onPress={handleSubmit}>
                                    Submit
                                    </Button>
                                </List.Section>
                                
                            
                            </View>
                            </List.Section>
                        </Modal>
                        <List.Section>
                        <Button compact style={styles.buttonStyle} buttonColor='#fffeff' mode="outlined" onPress={() => setCatModalVisible(true)}>
                            <Text>Add Category</Text>
                        </Button>
                        </List.Section>
                        <Modal 
                        visible={catModalVisible} 
                        animationType="slide"
                        >
                            <Appbar.Header>
                                <Appbar.Content title="Add a Category" />
                            </Appbar.Header>
                            <List.Section style={styles.sectionContainer}>
                            <View>
                                <View>
                                    <TextInput
                                    style={styles.modalText}
                                    label="Category Name"
                                    value={newCategory}
                                    onChangeText={setNewCategory}
                                    />
                                    <List.Section style={styles.containerModal}>
                                        <Button style={styles.buttonStyle} buttonColor='#fffeff' mode="outlined" onPress={() => setCatModalVisible(false)} >
                                        Cancel
                                        </Button>
                                        <Button style={styles.buttonStyle} buttonColor='#fffeff' mode="outlined" onPress={handleSubmitCategory}>
                                        Submit
                                        </Button>
                                    </List.Section>
                                </View>
                            </View>
                            </List.Section>
                        </Modal>
                        <Button compact style={styles.buttonStyle} buttonColor='#fffeff' mode="outlined" onPress={() => setRemoveCatModalVisible(true)}>
                            <Text >Remove Category</Text>
                        </Button>
                        <Modal visible={removeCatModalVisible} animationType="slide">
                            <Appbar.Header>
                                <Appbar.Content title="Remove a Category" />
                            </Appbar.Header>
                            <List.Section style={styles.sectionContainer}>
                            <View>
                                <TextInput
                                label="Category Name"
                                value={newCategory}
                                onChangeText={setNewCategory}
                                />
                                <List.Section style={styles.containerModal}>
                                    <Button style={styles.buttonStyle} buttonColor='#fffeff' mode="outlined" onPress={() => setRemoveCatModalVisible(false)}>
                                    Cancel
                                    </Button>
                                    <Button style={styles.buttonStyle} buttonColor='#fffeff' mode="outlined" onPress={handleSubmitRemoveCategory}>
                                    Submit
                                    </Button>
                                </List.Section>
                            </View>
                            </List.Section>
                        </Modal>
                    </View>
                    </ScrollView>
                </List.Accordion>    
            </List.Section>
            
            <List.Section title="Courses">
            <View >
            <FlatList
                data={searchedCourses}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                renderItem={({ item }) => (<CourseCard course={item} onRemove={handleRemoveCourse} onRemoveCategory={handleRemoveCourseCategory} onUpdateCategory={handleUpdateCourseCategory} />)}
            />
            </View>
            </List.Section>
        </View>
    </View>
    
        
  );
};

const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 16,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 40,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: 'hotpink',
    },
    textStyle: {
      color: 'hotpink',
      fontWeight: '500',
      textAlign: 'center',
      fontSize: 13
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    container: {
      marginTop: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    containerModal: {
        flexDirection: 'row',
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'space-around',
      },
    containerAccordian: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 7,
        alignItems: 'center',
        justifyContent: 'space-around',
      },
    buttonStyle: {
        borderColor: '#4b0082',
        borderWidth: 0.25, 
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0.5,
          },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginHorizontal: 5,
    }
  });

export default CoursesScreen;
