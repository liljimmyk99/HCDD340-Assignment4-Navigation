import React, { useState } from 'react'
import { StyleSheet, View, Button, TextInput, TouchableOpacity, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native'
import { Metrics, Colors } from '../Themes'
import { SearchBar } from 'react-native-elements'

// it will call the getQuery function in props
// to initiate API data loading
export default function Search(props) {
	console.log(props)
	const [text, setText] = useState("");
	return (
		<TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
			<View style={styles.container}>
				<SearchBar
					round
					lightTheme
					platform={(Platform.OS === 'ios') ? "ios" : "android"}
					containerStyle={styles.containerStyle}
					inputContainerStyle={styles.inputContainerStyle}
					searchIcon={
						{ size: Metrics.small },
						{ color: 'red' }
					}
					onChangeText={text => setText(text)}
					onCancel={() => setText("")}
					onClear={() => setText("")}
					value={text}
					placeholder='Search for a plant'
					onSubmitEditing={() => props.getQuery(text)}
					keyboardShouldPersistTaps={'handled'}
				/>
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start'
	},
	containerStyle: {
		backgroundColor: 'white',
		width: Metrics.screenWidth - Metrics.doubleBaseMargin
	},
	inputContainerStyle: {

	}
});
