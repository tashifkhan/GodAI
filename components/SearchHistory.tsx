import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface SearchHistoryProps {
	historyItems: string[];
	onSelectItem: (item: string) => void;
	onClose: () => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
	historyItems,
	onSelectItem,
	onClose,
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Recent Searches</Text>
				<TouchableOpacity onPress={onClose} style={styles.closeButton}>
					<Ionicons name="close" size={22} color={Colors.greyLight} />
				</TouchableOpacity>
			</View>

			<ScrollView style={styles.historyList}>
				{historyItems.map((item, index) => (
					<TouchableOpacity
						key={index}
						style={styles.historyItem}
						onPress={() => onSelectItem(item)}
					>
						<Ionicons
							name="time-outline"
							size={18}
							color={Colors.greyLight}
							style={styles.icon}
						/>
						<Text style={styles.historyText}>{item}</Text>
					</TouchableOpacity>
				))}

				{historyItems.length === 0 && (
					<View style={styles.emptyState}>
						<Text style={styles.emptyStateText}>No recent searches</Text>
					</View>
				)}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 60,
		left: 8,
		right: 8,
		backgroundColor: "#3A3A3C",
		borderRadius: 16,
		maxHeight: 300,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 8,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: "rgba(255, 255, 255, 0.1)",
	},
	title: {
		color: Colors.light,
		fontSize: 16,
		fontWeight: "600",
	},
	closeButton: {
		padding: 4,
	},
	historyList: {
		padding: 8,
	},
	historyItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 12,
		paddingHorizontal: 8,
		borderBottomWidth: 1,
		borderBottomColor: "rgba(255, 255, 255, 0.05)",
	},
	icon: {
		marginRight: 12,
	},
	historyText: {
		color: Colors.light,
		fontSize: 15,
	},
	emptyState: {
		padding: 24,
		alignItems: "center",
		justifyContent: "center",
	},
	emptyStateText: {
		color: Colors.greyLight,
		fontSize: 15,
	},
});

export default SearchHistory;
