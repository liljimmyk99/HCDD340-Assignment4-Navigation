import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, Image, Picker } from 'react-native';
import { Images, Colors, Metrics } from './App/Themes'
import APIRequest from './App/Config/APIRequest'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { human } from 'react-native-typography'
import { Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements'


import Plants from './App/Components/Plants'
import Search from './App/Components/Search'
import Logo from './App/Components/Logo'


const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Plants") {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === "Settings") {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />
          }
        })
        }
        tabBarOptions={{
          labelStyle: { fontSize: 20 },
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Plants" component={PlantStack} />
        <Tab.Screen name="Settings" component={SettingsTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


//Plant Tab
const Stack = createStackNavigator();
function PlantStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Listing" component={ListingScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

//Listing Screen
function ListingScreen({ route, navigation }) {

  const [loading, setLoading] = useState(false);
  const [plants, setPlants] = useState([]);
  const [searchPlantTerm] = useState("");
  const [searchSpeciesTerm] = useState("");

  // retrieve lists of plants
  const loadPlants = async (plantSearch = '', plantFilter = '') => {
    setLoading(true);
    setPlants([]);
    let results = [];
    // if there is no search term, then get list of plants
    if (plantSearch !== '') {
      results = await APIRequest.requestSearchPlants(plantSearch);
    } else {
      results = await APIRequest.requestPlantList(plantFilter);
    }
    console.log(results);
    setLoading(false);
    setPlants(results);
  }

  useEffect(() => { loadPlants() }, []);

  let contentDisplayed = null;

  if (loading) {
    contentDisplayed = (
      <ActivityIndicator
        style={styles.activityIndicator}
        size="large" color="black" />
    )
  } else {
    contentDisplayed = <Plants plants={plants} navigation={navigation} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Search getQuery={loadPlants} />
      <View style={{ flex: 7 }}>
        {contentDisplayed}
      </View>

    </SafeAreaView>
  );
}

//Details Screen
function DetailsScreen({ route, navigation }) {
  const { item } = route.params;
  console.log(item)

  return (
    <View style={styles.container}>

      <View style={styles.plantView}>
        <Image style={styles.plantPicture}
          source={{ uri: item.http_image_url }} />
        <View style={styles.plantDetails}>
          <Text style={human.title1}>{item.common_name}</Text>
          <Text style={[human.body, { flex: 1, flexShrink: 1 }]}>
            <Text>Scientific Name </Text>
            <Text style={human.headline}>{item.scientific_name}</Text>
            <Text>.</Text>
            <Text> This plant comes from the </Text>
            <Text style={{ fontStyle: 'italic' }}>{item.family}</Text>
            <Text> family and the </Text>
            <Text style={{ fontStyle: 'italic' }}>{item.genus}</Text>
            <Text> genus.</Text>
          </Text>
        </View>
      </View>
    </View>
  );
  //Text Items that display the following info

  //Common Name
  //Scientific Name
  //Family
  //Genus
  //The Image
  //year


}


//Settings Tab
function SettingsTab({ route, navigation }) {
  const [wantVegitables, setwantVegitables] = useState(false);
  const [wantEdible, setWantEdible] = useState(false);
  const [flowerColor, setFlowerColor] = useState('');
  const [fruitColor, setFruitColor] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Want to See Vegitables?</Text>
        <CheckBox
          title='Yes'
          checked={wantVegitables}
          onIconPress={() => setwantVegitables(!wantVegitables)}
        />
      </View>
      <View>
        <Text>Want to See Edible Plants?</Text>
        <CheckBox
          title='Yes'
          checked={wantEdible}
          onIconPress={() => setWantEdible(!wantEdible)}
        />
      </View>
      <View>
        <Text>Please Select a Flower Color</Text>
        <Picker
          selectedValue={flowerColor}
          onValueChange={(itemValue, itemIndex) => setFlowerColor(itemValue)}
          style={{ borderWidth: 1 }}
        >
          <Picker.Item label="Red" value="red" />
          <Picker.Item label="Blue" value="blue" />
          <Picker.Item label="Green" value="green" />
          <Picker.Item label="Yellow" value="yellow" />
          <Picker.Item label="White" value="white" />
          <Picker.Item label="Black" value="black" />
          <Picker.Item label="Purple" value="purple" />
        </Picker>
      </View>
      <View>
        <Text>Please Select a Fruit Color</Text>
        <Picker
          selectedValue={fruitColor}
          style={{ borderWidth: 1 }}
          onValueChange={(itemValue, itemIndex) => setFruitColor(itemValue)}
        >
          <Picker.Item label="Red" value="red" />
          <Picker.Item label="Blue" value="blue" />
          <Picker.Item label="Green" value="green" />
          <Picker.Item label="Yellow" value="yellow" />
          <Picker.Item label="White" value="white" />
          <Picker.Item label="Black" value="black" />
          <Picker.Item label="Purple" value="purple" />
        </Picker>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  plants: {
    width: Metrics.screenWidth,
    paddingLeft: 2,
    borderWidth: Metrics.borderWidth,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  plantView: {
    marginLeft: Metrics.marginHorizontal,
    marginRight: Metrics.marginHorizontal,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  plantPicture: {
    height: Metrics.images.large,
    width: Metrics.images.large,
    borderRadius: Metrics.images.large * 0.5,
    borderWidth: 1,
  },
  plantDetails: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: Metrics.marginHorizontal,
    marginRight: Metrics.marginHorizontal,
  }
});
