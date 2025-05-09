import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Animated,
	Easing,
	TouchableOpacity,
	Linking,
	Image,
} from "react-native";
import { Message, Role } from "@/utils/Interfaces";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";

interface MessageItemProps {
	item: Message;
	isBot: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ item, isBot }) => {
	const [showSources, setShowSources] = useState(false);

	const toggleSources = () => {
		if (item.source && item.source.length > 0) {
			setShowSources(!showSources);
		}
	};

	const handleLinkPress = (url: string) => {
		Linking.canOpenURL(url).then((supported) => {
			if (supported) {
				Linking.openURL(url);
			} else {
				console.log("Don't know how to open URI: " + url);
			}
		});
	};

	return (
		<View
			style={[
				styles.messageContainer,
				isBot ? styles.botMessageContainer : styles.userMessageContainer,
			]}
		>
			{isBot && (
				<View style={styles.avatarContainer}>
					<Image
						source={require("@/assets/images/icon.png")}
						style={styles.avatarImage}
					/>
				</View>
			)}

			<View
				style={isBot ? styles.botContentContainer : styles.userContentContainer}
			>
				{isBot ? (
					<Markdown style={markdownStyles}>{item.content || ""}</Markdown>
				) : (
					<View style={[styles.messageBubble, styles.userBubble]}>
						<Text style={[styles.messageText, styles.userMessageText]}>
							{item.content}
						</Text>
					</View>
				)}
				{isBot && item.source && item.source.length > 0 && (
					<TouchableOpacity
						onPress={toggleSources}
						style={styles.sourcesToggleButton}
						activeOpacity={0.7}
					>
						<Text style={styles.sourcesToggleText}>
							{showSources ? "Hide Sources" : "Show Sources"}
						</Text>
						<Ionicons
							name={showSources ? "chevron-up-outline" : "chevron-down-outline"}
							size={18}
							color={Colors.primary}
						/>
					</TouchableOpacity>
				)}
				{isBot && showSources && item.source && item.source.length > 0 && (
					<View style={styles.sourcesContainer}>
						<TouchableOpacity style={styles.sourceItem} activeOpacity={0.7}>
							<View style={styles.sourceContent}>
								<Ionicons
									name="document-text-outline"
									size={16}
									color={Colors.primary}
									style={styles.sourceIcon}
								/>
								<Text style={styles.sourceTitle}>{item.source}</Text>
							</View>
						</TouchableOpacity>
					</View>
				)}
			</View>

			{!isBot && (
				<View style={styles.messageStatusContainer}>
					<Ionicons name="checkmark-done" size={16} color={Colors.greyLight} />
				</View>
			)}
		</View>
	);
};

interface MessageListProps {
	messages: Message[];
	isTyping?: boolean;
}

const MessageList = ({ messages, isTyping = false }: MessageListProps) => {
	// Create animated values for each dot
	const dot1Opacity = new Animated.Value(0.4);
	const dot2Opacity = new Animated.Value(0.7);
	const dot3Opacity = new Animated.Value(1);

	const dot1Scale = new Animated.Value(0.9);
	const dot2Scale = new Animated.Value(1);
	const dot3Scale = new Animated.Value(0.9);

	// Animation sequence for the typing indicator
	useEffect(() => {
		if (isTyping) {
			// Create animation sequences for each dot
			const animateDots = () => {
				Animated.sequence([
					// First dot grows and becomes fully opaque
					Animated.parallel([
						Animated.timing(dot1Opacity, {
							toValue: 1,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),
						Animated.timing(dot1Scale, {
							toValue: 1.2,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),

						Animated.timing(dot2Opacity, {
							toValue: 0.5,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),
						Animated.timing(dot2Scale, {
							toValue: 0.9,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),

						Animated.timing(dot3Opacity, {
							toValue: 0.3,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),
						Animated.timing(dot3Scale, {
							toValue: 0.8,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),
					]),

					Animated.parallel([
						Animated.timing(dot1Opacity, {
							toValue: 0.5,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),
						Animated.timing(dot1Scale, {
							toValue: 0.9,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),

						Animated.timing(dot2Opacity, {
							toValue: 1,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),
						Animated.timing(dot2Scale, {
							toValue: 1.2,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),

						Animated.timing(dot3Opacity, {
							toValue: 0.5,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),
						Animated.timing(dot3Scale, {
							toValue: 0.9,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),
					]),

					Animated.parallel([
						Animated.timing(dot1Opacity, {
							toValue: 0.3,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),
						Animated.timing(dot1Scale, {
							toValue: 0.8,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),

						Animated.timing(dot2Opacity, {
							toValue: 0.5,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),
						Animated.timing(dot2Scale, {
							toValue: 0.9,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),

						Animated.timing(dot3Opacity, {
							toValue: 1,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),
						Animated.timing(dot3Scale, {
							toValue: 1.2,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),
					]),

					Animated.parallel([
						Animated.timing(dot1Opacity, {
							toValue: 0.4,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),
						Animated.timing(dot1Scale, {
							toValue: 0.9,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),

						Animated.timing(dot2Opacity, {
							toValue: 0.7,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),
						Animated.timing(dot2Scale, {
							toValue: 1,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),

						Animated.timing(dot3Opacity, {
							toValue: 1,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),
						Animated.timing(dot3Scale, {
							toValue: 0.9,
							duration: 400,
							useNativeDriver: true,
							easing: Easing.ease,
						}),
					]),
				]).start(() => {
					if (isTyping) {
						animateDots();
					}
				});
			};

			animateDots();
		}
	}, [isTyping]);

	const renderMessage = ({ item }: { item: Message }) => {
		const isBot = item.role === Role.Bot;
		return <MessageItem item={item} isBot={isBot} />;
	};

	const renderTypingIndicator = () => {
		if (!isTyping) return null;

		return (
			<View style={styles.typingContainer}>
				<View style={styles.avatarContainer}>
					<Image
						source={require("@/assets/images/icon.png")}
						style={styles.avatarImage}
					/>
				</View>
				<View style={styles.typingBubble}>
					<View style={styles.typingAnimation}>
						<Animated.View
							style={[
								styles.typingDot,
								{
									opacity: dot1Opacity,
									transform: [{ scale: dot1Scale }],
								},
							]}
						/>
						<Animated.View
							style={[
								styles.typingDot,
								{
									opacity: dot2Opacity,
									transform: [{ scale: dot2Scale }],
								},
							]}
						/>
						<Animated.View
							style={[
								styles.typingDot,
								{
									opacity: dot3Opacity,
									transform: [{ scale: dot3Scale }],
								},
							]}
						/>
					</View>
				</View>
			</View>
		);
	};

	return (
		<FlatList
			data={messages}
			keyExtractor={(_, index) => index.toString()}
			renderItem={renderMessage}
			contentContainerStyle={styles.listContent}
			showsVerticalScrollIndicator={false}
			inverted={false}
			style={styles.list}
			ListFooterComponent={renderTypingIndicator}
		/>
	);
};

const markdownStyles = StyleSheet.create({
	body: {
		color: Colors.light,
		fontSize: 16,
		lineHeight: 24,
	},
	heading1: {
		fontSize: 24,
		fontWeight: "bold",
		color: Colors.light,
		marginVertical: 12,
	},
	heading2: {
		fontSize: 22,
		fontWeight: "bold",
		color: Colors.light,
		marginVertical: 10,
	},
	heading3: {
		fontSize: 20,
		fontWeight: "bold",
		color: Colors.light,
		marginVertical: 8,
	},
	link: {
		color: Colors.primary,
		textDecorationLine: "none",
	},
	blockquote: {
		borderLeftWidth: 4,
		borderLeftColor: Colors.primary,
		paddingLeft: 8,
		marginLeft: 12,
		opacity: 0.9,
	},
	code_block: {
		backgroundColor: "rgba(0, 0, 0, 0.2)",
		padding: 12,
		borderRadius: 6,
		fontFamily: "SpaceMono",
		fontSize: 14,
	},
	code_inline: {
		backgroundColor: "rgba(0, 0, 0, 0.2)",
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 4,
		fontFamily: "SpaceMono",
		fontSize: 14,
	},
	list_item: {
		flexDirection: "row",
		alignItems: "flex-start",
	},
	bullet_list_icon: {
		marginRight: 8,
		fontSize: 16,
	},
	ordered_list_icon: {
		marginRight: 8,
		fontSize: 16,
	},
});

const styles = StyleSheet.create({
	list: {
		flex: 1,
	},
	listContent: {
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 20,
	},
	messageContainer: {
		marginBottom: 16,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	botMessageContainer: {
		justifyContent: "flex-start",
	},
	userMessageContainer: {
		justifyContent: "flex-end",
	},
	avatarContainer: {
		height: 40,
		width: 40,
		borderRadius: 20,
		backgroundColor: Colors.primary,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 8,
		overflow: "hidden",
	},
	avatarText: {
		color: Colors.light,
		fontWeight: "700",
		fontSize: 12,
	},
	avatarImage: {
		width: "100%",
		height: "100%",
	},
	botContentContainer: {
		maxWidth: "80%",
		paddingVertical: 4,
	},
	userContentContainer: {
		maxWidth: "75%",
	},
	messageBubble: {
		borderRadius: 18,
		paddingHorizontal: 16,
		paddingVertical: 10,
	},
	userBubble: {
		backgroundColor: Colors.pink,
		borderBottomRightRadius: 4,
	},
	messageText: {
		fontSize: 16,
		lineHeight: 22,
	},
	userMessageText: {
		color: Colors.light,
	},
	messageStatusContainer: {
		marginLeft: 4,
		alignSelf: "flex-end",
	},
	typingContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: 16,
		marginTop: 4,
	},
	typingBubble: {
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		borderRadius: 18,
		padding: 12,
		maxWidth: "50%",
	},
	typingAnimation: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	typingDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: Colors.greyLight,
		marginHorizontal: 3,
	},
	sourcesToggleButton: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
		paddingVertical: 4,
		paddingHorizontal: 8,
		backgroundColor: "rgba(255, 255, 255, 0.05)",
		borderRadius: 8,
		alignSelf: "flex-start",
	},
	sourcesToggleText: {
		color: Colors.primary,
		fontSize: 14,
		fontWeight: "500",
		marginRight: 4,
	},
	sourcesContainer: {
		marginTop: 10,
		padding: 10,
		backgroundColor: "rgba(0,0,0,0.1)",
		borderRadius: 8,
		borderLeftWidth: 3,
		borderLeftColor: Colors.primary,
	},
	sourceItem: {
		marginBottom: 10,
		padding: 10,
		backgroundColor: "rgba(255,255,255,0.05)",
		borderRadius: 6,
	},
	sourceContent: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 4,
	},
	sourceIcon: {
		marginRight: 6,
	},
	sourceTitle: {
		color: Colors.light,
		fontSize: 15,
		fontWeight: "600",
		flexShrink: 1,
	},
	sourceUrl: {
		color: Colors.blue,
		fontSize: 13,
		textDecorationLine: "underline",
	},
});

export default MessageList;
