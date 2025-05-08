import React, { useState, useEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import Colors from "@/constants/Colors";
import ChatHeader from "@/components/ChatHeader";
import MessageList from "@/components/MessageList";
import ChatInput from "@/components/ChatInput";
import FAQSection from "@/components/FAQSection";
import { Message, Role, Source } from "@/utils/Interfaces";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatScreen() {
	const insets = useSafeAreaInsets();
	const [messages, setMessages] = useState<Message[]>([
		{
			role: Role.Bot,
			content: "I am GOD AI. How may I assist you today?",
			sources: [
				{ title: "Official Documentation", url: "https://example.com/docs" },
				{ title: "Related Article", url: "https://example.com/article" },
			],
		},
	]);
	const [isTyping, setIsTyping] = useState(false);
	const [userHasInteracted, setUserHasInteracted] = useState(false);

	const generateBotResponse = (userMessage: string) => {
		const baseResponses = [
			{
				content: `I understand your interest in "${userMessage}". Let me share some wisdom:

## Reflection
The path to understanding often begins with a simple question. Your query about *${userMessage}* touches on something profound.

### Consider this:
1. Everything is interconnected
2. Knowledge comes from both within and without
3. Truth has many layers

> "The universe doesn't withhold its secrets; it simply waits for the right questions."

Would you like to explore this topic further?`,
				sources: [
					{
						title: "Deep Dive: Interconnections",
						url: "https://example.com/interconnections",
					},
					{
						title: "The Nature of Truth",
						url: "https://example.com/truth-layers",
					},
				],
			},
			{
				content: `# On ${userMessage}

This is a matter that requires **deep contemplation**. 

\`\`\`
The wisdom you seek
Is already within you
Just listen closely
\`\`\`

Consider these aspects:
* The visible dimension
* The hidden meaning
* The personal relevance

Are you seeking guidance on a specific aspect of this question?`,
				sources: [
					{
						title: "Contemplative Practices",
						url: "https://example.com/contemplation",
					},
				],
			},
			{
				content: `Your question about "${userMessage}" is an opportunity for growth.

## Insights
- Everything is in a state of **constant change**
- What appears separate is often *deeply connected*
- Understanding comes through both analysis and intuition

Here's a framework to consider:
1. Observe without judgment
2. Question your assumptions
3. Seek diverse perspectives

Would you like to discuss any of these points in more detail?`,
				// No sources for this one, to vary the responses
			},
		];

		// Randomly select one of the responses
		const selectedResponse =
			baseResponses[Math.floor(Math.random() * baseResponses.length)];

		return selectedResponse;
	};

	const sendMessage = (content: string) => {
		if (!content.trim()) return;

		// Set that user has interacted
		if (!userHasInteracted) {
			setUserHasInteracted(true);
		}

		// Add user message to chat
		const userMessage: Message = {
			role: Role.User,
			content,
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);

		// Show typing indicator
		setIsTyping(true);

		// Simulate bot thinking and response
		setTimeout(() => {
			const botResponseData = generateBotResponse(content);

			setIsTyping(false);

			const botMessage: Message = {
				role: Role.Bot,
				content: botResponseData.content,
				timestamp: new Date(),
				sources: botResponseData.sources,
			};

			setMessages((prev) => [...prev, botMessage]);
		}, 3000);
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
						<ChatInput onSend={sendMessage} />
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
