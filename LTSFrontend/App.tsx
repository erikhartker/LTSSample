/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import { TouchableOpacity } from 'react-native';
import { createCourse, getCourses, getCategories, createCategory } from './services/CourseService';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import { Card, Title, Paragraph } from 'react-native-paper';
import CoursesScreen from './screens/CoursesScreen';
import CreateCourseButton from './components/CreateCourseButton';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Modal,
  Alert,
  Pressable,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  
  const [courses, setCourses] = useState([]);

  // the functions below were used for initial testing
  useEffect(() => {
    // Fetch the courses data from the backend API
    axios.get('http://localhost:3000/courses')
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleCreateCourse = async () => {
    try {
      const courseData = {
        name: 'Drawing Course',
        description: 'A comprehensive course on Pencil Drawings',
        teacher: 'Notch',
        status: 'Subscription',
        video_link: 'Not available',
        category_id: 3,
      };

      const createdCourse = await createCourse(courseData);
      console.log('Course created:', createdCourse);
      // Handle successful creation or navigate to a new screen
    } catch (error) {
      // Handle error
    }
  };

  const handleCreateCategory = async () => {
    try {
      const categoryData = {
        name: 'Educational'
      };

      const createdCategory = await createCategory(categoryData);
      console.log('Category created:', createdCategory);
      // Handle successful creation or navigate to a new screen
    } catch (error) {
      // Handle error
    }
  };

  const handleGetCourses = async () => {
    try {
      const allCourses = await getCourses();
      console.log('Courses retrieved: ', allCourses);
    } catch (error) {
      console.log('Error retrieving courses');
    }
  };

  const handleGetCategories = async () => {
    try {
      const allCategories = await getCategories();
      console.log('Categories retrieved: ', allCategories);
    } catch (error) {
      console.log('Error retrieving categories');
    }
  };


  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [modalVisible, setModalVisible] = useState(false);

  // app driver, makes use of the CoursesScreen component
  return (
    
    <PaperProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView>
        <CoursesScreen/>
        </ScrollView>
        
      </SafeAreaView>
    </PaperProvider>

  );
}

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
    fontSize: 18,
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
    padding: 60,
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
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
