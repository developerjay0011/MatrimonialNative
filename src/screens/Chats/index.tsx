import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Search, MoreVertical } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { mockProfiles } from '../../data/mockProfiles';
import { styles } from './styles';
import { getAllChats } from '../../redux/actions/chat';
import { SkeletonChatList } from '../../components/skeletons';
import { useIsFocused } from '@react-navigation/native';

interface ChatsListScreenProps {
    onBack: () => void;
    onOpenChat: (profileId: string) => void;
}

export function ChatsListScreen({ onOpenChat }: ChatsListScreenProps) {
    const { t } = useTranslation();
    const isFocused = useIsFocused();
    const [searchQuery, setSearchQuery] = useState('');
    const [chats, setChats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (isFocused) {
            fetchChats()
        }
    }, [isFocused]);

    const fetchChats = async () => {
        try {
            setLoading(true);
            const response = await getAllChats();
            if (response.success && response.data?.chats) {
                setChats(response.data.chats);
            } else {
                // Fallback to mock data
                const mockChats = mockProfiles.slice(0, 5).map((profile, index) => ({
                    _id: profile.id,
                    id: profile.id,
                    participants: [{ name: profile.name, profilePhoto: profile.profilePhoto }],
                    lastMessage: { content: index === 0 ? "That sounds great! Whe..." : index === 1 ? "Thank you for your interest. I..." : "Yes, I'm interested in con..." },
                    updatedAt: new Date().toISOString(),
                    unreadCount: index === 0 || index === 2 ? 2 : 0,
                }));
                setChats(mockChats);
            }
        } catch (error) {
            // Fallback to mock data on error
            const mockChats = mockProfiles.slice(0, 5).map((profile, index) => ({
                _id: profile.id,
                id: profile.id,
                participants: [{ name: profile.name, profilePhoto: profile.profilePhoto }],
                lastMessage: { content: index === 0 ? "That sounds great! Whe..." : index === 1 ? "Thank you for your interest. I..." : "Yes, I'm interested in con..." },
                updatedAt: new Date().toISOString(),
                unreadCount: index === 0 || index === 2 ? 2 : 0,
            }));
            setChats(mockChats);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchChats();
    };

    const filteredChats = chats.filter(chat => {
        const participant = chat.participants?.[0];
        const name = participant?.name || participant?.fullName || '';
        return name.toLowerCase().includes(searchQuery.toLowerCase());
    });

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
            <ScrollView
                style={styles.scrollView}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#f97316" />}
            >
                {loading ? (
                    <SkeletonChatList count={6} />
                ) : filteredChats.length === 0 ? (
                    <View style={{ padding: 40, alignItems: 'center' }}>
                        <Text style={{ color: '#6b7280', fontSize: 16 }}>No chats yet</Text>
                        <Text style={{ color: '#9ca3af', fontSize: 14, marginTop: 8 }}>Start connecting with matches!</Text>
                    </View>
                ) : (
                    filteredChats.map((chat: any) => {
                        const participant = chat.participants?.[0] || {};
                        const chatName = participant.name || participant.fullName || 'Unknown';
                        const chatPhoto = participant.profilePhoto || participant.photos?.[0]?.url;
                        const lastMsg = chat.lastMessage?.content || 'No messages yet';
                        const timeAgo = chat.updatedAt ? new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

                        return (
                            <TouchableOpacity
                                key={chat._id || chat.id}
                                style={styles.chatItem}
                                onPress={() => onOpenChat(chat._id || chat.id)}
                            >
                                <View style={styles.avatarContainer}>
                                    <Image source={{ uri: chatPhoto }} style={styles.avatar} />
                                    {participant.online && <View style={styles.onlineBadge} />}
                                </View>

                                <View style={styles.chatContent}>
                                    <View style={styles.chatHeader}>
                                        <Text style={styles.chatName}>{chatName}</Text>
                                        <Text style={styles.chatTime}>{timeAgo}</Text>
                                    </View>
                                    <Text style={styles.chatMessage} numberOfLines={1}>
                                        {lastMsg}
                                    </Text>
                                </View>

                                {chat.unreadCount > 0 && (
                                    <View style={styles.unreadBadge}>
                                        <Text style={styles.unreadText}>{chat.unreadCount}</Text>
                                    </View>
                                )}

                                <TouchableOpacity style={styles.moreButton}>
                                    <MoreVertical size={20} color="#9ca3af" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        );
                    })
                )}
            </ScrollView>
        </CustomSafeAreaView>
    );
}


