import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: "default" | "calendarDay" | "title" | "subtitle" | "link";
};

export function ThemedText({
    style,
    lightColor,
    darkColor,
    type = "default",
    ...rest
}: ThemedTextProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

    return (
        <Text
            style={[
                { color },
                type === "default" ? styles.default : undefined,
                type === "calendarDay" ? styles.calendarDay : undefined,
                type === "title" ? styles.title : undefined,
                type === "subtitle" ? styles.subtitle : undefined,
                type === "link" ? styles.link : undefined,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: "SpecialElite",
    },
    calendarDay: {
        fontSize: 40,
        fontFamily: "SpecialElite",
    },
    title: {
        fontSize: 32,
        fontFamily: "LilitaOne",
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 20,
        lineHeight: 24,
        fontFamily: "LilitaOne",
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: "#0a7ea4",
        fontFamily: "SpecialElite",
    },
});
