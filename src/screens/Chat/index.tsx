import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ArrowLeft, Send, MoreVertical } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { getProfileById } from '../../data/mockProfiles';
import { styles } from './styles';

interface ChatScreenProps {
    profileId: string;
    onBack: () => void;
}

export function ChatScreen({ profileId, onBack }: ChatScreenProps) {
    const { t } = useTranslation();
    const [message, setMessage] = useState('');
    const profile = getProfileById(profileId);

    // Mock messages
    const messages = [
        { id: 1, text: "Hi! I saw your profile and would love to connect.", sender: 'them', time: '10:30 AM' },
        { id: 2, text: "Hello! Thank you for reaching out. I'd be happy to chat.", sender: 'me', time: '10:32 AM' },
        { id: 3, text: "That's great! Tell me a bit about yourself.", sender: 'them', time: '10:35 AM' },
        { id: 4, text: "Sure! I work as a software engineer and love traveling.", sender: 'me', time: '10:37 AM' },
    ];

    const handleSend = () => {
        if (message.trim()) {
            // Handle send message
            setMessage('');
        }
    };

    if (!profile) return null;

    return (
        <CustomSafeAreaView
            barColor="#ffffff"
            barStyle="dark-content"
            edges={['right', 'left', 'bottom']}
            style={styles.container}
            headerComponent={(insets) => (
                <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <ArrowLeft size={24} color="#111827" />
                    </TouchableOpacity>

                    <View style={styles.headerProfile}>
                        <Image source={{ uri: profile.profilePhoto }} style={styles.avatar} />
                        <View style={styles.headerInfo}>
                            <Text style={styles.headerName}>{profile.name}</Text>
                            <Text style={styles.headerStatus}>
                                {profile.online ? t('chats.online') : t('chats.lastSeen')}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.moreButton}>
                        <MoreVertical size={24} color="#111827" />
                    </TouchableOpacity>
                </View>
            )}
        >
            {/* Messages */}
            <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
                {messages.map((msg) => (
                    <View
                        key={msg.id}
                        style={[
                            styles.messageRow,
                            msg.sender === 'me' ? styles.messageRowMe : styles.messageRowThem
                        ]}
                    >
                        {msg.sender === 'them' && (
                            <Image source={{ uri: profile.profilePhoto }} style={styles.messageAvatar} />
                        )}
                        <View
                            style={[
                                styles.messageBubble,
                                msg.sender === 'me' ? styles.messageBubbleMe : styles.messageBubbleThem
                            ]}
                        >
                            <Text
                                style={[
                                    styles.messageText,
                                    msg.sender === 'me' ? styles.messageTextMe : styles.messageTextThem
                                ]}
                            >
                                {msg.text}
                            </Text>
                            <Text
                                style={[
                                    styles.messageTime,
                                    msg.sender === 'me' ? styles.messageTimeMe : styles.messageTimeThem
                                ]}
                            >
                                {msg.time}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder={t('chats.typeMessage')}
                    placeholderTextColor="#9ca3af"
                    style={styles.input}
                    multiline
                />
                <TouchableOpacity
                    onPress={handleSend}
                    style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
                    disabled={!message.trim()}
                >
                    <Send size={20} color="#ffffff" />
                </TouchableOpacity>
            </View>
        </CustomSafeAreaView>
    );
}


