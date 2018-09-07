import React from 'react';
import Expo from 'expo';
import { StyleSheet, View, Alert, Image, Dimensions, WebView } from 'react-native';
import LoaderAnimation from './components/LoaderAnimation';

interface State {
	isAppReady: boolean;
}

export default class App extends React.Component<{}, State> {
	public state: State = {
		isAppReady: false,
	};

	constructor(props: any) {
		super(props);
		// @ts-ignore
		Expo.SplashScreen.preventAutoHide(); // Instruct SplashScreen not to hide yet
	}

	public componentDidMount() {
		// add OTA listener
		Expo.Updates.addListener(this.handleUpdates);
	}

	public render() {
		const uri = 'https://www.stagnationlab.com';

		return (
			<View style={styles.container}>
				<WebView
					style={styles.webView}
					source={{ uri }}
					renderLoading={this.renderLoading}
					javaScriptEnabled
					startInLoadingState
				/>
			</View>
		);
	}

	private renderLoading = () => {
		return (
			<LoaderAnimation style={styles.overlayLoader} isVisible>
				<Image
					style={styles.splash}
					resizeMode="contain"
					fadeDuration={0}
					source={require('../assets/splash.png')}
					onLoadEnd={() => {
						// @ts-ignore
						Expo.SplashScreen.hide();
					}}
				/>
			</LoaderAnimation>
		);
	};

	private handleUpdates = (e: Expo.Updates.UpdateEvent) => {
		if (e.type === 'downloadFinished') {
			Alert.alert(
				'Update available',
				'Reload app to get the latest version',
				[
					{
						text: 'Cancel',
						onPress: () => {},
						style: 'cancel',
					},
					{
						text: 'OK',
						onPress: () => {
							Expo.Updates.reloadFromCache();
						},
					},
				],
				{ cancelable: false },
			);
		}
	};
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	overlayLoader: {
		flex: 1,
		position: 'absolute',
		left: 0,
		top: 0,
		alignItems: 'center',
		justifyContent: 'center',
		width,
		height,
	},
	splash: {
		flex: 1,
	},
	webView: {
		flex: 1,
	},
});
