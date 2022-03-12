import React from "react";
import { Pressable, Text, View } from "react-native";

function TopBar({ title, back, onBack }) {
  return (
    <View
      style={{
        diplay: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 54,
        background: "#FFFFFF",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)"
      }}
    >
      {back ? <Pressable onPress={onBack}>{back}</Pressable> : null}

      <Text
        style={{
          fontWeight: 500,
          fontSize: 16,
          lineHeight: 19,
          letterSpacing: 1.5,
          color: "#000000",
          marginLeft: 16
        }}
      >
        {title}
      </Text>
    </View>
  );
}

export default TopBar;
