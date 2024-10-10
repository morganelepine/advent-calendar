import { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/custom-utils/Modal";
import { ContentButton } from "@/components/content/ContentButton";
import { Hangman } from "@/components/content/games/Hangman";
import { Games } from "@/components/content/games/Games";
import { Quiz } from "@/components/content/games/Quiz";

interface Content {
    id: number;
    type: "quote" | "recipe" | "anecdote" | "idea" | "game";
    title: string;
    content1: string;
    content2: string;
    content3: string;
    content4: string;
    content5: string;
}
interface GameProps {
    games: Content[];
}

export const Game: React.FC<GameProps> = ({ games }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const gamesByType: {
        pendu?: Content;
        jeu?: Content;
        quizCitation: Content[];
        quizNoel: Content[];
    } = { quizCitation: [], quizNoel: [] };

    let title = "";
    games.forEach((game) => {
        switch (game.content5) {
            case "pendu":
                gamesByType.pendu = game;
                title = "game";
                break;
            case "jeu":
                gamesByType.jeu = game;
                title = "game";
                break;
            case "quiz-citation":
                gamesByType.quizCitation.push(game);
                title = "quiz";
                break;
            case "quiz-noel":
                gamesByType.quizNoel.push(game);
                title = "quiz";
                break;
        }
    });

    return (
        <>
            <ContentButton games={games} setModalVisible={setModalVisible} />
            <CustomModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                contentType={title}
            >
                <ScrollView
                    persistentScrollbar={true} // Android only
                >
                    <View style={styles.container}>
                        {gamesByType.pendu && (
                            <Hangman game={gamesByType.pendu} />
                        )}
                        {gamesByType.jeu && <Games game={gamesByType.jeu} />}
                        {gamesByType.quizCitation.length > 0 && (
                            <>
                                <ThemedText style={styles.quizTitle}>
                                    À quel film de Noël appartient cette
                                    réplique ?
                                </ThemedText>
                                <Quiz games={gamesByType.quizCitation} />
                            </>
                        )}
                        {gamesByType.quizNoel.length > 0 && (
                            <>
                                <ThemedText style={styles.quizTitle}>
                                    Êtes-vous incollable sur Noël ?
                                </ThemedText>
                                <Quiz games={gamesByType.quizNoel} />
                            </>
                        )}
                    </View>
                </ScrollView>
            </CustomModal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    title: {
        marginTop: 10,
    },
    quizTitle: {
        fontFamily: "AnonymousProBold",
        fontSize: 24,
        marginBottom: 15,
    },
});
