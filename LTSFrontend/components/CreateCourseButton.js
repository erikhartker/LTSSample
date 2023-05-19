import React, { useState } from 'react';
import { Modal, Button, View, StyleSheet} from 'react-native';
import { TextInput, PaperProvider } from 'react-native-paper';
import { createCourse, getCategoryByName } from '../services/ApiService';

// This component is not currently utilized (was moved into the CoursesScreen file)

const CreateCourseButton = () => {
    
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [link, setLink] = useState('');
    const [teacher, setTeacher] = useState('');
    const [description, setDescription] = useState('');
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = async () => {
        try {
            // Get the category ID based on the category name
            const category = await getCategoryByName(name);

            const category_id = category.id;


            const courseData = {
                name: name,
                description: description,
                teacher: teacher,
                status: status,
                video_link: link,
                category_id: category_id,
            };
            // const courseData = {
            //     name: 'Video Course',
            //     description: 'A comprehensive course on Video Games',
            //     teacher: 'Notch',
            //     status: 'Free',
            //     video_link: 'Not available',
            //     category_id: 2,
            //   };
            console.log(courseData);
      
            const newCourse = await createCourse(courseData);
      
            setName('');
            setStatus('');
            setLink('');
            setTeacher('');
            setDescription('');
            setCategoryName('');
            setModalVisible(false);
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Button title='Create Course' onPress={() => setModalVisible(true)}/>
            <Modal visible={modalVisible} animationType="slide">
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
                    <Button title="contained" onPress={handleSubmit}>
                    Submit
                    </Button>
                    <Button title="contained" onPress={() => setModalVisible(false)}>
                    Cancel
                    </Button>
                </View>
            </Modal>
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
    buttonStyle: {
        borderColor: 'hotpink',
        borderWidth: 0.25, 
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0.5,
          },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
  });

  export default CreateCourseButton;
