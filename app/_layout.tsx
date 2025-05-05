import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});
	const router = useRouter();

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return <Slot />;
	}

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
		</Stack>
	);
};

const RootLayoutNav = () => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<InitialLayout />
		</GestureHandlerRootView>
	);
};

export default RootLayoutNav;
