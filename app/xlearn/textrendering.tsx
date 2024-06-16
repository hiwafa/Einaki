import { useState } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions, Modal, Alert } from "react-native";

/*
slice(start, end) the end works like length but from first char
- the negative value starts from the end

substring(start, end) the end works like length but from first char
- The difference is that start and end values less than 0 are treated as 0 in substring().

substr(start, length) the length starts from start
str.at(-1) = str.charAt(str.length-1);

let text = "5";
text.padStart(3,"*") **5

let text = "Hello";
const result = text.padStart(text.length+2, "*").padEnd(text.length+3,"*"); **Hello*

*/
export default function AboutScreen() {

    let proceccedText = "Hi **##dear~~, how are **##you~~I hope you are do**##ing~~ well I can apply using their **##website~~ that is why i am **##suggesting~~ you";
    const [showOptions, setShowOptions] = useState(false);

    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline' }}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showOptions}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setShowOptions(!showOptions);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setShowOptions(!showOptions)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {proceccedText.split("**").map((outerItem, indx) => {

                // console.log("outerItem: ", outerItem); 

                return outerItem.split("~~").map((innerItem, idx) => {
                    console.log("innerItem: ", innerItem);
                    if (innerItem.slice(0, 2) === "##") {
                        let removeMark = innerItem.slice(2);

                        return (
                            <Pressable onPress={() => {
                                setShowOptions(true);
                                alert(`${removeMark} - ${removeMark === "ing"}`);
                            }}>
                                <Text key={`${idx + indx}`} style={{ color: 'green', fontSize: '30px', fontWeight: 'bold' }}> {removeMark} </Text>
                            </Pressable>
                        )
                    }
                    return <Text> {innerItem} </Text>
                });

            })}
        </View>
    )
}


const styles = StyleSheet.create({
    modalStyle: {
        ...StyleSheet.absoluteFillObject,
        width: 300,
        height: 200,
        // marginHorizontal: 150,
        // marginVertical: 150,
        backgroundColor: '#fff',
        position: 'absolute',
        borderRadius: 5,

        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
});