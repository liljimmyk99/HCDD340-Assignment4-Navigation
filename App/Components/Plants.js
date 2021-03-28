import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View, FlatList, Text, Linking, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
// human interface guideline
// https://github.com/hectahertz/react-native-typography
import { human } from 'react-native-typography'
import { Metrics, Colors } from '../Themes'
import * as WebBrowser from 'expo-web-browser';

export default function Plants(props) {
  const [refreshing, setRefreshing] = useState(false);
  const webAction = item => WebBrowser.openBrowserAsync(item.http_image_url);

  const listItemRenderer = item => {
    return (
      <TouchableOpacity onPress={() => webAction(item)}>
        <View style={styles.plants}>

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
      </TouchableOpacity>
    );
  }

  return (
    <View >
      <FlatList
        data={props.plants}
        renderItem={({ item }) => listItemRenderer(item)}
        ItemSeparatorComponent={() => (<View style={{ height: 15 }} />)}
        contentContainerStyle={{ alignItems: 'center' }}
        renderSectionHeader={({ section }) =>
          <View style={styles.header}>
            <Text style={styles.title}>{section.title}</Text>
          </View>
        }
        onRefresh={() => this.resetList()}
        refreshing={refreshing}
        removeClippedSubviews={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
});
