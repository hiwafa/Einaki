import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate } from 'react-native-reanimated';


const sampleUsers = [
  {
    userFirstName: "John",
    userLastName: "Doe",
    userEmail: "john.doe@example.com",
    userPassword: "password123",
    userInfo: "Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. Software Developer at Example Corp. ",
    userPhotoLink: "https://randomuser.me/api/portraits/men/1.jpg",
    userExtraInfo: { hobby: "Coding" },
    userStatus: "Active",
    userActivities: { lastLogin: "Yesterday" },
    userDateOfBirth: new Date('1990-01-01'),
    userRegistrationDate: new Date('2020-06-15'),
    userLastLogin: new Date('2023-07-26')
  },
  // Add more sample users if needed
];

const UserProfile = ({ user }) => {
  return (
    <View style={styles.profileContainer}>
      <Image source={{ uri: user.userPhotoLink }} style={styles.profileImage} />
      <Text style={styles.profileName}>{user.userFirstName} {user.userLastName}</Text>
      <Text style={styles.profileInfo}>{user.userInfo}</Text>
      <Text style={styles.profileDetails}>Email: {user.userEmail}</Text>
      <Text style={styles.profileDetails}>Date of Birth: {user.userDateOfBirth.toDateString()}</Text>
      <Text style={styles.profileDetails}>Registration Date: {user.userRegistrationDate.toDateString()}</Text>
      <Text style={styles.profileDetails}>Last Login: {user.userLastLogin.toDateString()}</Text>
      <Text style={styles.profileDetails}>Status: {user.userStatus}</Text>
      <Text style={styles.profileDetails}>Location: {user.userExtraInfo.location}</Text>
      <Text style={styles.profileDetails}>Phone: {user.userExtraInfo.phone}</Text>
      <Text style={styles.profileDetails}>Hobby: {user.userExtraInfo.hobby}</Text>
      <Text style={styles.profileDetails}>Posts: {user.userActivities.posts}</Text>
      <Text style={styles.profileDetails}>Comments: {user.userActivities.comments}</Text>
      <Text style={styles.profileDetails}>Last Login Activity: {user.userActivities.lastLogin}</Text>
    </View>
  );
};

const UserProfiles = () => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <Animated.ScrollView 
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      contentContainerStyle={styles.scrollViewContent}
    >
      {sampleUsers.map((user, index) => (
        <Animated.View key={index} style={[styles.animatedContainer, animatedStyle(scrollY, index)]}>
          <UserProfile user={user} />
        </Animated.View>
      ))}
    </Animated.ScrollView>
  );
};

const animatedStyle = (scrollY, index) => {
  return useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [index * 200, (index + 1) * 200], [1, 0.8], "clamp");
    const opacity = interpolate(scrollY.value, [index * 200, (index + 1) * 200], [1, 0.5], "clamp");

    return {
      transform: [{ scale }],
      opacity,
    };
  });
};

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProfiles />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 10,
  },
  animatedContainer: {
    marginBottom: 20,
  },
  profileContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  profileExtraInfo: {
    fontSize: 14,
    marginBottom: 5,
  },
  profileStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
  },
  profileDetails: {
    fontSize: 14,
    marginBottom: 5,
  },
});
