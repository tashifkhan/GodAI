import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Keyboard,
	Animated,
} from "react-native";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HISTORY_STATE_KEY = "godai_history_enabled";

interface ChatInputProps {
	onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
	const [message, setMessage] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const [historyExpanded, setHistoryExpanded] = useState(false);
	const [historyEnabled, setHistoryEnabled] = useState(false);
	const insets = useSafeAreaInsets();

	// Animation values
	const expandWidth = useRef(new Animated.Value(36)).current;
	const textOpacity = useRef(new Animated.Value(0)).current;
	const globeOpacity = useRef(new Animated.Value(1)).current;

	// Load saved history state on component mount
	useEffect(() => {
		const loadHistoryState = async () => {
			try {
				const savedState = await AsyncStorage.getItem(HISTORY_STATE_KEY);
				if (savedState !== null) {
					setHistoryEnabled(savedState === "true");
				}
			} catch (error) {
				console.error("Failed to load history state:", error);
			}
		};

		loadHistoryState();
	}, []);

	const toggleHistoryState = () => {
		const newState = !historyEnabled;
		setHistoryEnabled(newState);

		// Save the state to AsyncStorage
		AsyncStorage.setItem(HISTORY_STATE_KEY, String(newState)).catch((error) =>
			console.error("Failed to save history state:", error)
		);

		// After toggling, collapse the button
		collapseHistoryButton();
	};

	const expandHistoryButton = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

		// Expand
		Animated.parallel([
			Animated.timing(expandWidth, {
				toValue: 150,
				duration: 300,
				useNativeDriver: false,
			}),
			Animated.sequence([
				Animated.timing(globeOpacity, {
					toValue: 0,
					duration: 150,
					useNativeDriver: true,
				}),
				Animated.timing(textOpacity, {
					toValue: 1,
					duration: 200,
					useNativeDriver: true,
				}),
			]),
		]).start();

		setHistoryExpanded(true);
	};

	const collapseHistoryButton = () => {
		// Collapse
		Animated.parallel([
			Animated.timing(expandWidth, {
				toValue: 36,
				duration: 300,
				useNativeDriver: false,
			}),
			Animated.sequence([
				Animated.timing(textOpacity, {
					toValue: 0,
					duration: 150,
					useNativeDriver: true,
				}),
				Animated.timing(globeOpacity, {
					toValue: 1,
					duration: 200,
					useNativeDriver: true,
				}),
			]),
		]).start();

		setHistoryExpanded(false);
	};

	const handleGlobePress = () => {
		if (historyExpanded) {
			// If already expanded, toggle the history state
			toggleHistoryState();
		} else {
			// If collapsed, expand the button
			expandHistoryButton();
		}
	};

	const handleSendMessage = () => {
		if (!message.trim()) return;

		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		onSend(message);
		setMessage("");
		Keyboard.dismiss();

		// Collapse the history banner if it's expanded
		if (historyExpanded) {
			collapseHistoryButton();
		}
	};

	// Hide expanded history when keyboard appears
	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			() => {
				if (historyExpanded) {
					collapseHistoryButton();
				}
			}
		);

		return () => {
			keyboardDidShowListener.remove();
		};
	}, [historyExpanded]);

	return (
		<View
			style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}
		>
			<View style={styles.inputContainer}>
				<TouchableOpacity style={styles.iconButton}>
					<Ionicons name="add" size={22} color="#8E8E93" />
				</TouchableOpacity>

				<TextInput
					style={styles.input}
					placeholder="Ask anything"
					placeholderTextColor="#8E8E93"
					value={message}
					onChangeText={setMessage}
					multiline={false}
					maxLength={1000}
					onFocus={() => setIsTyping(true)}
					onBlur={() => setIsTyping(false)}
					selectionColor={Colors.primary}
					color={Colors.light}
				/>

				{!message.trim() ? (
					<Animated.View
						style={[
							styles.historyButton,
							{ width: expandWidth },
							historyEnabled ? styles.historyEnabled : styles.historyDisabled,
						]}
					>
						<TouchableOpacity
							style={styles.historyTouchable}
							onPress={handleGlobePress}
							activeOpacity={0.7}
						>
							<Animated.View
								style={[styles.globeIcon, { opacity: globeOpacity }]}
							>
								<Ionicons
									name="globe-outline"
									size={22}
									color={historyEnabled ? "#1DB954" : "#FF5959"}
								/>
							</Animated.View>
							<Animated.Text
								style={[styles.historyText, { opacity: textOpacity }]}
							>
								{historyEnabled ? "Disable History" : "Enable History"}
							</Animated.Text>
						</TouchableOpacity>
					</Animated.View>
				) : (
					<TouchableOpacity
						style={styles.sendButton}
						onPress={handleSendMessage}
					>
						<Ionicons name="arrow-up" size={18} color="#fff" />
					</TouchableOpacity>
				)}

				<TouchableOpacity style={[styles.iconButton, styles.micButton]}>
					<Ionicons name="mic-outline" size={20} color={Colors.light} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 8,
		paddingHorizontal: 8,
		backgroundColor: "#2D2D2E",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#3A3A3C",
		borderRadius: 24,
		paddingHorizontal: 6,
		minHeight: 44,
		marginHorizontal: 0,
	},
	input: {
		flex: 1,
		fontSize: 16,
		paddingVertical: 10,
		paddingHorizontal: 6,
		maxHeight: 120,
		color: Colors.light,
	},
	iconButton: {
		width: 36,
		height: 36,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 18,
	},
	micButton: {
		marginLeft: 2,
	},
	sendButton: {
		backgroundColor: Colors.primary,
		width: 28,
		height: 28,
		borderRadius: 14,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 4,
	},
	historyButton: {
		height: 36,
		borderRadius: 18,
		marginRight: 4,
		overflow: "hidden",
	},
	historyEnabled: {
		backgroundColor: "rgba(29, 185, 84, 0.25)", // Green tint when enabled
	},
	historyDisabled: {
		backgroundColor: "rgba(255, 89, 89, 0.25)", // Red tint when disabled
	},
	historyTouchable: {
		width: "100%",
		height: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 8,
	},
	globeIcon: {
		position: "absolute",
	},
	historyText: {
		color: Colors.light,
		fontSize: 14,
		fontWeight: "500",
	},
});

export default ChatInput;
