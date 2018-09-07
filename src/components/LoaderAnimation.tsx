import React from 'react';
import { Animated, Easing, RegisteredStyle, ViewStyle } from 'react-native';

interface Props {
	children: React.ReactNode;
	isVisible: boolean;
	style?: RegisteredStyle<ViewStyle>;
}

interface State {
	rotateAnimation: Animated.Value;
}

export default class LoaderAnimation extends React.Component<Props, State> {
	public state: State = {
		rotateAnimation: new Animated.Value(0),
	};

	public componentDidMount() {
		Animated.loop(
			Animated.timing(this.state.rotateAnimation, {
				toValue: 1,
				duration: 1500,
				easing: Easing.inOut(Easing.ease),
			}),
		).start();
	}

	public render() {
		if (!this.props.isVisible) {
			return null;
		}

		return (
			<Animated.View
				style={[
					this.props.style,
					{
						transform: [
							{
								rotate: this.state.rotateAnimation.interpolate({
									inputRange: [0, 1],
									outputRange: ['0deg', '360deg'],
								}),
							},
							{ perspective: 1000 },
						],
					},
				]}
			>
				{this.props.children}
			</Animated.View>
		);
	}
}
