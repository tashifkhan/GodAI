import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomLoginSheet = () => {
	const { bottom } = useSafeAreaInsets();
	const router = useRouter();

	const onGuestLogin = () => {
		// Navigate to the new chat screen within the drawer
		console.log("Guest Login Pressed");
	};

	return (
		<View style={[styles.container, { paddingBottom: bottom }]}>
			<TouchableOpacity
				style={[defaultStyles.btn, styles.btnLight]}
				onPress={onGuestLogin}
			>
				<Text style={styles.btnLightText}>Guest Login</Text>
			</TouchableOpacity>

			<TouchableOpacity style={[defaultStyles.btn, styles.btnDark]}>
				<Text style={styles.btnDarkText}>Sign up</Text>
			</TouchableOpacity>

			<TouchableOpacity style={[defaultStyles.btn, styles.btnOutline]}>
				<Text style={styles.btnDarkText}>Log in</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		backgroundColor: "#000",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 26,
		gap: 14,
	},
	btnLight: {
		backgroundColor: "#fff",
	},
	btnLightText: {
		color: "#000",
		fontSize: 20,
	},
	btnDark: {
		backgroundColor: Colors.grey,
	},
	btnDarkText: {
		color: "#fff",
		fontSize: 20,
	},
	btnOutline: {
		borderWidth: 3,
		borderColor: Colors.grey,
	},
	btnIcon: {
		paddingRight: 6,
	},
});
export default BottomLoginSheet;
