import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Dimensions,
} from "react-native";
import Colors from "@/constants/Colors";
import { Message } from "@/utils/Interfaces";

interface FAQSectionProps {
	onSelectQuestion: (question: string) => void;
	visible: boolean;
}

const frequentlyAskedQuestions = [
	"What is the purpose of life?",
	"How can I find inner peace?",
	"What is the nature of consciousness?",
	"How do I connect with my higher self?",
	"What happens after death?",
	"How can I overcome suffering?",
	"What is the meaning of dreams?",
	"How do karma and reincarnation work?",
	"What is enlightenment?",
	"How can I develop spiritual awareness?",
];

const FAQSection: React.FC<FAQSectionProps> = ({
	onSelectQuestion,
	visible,
}) => {
	if (!visible) return null;

	return (
		<View style={styles.container}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.questionsContent}
				style={styles.questionsContainer}
			>
				{frequentlyAskedQuestions.map((question, index) => (
					<TouchableOpacity
						key={index}
						style={styles.questionButton}
						onPress={() => onSelectQuestion(question)}
						activeOpacity={0.7}
					>
						<Text style={styles.questionText}>{question}</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "transparent",
		paddingBottom: 12,
	},
	questionsContainer: {
		flexGrow: 0,
	},
	questionsContent: {
		paddingLeft: 16,
		paddingRight: 8,
		flexDirection: "row",
	},
	questionButton: {
		backgroundColor: "rgba(255, 255, 255, 0.15)", // Transparent white
		borderRadius: 16,
		padding: 12,
		marginRight: 8,
		maxWidth: screenWidth * 0.65,
		minWidth: 150,
		justifyContent: "center",
		// Glassmorphic effect
		backdropFilter: "blur(10px)",
		borderWidth: 1,
		borderColor: "rgba(255, 255, 255, 0.2)",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 10,
		elevation: 5,
	},
	questionText: {
		color: "white", // Light text for contrast
		fontSize: 15,
		textAlign: "center",
		fontWeight: "500",
		textShadowColor: "rgba(0, 0, 0, 0.2)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 2,
	},
});

export default FAQSection;
