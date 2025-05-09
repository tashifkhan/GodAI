import React, { useState, useEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import Colors from "@/constants/Colors";
import ChatHeader from "@/components/ChatHeader";
import MessageList from "@/components/MessageList";
import ChatInput from "@/components/ChatInput";
import FAQSection from "@/components/FAQSection";
import { Message, Role } from "@/utils/Interfaces";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HISTORY_STATE_KEY = "godai_history_enabled";

export default function ChatScreen() {
	const insets = useSafeAreaInsets();
	const [messages, setMessages] = useState<Message[]>([
		{
			role: Role.Bot,
			content: "I am GOD AI. How may I assist you today?",
			timestamp: new Date(),
		},
	]);
	const [isTyping, setIsTyping] = useState(false);
	const [userHasInteracted, setUserHasInteracted] = useState(false);
	const [isHistoryEnabled, setIsHistoryEnabled] = useState<boolean>(false);

	useEffect(() => {
		const loadHistoryState = async () => {
			try {
				const savedState = await AsyncStorage.getItem(HISTORY_STATE_KEY);
				if (savedState !== null) {
					setIsHistoryEnabled(savedState === "true");
				}
			} catch (error) {
				console.error("Failed to load history state from ChatScreen:", error);
			}
		};

		loadHistoryState();
	}, []);

	const handleHistoryToggle = (newState: boolean) => {
		setIsHistoryEnabled(newState);
		AsyncStorage.setItem(HISTORY_STATE_KEY, String(newState)).catch((error) =>
			console.error("Failed to save history state from ChatScreen:", error)
		);
	};

	const sendMessage = async (content: string) => {
		if (!content.trim()) return;

		if (!userHasInteracted) {
			setUserHasInteracted(true);
		}

		const userMessage: Message = {
			role: Role.User,
			content,
			timestamp: new Date(),
		};
		setMessages((prev) => [...prev, userMessage]);
		setIsTyping(true);

		try {
			const payload = {
				query: content,
				use_history: isHistoryEnabled ? 1 : 0,
			};

			const response = await fetch("http://localhost:8000/plain-rag-query", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			setIsTyping(false);

			if (!response.ok) {
				// Handle HTTP errors
				const errorData = await response.text();
				console.error("API Error:", response.status, errorData);
				const botMessage: Message = {
					role: Role.Bot,
					content: `Sorry, I encountered an error: ${response.status}. Please try again.`,
					timestamp: new Date(),
				};
				setMessages((prev) => [...prev, botMessage]);
				return;
			}

			const responseData = await response.json();

			const botMessage: Message = {
				role: Role.Bot,
				content: responseData.answer,
				timestamp: new Date(),
				source: responseData.context_used,
			};
			setMessages((prev) => [...prev, botMessage]);
		} catch (error) {
			setIsTyping(false);
			console.error("Failed to send message:", error);
			const botMessage: Message = {
				role: Role.Bot,
				content:
					"Sorry, I couldn't connect to the server. Please check your connection and try again.",
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, botMessage]);
		}
	};

	// Handle when user selects a question from the FAQ section
	const handleSelectQuestion = (question: string) => {
		sendMessage(question);
	};

	// Show FAQ section only when there's just the initial bot message
	const showFAQSection =
		messages.length === 1 && !userHasInteracted && !isTyping;

	return (
		<>
			<StatusBar style="light" />
			<View style={styles.container}>
				<ChatHeader title="GOD AI" />

				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={styles.keyboardAvoid}
					keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
				>
					<View style={styles.innerContainer}>
						<MessageList messages={messages} isTyping={isTyping} />
						<FAQSection
							visible={showFAQSection}
							onSelectQuestion={handleSelectQuestion}
						/>
						<ChatInput
							onSend={sendMessage}
							isHistoryEnabled={isHistoryEnabled}
							onHistoryToggle={handleHistoryToggle}
						/>
					</View>
				</KeyboardAvoidingView>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.dark,
	},
	keyboardAvoid: {
		flex: 1,
	},
	innerContainer: {
		flex: 1,
	},
});
