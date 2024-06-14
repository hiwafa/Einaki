import { View, Text, Pressable } from "react-native";

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

    return (
        <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline'}}>
                {proceccedText.split("**").map((outerItem, indx) => {

                    // console.log("outerItem: ", outerItem); 

                    return outerItem.split("~~").map((innerItem, idx) => {
                        console.log("innerItem: ", innerItem);
                      if(innerItem.slice(0, 2) === "##") {
                        let removeMark = innerItem.slice(2);
                        return (
                            <Pressable onPress={()=>{alert(removeMark)}}>
                                <Text key={`${idx+indx}`} style={{color: 'green', fontSize: '30px', fontWeight: 'bold'}}> {removeMark} </Text>
                            </Pressable>
                        )
                      }
                      return <Text> {innerItem} </Text>
                    });

                })}
        </View>
    )
}