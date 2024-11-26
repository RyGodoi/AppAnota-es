import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Box(props) {
    return (
        <View style={style.container}>
            <View style={style.textoBox}>
                <Text style={style.texto}>{props.textoText}</Text>
            </View>
            <View style={style.textoBox2}>
                <View style={style.textoBox3}>
                    <TouchableOpacity style={style.icones} title="deletar" onPress={props.editar}>
                        <FontAwesome6 name="pencil" size={20} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.icones} title="deletar" onPress={props.deletar}>
                        <FontAwesome6 name="delete-left" size={20} color="red" />
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1 }}>
                    <Text style={{ fontSize: 10 }}>{props.diaMes}</Text>
                    <Text style={{ fontSize: 18 }}>{props.horaMinuto}</Text>
                </View>
            </View>
        </View >
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#c2def6',
        padding: 5,
        margin: 10,
        borderWidth: 1,
        borderColor: '#eaeaea',
        borderRadius: 20
    },
    texto: {
        textAlign: 'left',
        color: 'black',
    },
    textoBox: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#0066c1',
        borderRadius: 10
    },
    textoBox2: {
        flexDirection: 'row'

    },
    textoBox3: {
        flexDirection: 'row',
    },
    icones: {
        padding: 9,
        margin: 3,
        borderRadius: 25
    }
});
