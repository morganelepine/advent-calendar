import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Video } from "@/components/custom-utils/Video";

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

interface QuizExplanationProps {
    games: Content[];
    selectedAnswer: string;
    currentGame: Content;
    currentQuestionIndex: number;
    handleNextQuestion: () => void;
}

export const QuizExplanation: React.FC<QuizExplanationProps> = ({
    games,
    selectedAnswer,
    currentGame,
    currentQuestionIndex,
    handleNextQuestion,
}) => {
    return (
        <View>
            <View style={[styles.explanationsContainer]}>
                {selectedAnswer === currentGame.content3 ? (
                    <ThemedText style={styles.response}>
                        Bonne réponse !
                    </ThemedText>
                ) : (
                    <ThemedText style={styles.response}>
                        Oops... La bonne réponse était "{currentGame.content3}"
                    </ThemedText>
                )}

                {currentGame.content5 === "quiz-noel" &&
                currentGame.content4 ? (
                    <ThemedText style={styles.explanations}>
                        {currentGame.content4}
                    </ThemedText>
                ) : null}

                {currentGame.content5 === "quiz-citation" &&
                currentGame.content4 ? (
                    <View style={styles.videoContainer}>
                        <Video videoId={currentGame.content4} />
                    </View>
                ) : null}
            </View>

            {currentQuestionIndex === games.length - 1 ? (
                <ThemedText style={styles.finalText}>
                    Ce quiz de Noël est terminé 🎅
                </ThemedText>
            ) : (
                <Pressable onPress={handleNextQuestion}>
                    <ThemedText style={[styles.nextQuestionButton]}>
                        Question suivante
                    </ThemedText>
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    response: { fontFamily: "AnonymousProBold" },
    explanationsContainer: {
        marginVertical: 20,
    },
    explanations: {
        marginTop: 10,
        fontSize: 18,
        textAlign: "left",
    },
    videoContainer: { marginTop: 20 },
    nextQuestionButton: {
        color: "#136F63",
        borderColor: "#136F63",
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontFamily: "AnonymousProBold",
    },
    finalText: { fontFamily: "AnonymousProBold", fontSize: 14, marginTop: 10 },
});
