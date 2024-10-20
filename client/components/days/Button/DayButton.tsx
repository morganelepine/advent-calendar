import { useCallback, useState } from "react";
import { StyleSheet, Pressable, ToastAndroid, ViewStyle } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { DayNumber } from "@/components/days/Button/DayNumber";
import { saveScore } from "@/services/score.service";
import { isDayOpen, addDayOpening } from "@/services/day.service";
import { Colors } from "@/constants/Colors";
import { DayModal } from "./DayModal";

interface Day {
    id: number;
    dayNumber: number;
    background: string;
    width: string;
    height: string;
    color: string;
    textColor: string;
    image: string;
    aspectRatio: number;
    quote: string;
    quoteAuthor: string;
    quoteSource: string;
}

interface DayButtonProps {
    day: Day;
    userUuid: string;
}

export const DayButton: React.FC<DayButtonProps> = ({ day, userUuid }) => {
    /*****************************************/
    /********** HANDLE DAY STATE **********/
    /*****************************************/

    const [dayIsOpen, setDayIsOpen] = useState<boolean | null>(null);

    useFocusEffect(
        useCallback(() => {
            const checkIfDayIsOpen = async () => {
                const openState = await isDayOpen(userUuid, day.dayNumber);
                setDayIsOpen(openState);
            };

            checkIfDayIsOpen();
        }, [userUuid, day.dayNumber])
    );

    /*****************************************/
    /********** HANDLE DAY CLICK **********/
    /*****************************************/
    const [modalVisible, setModalVisible] = useState(false);

    const openDay = () => {
        router.push({
            pathname: "/day",
            params: { dayId: day.dayNumber },
        });
    };

    const handleDayPress = async () => {
        const today = new Date();

        if (dayIsOpen) {
            openDay();
        } else if (day.dayNumber <= today.getDate()) {
            await addDayOpening(userUuid, day.dayNumber);
            if (day.dayNumber === today.getDate()) {
                await saveScore(
                    userUuid,
                    day.dayNumber,
                    25,
                    "l'ouverture de la case du jour"
                );
            }
            setModalVisible(true);
        } else {
            ToastAndroid.show("Un peu de patience...", ToastAndroid.SHORT);
        }
    };

    return (
        <>
            <Pressable
                onPress={handleDayPress}
                style={[
                    styles.gridItem,
                    {
                        width: day.width,
                        height: day.height,
                        backgroundColor: dayIsOpen ? Colors.snow : day.color,
                        opacity: dayIsOpen ? 0.5 : 1,
                    } as ViewStyle,
                ]}
            >
                <DayNumber day={day} dayIsOpen={dayIsOpen} />
            </Pressable>

            <DayModal
                day={day}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    );
};

const styles = StyleSheet.create({
    gridItem: {
        justifyContent: "flex-end",
    },
});
