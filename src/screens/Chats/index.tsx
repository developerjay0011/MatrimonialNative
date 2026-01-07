import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Search, MoreVertical } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { mockProfiles } from '../../data/mockProfiles';
import { styles } from './styles';

interface ChatsListScreenProps {
    onBack: () => void;
    onOpenChat: (profileId: string) => void;
}

export function ChatsListScreen({ onOpenChat }: ChatsListScreenProps) {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = React.useState('');

    // Mock chat data
    const chats = mockProfiles.slice(0, 5).map((profile, index) => ({
        id: profile.id,
        name: profile.name,
        photo: profile.profilePhoto,
        lastMessage: index === 0 ? "That sounds great! Whe..." : index === 1 ? "Thank you for your interest. I..." : "Yes, I'm interested in con...",
        time: index === 0 ? "2m ago" : index === 1 ? "1h ago" : "Yesterday",
        unread: index === 0 || index === 2,
        city: profile.city,
        occupation: profile.occupation,
        online: profile.online,
    }));

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <CustomSafeAreaView
            barColor="#f97316"
            barStyle="light-content"
            style={styles.container}
            edges={['right', 'left']}
            headerComponent={(insets) => (
                <LinearGradient
                    colors={['#f97316', '#ea580c']}
                    style={[styles.header, { paddingTop: insets.top + 15 }]}
                >
                    <Text style={styles.title}>Messages</Text>

                    <View style={styles.searchContainer}>
                        <Search size={20} color="#ffffff" style={styles.searchIcon} />
                        <TextInput
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder={t('chats.searchPlaceholder')}
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            style={styles.searchInput}
                        />
                    </View>
                </LinearGradient>
            )}
        >
            {/* Chat List */}
            <ScrollView style={styles.scrollView}>
                {filteredChats.map((chat) => (
                    <TouchableOpacity
                        key={chat.id}
                        style={styles.chatItem}
                        onPress={() => onOpenChat(chat.id)}
                    >
                        <View style={styles.avatarContainer}>
                            <Image source={{ uri: chat.photo }} style={styles.avatar} />
                            {chat.online && <View style={styles.onlineBadge} />}
                        </View>

                        <View style={styles.chatContent}>
                            <View style={styles.chatHeader}>
                                <Text style={styles.chatName}>{chat.name}</Text>
                                <Text style={styles.chatTime}>{chat.time}</Text>
                            </View>
                            <Text style={styles.chatLocation}>{chat.city} • {chat.occupation}</Text>
                            <Text style={styles.chatMessage} numberOfLines={1}>
                                {chat.lastMessage}
                            </Text>
                        </View>

                        {chat.unread && (
                            <View style={styles.unreadBadge}>
                                <Text style={styles.unreadText}>2</Text>
                            </View>
                        )}

                        <TouchableOpacity style={styles.moreButton}>
                            <MoreVertical size={20} color="#9ca3af" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </CustomSafeAreaView>
    );
}


