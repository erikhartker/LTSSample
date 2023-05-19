import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';


// This component encompasses the chips that the user can select or deselect,
// which represent categories that the user wishes to filter the course list for.
const CategoryChips = ({ categories, selectedCategories, handleChipPress }) => {
  return (
    <ScrollView horizontal>
    <View style={styles.container}>
      {categories.map((category) => (
        <Chip style={styles.chip}
        closeIcon="close"
        mode='outlined'
        selectedColor='#6B52AE'
        elevated
        showSelectedOverlay
          key={category.id}
          selected={selectedCategories.includes(category.id)}
          onPress={() => handleChipPress(category.id)}
        >
          {category.name}
        </Chip>
      ))}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    chip: {
      marginHorizontal: 5,
    },
});

export default CategoryChips;
