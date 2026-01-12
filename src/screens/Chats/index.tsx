import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, RefreshControl, Modal, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Search, MoreVertical, X, Trash2, Ban, Archive } from 'lucide-react-native';
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
    const [selectedChats, setSelectedChats] = useState<string[]>([]);
    const [selectionMode, setSelectionMode] = useState(false);
    const [showActionMenu, setShowActionMenu] = useState(false);

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

    const handleLongPress = (chatId: string) => {
        setSelectionMode(true);
        setSelectedChats([chatId]);
    };

    const handleChatPress = (chatId: string) => {
        if (selectionMode) {
            toggleSelection(chatId);
        } else {
            onOpenChat(chatId);
        }
    };

    const toggleSelection = (chatId: string) => {
        setSelectedChats(prev =>
            prev.includes(chatId)
                ? prev.filter(id => id !== chatId)
                : [...prev, chatId]
        );
    };

    const exitSelectionMode = () => {
        setSelectionMode(false);
        setSelectedChats([]);
        setShowActionMenu(false);
    };

    const handleBlockUser = () => {
        Alert.alert(
            t('chats.blockUserTitle'),
            t('chats.blockUserMessage'),
            [
                { text: t('common.cancel'), style: 'cancel', onPress: () => setShowActionMenu(false) },
                {
                    text: t('common.block'),
                    style: 'destructive',
                    onPress: () => {
                        const blockedChats = chats.filter(chat =>
                            !selectedChats.includes(chat._id || chat.id)
                        );
                        setChats(blockedChats);
                        Alert.alert(t('chats.blockSuccess'));
                        exitSelectionMode();
                    }
                }
            ]
        );
    };

    const handleDeleteChat = () => {
        Alert.alert(
            t('chats.deleteChatTitle'),
            t('chats.deleteChatMessage'),
            [
                { text: t('common.cancel'), style: 'cancel', onPress: () => setShowActionMenu(false) },
                {
                    text: t('common.delete'),
                    style: 'destructive',
                    onPress: () => {
                        const remainingChats = chats.filter(chat =>
                            !selectedChats.includes(chat._id || chat.id)
                        );
                        setChats(remainingChats);
                        exitSelectionMode();
                    }
                }
            ]
        );
    };

    const handleArchiveChat = () => {
        Alert.alert(t('chats.archiveSuccess'));
        exitSelectionMode();
    };

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
                    {selectionMode ? (
                        <View style={styles.selectionHeader}>
                            <TouchableOpacity onPress={exitSelectionMode} style={styles.closeButton}>
                                <X size={24} color="#ffffff" />
                            </TouchableOpacity>
                            <Text style={[styles.title, { marginBottom: 0 }]}>{t('chats.selectedCount', { count: selectedChats.length })}</Text>
                            <TouchableOpacity onPress={() => setShowActionMenu(true)} style={styles.moreButton}>
                                <MoreVertical size={24} color="#ffffff" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text style={styles.title}>{t('chats.title')}</Text>
                    )}

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
                        <Text style={{ color: '#6b7280', fontSize: 16 }}>{t('chats.noChatsTitle')}</Text>
                        <Text style={{ color: '#9ca3af', fontSize: 14, marginTop: 8 }}>{t('chats.noChatsSubtitle')}</Text>
                    </View>
                ) : (
                    filteredChats.map((chat: any) => {
                        const participant = chat.participants?.[0] || {};
                        const chatName = participant.name || participant.fullName || 'Unknown';
                        const chatPhoto = participant.profilePhoto || participant.photos?.[0]?.url;
                        const lastMsg = chat.lastMessage?.content || 'No messages yet';
                        const timeAgo = chat.updatedAt ? new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
                        const chatId = chat._id || chat.id;
                        const isSelected = selectedChats.includes(chatId);

                        return (
                            <TouchableOpacity
                                key={chatId}
                                style={[styles.chatItem, isSelected && styles.chatItemSelected]}
                                onPress={() => handleChatPress(chatId)}
                                onLongPress={() => handleLongPress(chatId)}
                            >
                                <View style={styles.avatarContainer}>
                                    <Image source={{ uri: chatPhoto }} style={styles.avatar} />
                                    {(!selectionMode && participant.online) && <View style={styles.onlineBadge} />}
                                    {selectionMode && (
                                        <View style={styles.selectionCheckbox}>
                                            <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                                                {isSelected && <Text style={styles.checkmark}>✓</Text>}
                                            </View>
                                        </View>
                                    )}
                                </View>
                                <View style={styles.chatContent}>
                                    <View style={styles.chatHeader}>
                                        <Text style={styles.chatName}>{chatName}</Text>
                                        <Text style={styles.chatTime}>{timeAgo}</Text>
                                    </View>
                                    <View style={styles.chatHeader}>
                                        <Text style={styles.chatMessage} numberOfLines={1}>
                                            {lastMsg}
                                        </Text>
                                        {chat.unreadCount > 0 && (
                                            <View style={styles.unreadBadge}>
                                                <Text style={styles.unreadText}>{chat.unreadCount < 100 ? chat.unreadCount : '99+'}</Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                )}
            </ScrollView>

            <Modal
                visible={showActionMenu}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowActionMenu(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowActionMenu(false)}
                >
                    <View style={styles.actionMenu}>
                        <TouchableOpacity style={styles.actionMenuItem} onPress={handleDeleteChat}>
                            <Trash2 size={20} color="#ef4444" />
                            <Text style={[styles.actionMenuText, { color: '#ef4444' }]}>{t('chats.deleteChat')}</Text>
                        </TouchableOpacity>
                        <View style={styles.actionMenuDivider} />
                        <TouchableOpacity style={styles.actionMenuItem} onPress={handleBlockUser}>
                            <Ban size={20} color="#ef4444" />
                            <Text style={[styles.actionMenuText, { color: '#ef4444' }]}>{t('chats.blockUser')}</Text>
                        </TouchableOpacity>
                        <View style={styles.actionMenuDivider} />
                        <TouchableOpacity style={styles.actionMenuItem} onPress={handleArchiveChat}>
                            <Archive size={20} color="#6b7280" />
                            <Text style={styles.actionMenuText}>{t('chats.archiveChat')}</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </CustomSafeAreaView>
    );
}
