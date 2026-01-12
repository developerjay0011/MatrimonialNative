import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import ImageView from 'react-native-image-viewing';
import { useSharedValue } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Photo {
    url: string;
    isProfilePhoto?: boolean;
    _id?: string;
}

interface ImageCarouselProps {
    photos: Photo[];
    height?: number;
    autoPlay?: boolean;
    autoPlayInterval?: number;
    showIndicators?: boolean;
    enableFullScreen?: boolean;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
    photos,
    height = 400,
    autoPlay = false,
    autoPlayInterval = 3000,
    enableFullScreen = true,
}) => {
    const currentIndex = useSharedValue(0);
    const [viewerIndex, setViewerIndex] = useState(0);
    const [isViewerVisible, setIsViewerVisible] = useState(false);

    if (!photos || photos.length === 0) {
        return (
            <View style={[styles.emptyContainer, { height }]}>
                <Text style={styles.emptyText}>No photos available</Text>
            </View>
        );
    }

    const images = photos.map(photo => ({ uri: photo.url }));

    const renderItem = ({ item }: { item: Photo }) => (
        <TouchableOpacity
            activeOpacity={enableFullScreen ? 0.9 : 1}
            onPress={() => {
                if (enableFullScreen) {
                    setViewerIndex(currentIndex.value);
                    setIsViewerVisible(true);
                }
            }}
            style={styles.imageWrapper}
        >
            <Image
                source={{ uri: item.url }}
                style={[styles.image, { height }]}
                resizeMode="cover"
            />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Carousel
                data={photos}
                autoPlay={autoPlay}
                renderItem={renderItem}
                scrollAnimationDuration={1000}
                autoPlayInterval={autoPlayInterval}
                onSnapToItem={(index) => {
                    currentIndex.value = index;
                    setViewerIndex(index);
                }}
                style={{ height, width: SCREEN_WIDTH }}
            />
            {photos.length > 1 && (
                <Pagination.Basic
                    data={photos}
                    progress={currentIndex}
                    onPress={(index) => {
                        currentIndex.value = index;
                        setViewerIndex(index);
                    }}
                    containerStyle={{ gap: 5, position: 'absolute', bottom: 35 }}
                    dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
                />
            )}
            {enableFullScreen && (
                <ImageView
                    images={images}
                    imageIndex={viewerIndex}
                    visible={isViewerVisible}
                    onRequestClose={() => setIsViewerVisible(false)}
                    swipeToCloseEnabled={true}
                    doubleTapToZoomEnabled={true}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    imageWrapper: {
        flex: 1,
        width: SCREEN_WIDTH,
    },
    image: {
        width: '100%',
        backgroundColor: '#e5e7eb',
    },
    emptyContainer: {
        width: SCREEN_WIDTH,
        backgroundColor: '#e5e7eb',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#6b7280',
        fontWeight: '500',
    },
    indicatorContainer: {
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    activeIndicator: {
        backgroundColor: '#ffffff',
        width: 24,
    },
    counterContainer: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    counterText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '600',
    },
});
