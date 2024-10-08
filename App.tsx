import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { v4 as uuidv4 } from 'uuid';


type DishObj = {
  id: string; 
  name: string;
  description: string;
  price: number;
  course: string;
};

export default function App() {
  const [dishList, setDishList] = useState<DishObj[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null);
  const [course, setCourse] = useState<string>(''); 

  const addDish = (): void => {
    if (!name || !description || price === null || !course) {
      Alert.alert('Please fill in all fields.');
      return;
    }

    const newDish: DishObj = {
      id: uuidv4(),
      name,
      description,
      price,
      course,
    };

    setDishList((prev) => [...prev, newDish]);
    setName('');
    setDescription('');
    setPrice(null);
    setCourse('');
    Alert.alert('Dish added successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menu</Text>

      <FlatList
        data={dishList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.container2}>
            <Text style={styles.dishName}>{item.name}</Text>
            <Text> {item.description}</Text>
            <Text> {item.course}</Text>
            <Text>Price: R {item.price}</Text>
          </View>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price !== null ? price.toString() : ''}
        onChangeText={(text) => setPrice(parseFloat(text))}
        keyboardType="numeric"
      />
  
      <Picker
        selectedValue={course}
        onValueChange={(itemValue) => setCourse(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select course" value="" />
        <Picker.Item label="Main" value="Main" />
        <Picker.Item label="Starter" value="Starter" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>

      <Button title="Add Dish" color={'#393F86'} onPress={addDish} />

      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Total Dishes: {dishList.length}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
   
    justifyContent: 'center',
    padding: 20,
  },

  header: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#393F86',
    width: '100%',
  },

  dishName: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  input: {
    borderRadius:30,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    width: '100%',
    padding: 10,
    backgroundColor: '#ffffff',
  },

  picker: {
    borderRadius:30,
    height: 50,
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },

  totalBox: {
    marginTop: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

});
