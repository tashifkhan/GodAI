import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

interface ChatHeaderProps {
	title: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title }) => {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	return (
		<BlurView
			intensity={80}
			tint="dark"
			style={[styles.header, { paddingTop: insets.top }]}
		>
			<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
				<Ionicons name="chevron-back" size={28} color={Colors.light} />
			</TouchableOpacity>

			<View style={styles.titleContainer}>
				<Text style={styles.title}>{title}</Text>
				<View style={styles.onlineIndicator} />
			</View>

			<TouchableOpacity style={styles.menuButton}>
				<Ionicons name="ellipsis-vertical" size={24} color={Colors.light} />
			</TouchableOpacity>
		</BlurView>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingBottom: 12,
		borderBottomColor: "rgba(255, 255, 255, 0.1)",
		borderBottomWidth: 1,
	},
	backButton: {
		padding: 4,
	},
	titleContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "600",
		color: Colors.light,
		marginRight: 8,
	},
	onlineIndicator: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: Colors.primary,
	},
	menuButton: {
		padding: 4,
	},
});

export default ChatHeader;
