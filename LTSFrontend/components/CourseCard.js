import React from 'react';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Card, Title, TextInput, List, Text, Appbar, Button } from 'react-native-paper';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
    Modal,
    Alert,
    Pressable,
  } from 'react-native';

// This component represents an individual course card

const CourseCard = ({ course, onRemove, onRemoveCategory, onUpdateCategory }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalDetailsVisible, setModalDetailsVisible] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    console.log(course.id);


    return (
    <View style={styles.container}>
    <Card onPress={() => setModalDetailsVisible(true)}>
        <Card.Content>
        <Title>{course.name}</Title>
        {}
        
        </Card.Content>
        <Card.Actions style={{ justifyContent: 'flex-end' }}>
        <View style={styles.container}>
            <Button compact mode="outlined"  onPress={() => onRemove(course.id)}>
                <Text style={styles.textStyle}>Remove Course</Text>
            </Button>
            <Button compact  mode="outlined" onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Change Category</Text>
            </Button>
            <Button compact mode="outlined" onPress={() => onRemoveCategory(course.id)}>
                <Text style={styles.textStyle}>Remove From Category</Text>
            </Button>
        </View>
        <Modal style={styles.container} visible={modalVisible} animationType="slide">
            <List.Section style={styles.sectionContainer}>
                <View>
                    <Appbar.Header>
                        <Appbar.Content title="Change Category" />
                    </Appbar.Header>
                    
                    <TextInput
                    placeholder="New Category Name"
                    value={categoryName}
                    onChangeText={setCategoryName}
                    />
                    <List.Section style={styles.containerModal}>
                    <Button style={styles.buttonStyle} buttonColor='#fffeff' mode="outlined" onPress={() => setModalVisible(false)}>
                    Cancel
                    </Button>
                    <Button style={styles.buttonStyle} buttonColor='#fffeff' mode="outlined" onPress={() => {onUpdateCategory(course.id, categoryName); setModalVisible(false);}}>
                    Submit
                    </Button>
                    </List.Section>
                </View>
            </List.Section>
        </Modal>
            <Modal visible={modalDetailsVisible} animationType="slide">
                <View>
                    <Appbar.Header>
                        <Appbar.Content title={ course.name } />
                    </Appbar.Header>
                    <List.Section>
                        <List.Item
                            title="Course Description:"
                            description={course.description}
                        />
                        <List.Item
                            title="Teacher:"
                            description={course.teacher}
                        />
                        <List.Item
                            title="Status:"
                            description={course.status}
                        />
                        <List.Item
                            title="Video Link:"
                            description={course.video_link}
                        />
                        <List.Item
                            title="Creation Time:"
                            description={course.createdAt}
                        />
                    </List.Section>
                    <View style={styles.containerModal}>
                    <Button style={styles.buttonStyle} buttonColor='#fffeff' mode="outlined"  onPress={() => setModalDetailsVisible(false)}>
                        Exit 
                    </Button>
                    </View>
                </View>
            </Modal>
        </Card.Actions>
    </Card>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
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
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    chip: {
        marginHorizontal: 5,
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
    },
    textStyle: {
        color: '#4b0082',
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 8,
      },
      textStyleModal: {
        color: '#87cefa',
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 16,
      },
});

export default CourseCard;
