import { Text } from "@/components/ThemedText";
import { View } from "@/components/ThemedView";
import { SafeAreaView, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>Home</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
