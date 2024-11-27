import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ScrollView, TextInput, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Box from './components/box';
import { useState, useEffect } from 'react';


export default function App() {
    const [anotar, setanotar] = useState('');
    const [list, setlist] = useState([]);
    const [editandoIndex, setEditandoIndex] = useState(null); // Index do item sendo editado
    const [podeApagar, setpodeApagar] = useState(null); // Index do item sendo editado
    const [textoEditado, setTextoEditado] = useState(''); // Texto temporário para edição
    const [modalApagarTudo, setModalApagarTudo] = useState(null);



    const LIST_KEY = '@anotacoes_lista';

    // Carregar lista de anotações ao abrir o app
    useEffect(() => {
        const carregarAnotacoes = async () => {
            try {
                const anotacoesSalvas = await AsyncStorage.getItem(LIST_KEY);
                if (anotacoesSalvas) {
                    setlist(JSON.parse(anotacoesSalvas));
                }
            } catch (error) {
                console.error('Erro ao carregar anotações:', error);
            }
        };
        carregarAnotacoes();
    }, []);

    // Salvar lista de anotações sempre que ela for alterada
    useEffect(() => {
        const salvarAnotacoes = async () => {
            try {
                await AsyncStorage.setItem(LIST_KEY, JSON.stringify(list));
            } catch (error) {
                console.error('Erro ao salvar anotações:', error);
            }
        };
        salvarAnotacoes();
    }, [list]);




    const funciona = () => {
        if (!anotar.trim()) {
            alert('Escreva alguma coisa');
        } else {


            const dataAtual = new Date();
            const diaMes = `${dataAtual.getDate().toString().padStart(2, '0')}/${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}/${dataAtual.getFullYear()}`;
            const horaMinuto = `${dataAtual.getHours().toString().padStart(2, '0')}:${dataAtual.getMinutes().toString().padStart(2, '0')}`;


            setlist([{ texto: anotar, diaMes, horaMinuto }, ...list]);
            setanotar('');
        }
    };

    const deletar = (id) => {
        const novaLista = list.filter((_, i) => i !== id);
        setlist(novaLista);
        setpodeApagar(null); //fechar modal
    };

    const iniciarEdicao = (index) => {
        setEditandoIndex(index);
        setTextoEditado(list[index].texto); // Preenche o texto atual no campo de edição
    };
    const iniciarDelete = (index) => {
        setpodeApagar(index);
    };

    const salvarEdicao = () => {
        const novaLista = [...list];
        novaLista[editandoIndex].texto = textoEditado;
        setlist(novaLista);
        setEditandoIndex(null); // Sai do modo de edição
        setTextoEditado('');
    };

    const abrirModalApagarTudo = (index) => {
        setModalApagarTudo(index);
    };

    const confirmarApagarTudo = () => {
        setlist([]); // Apaga todas as anotações
        setModalApagarTudo(null); // Fecha a modal
    };

    const cancelarApagarTudo = () => {
        setModalApagarTudo(null); // Fecha a modal sem apagar
    };


    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={'#0066c1'} barStyle={'light-content'}></StatusBar>
            <View style={style.header}>
                <Text style={style.textHeader}>Anotações</Text>
                <View style={style.headerContent}>
                    <Text style={style.contagemAnotacoes}>
                        {list.length > 0
                            ? `Você tem ${list.length} anotação${list.length > 1 ? 's' : ''}`
                            : 'Nenhuma anotação salva'}
                    </Text>
                    {list.length > 0 && (
                        <TouchableOpacity style={style.icones} onPress={() => abrirModalApagarTudo('sim')}>
                            <FontAwesome style={{ textAlign: 'center' }} name="trash" size={20} color="white" />
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 10 }}>Apagar tudo</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <ScrollView>
                {list.map((val, i) => (
                    <Box
                        key={i}
                        textoText={val.texto}
                        diaMes={val.diaMes}
                        horaMinuto={val.horaMinuto}
                        deletar={() => iniciarDelete(i)}
                        editar={() => iniciarEdicao(i)}
                    />
                ))}
            </ScrollView>
            {modalApagarTudo !== null && (
                <View style={style.modalEdicao}>
                    <Text style={{ color: 'black' }}>Tem certeza que deseja apagar todas as anotações?</Text>
                    <TouchableOpacity onPress={confirmarApagarTudo}>
                        <Text style={style.botaoSalvar1}>Sim</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={cancelarApagarTudo}>
                        <Text style={style.botaoSalvar2}>Não</Text>
                    </TouchableOpacity>
                </View>
            )}
            {podeApagar !== null && (
                <View style={style.modalEdicao}>
                    <Text style={{ color: 'black' }}>Tem certeza que quer apagar ?</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <TouchableOpacity style={style.botaoExcluir} onPress={() => deletar(podeApagar)}>
                            <Text style={style.botaoExcluir}>Sim</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.botaoCancelar} onPress={() => setpodeApagar(null)}>
                            <Text style={style.botaoCancelar}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {editandoIndex !== null && (
                <View style={style.modalEdicao}>
                    <Text style={style.editandoIndex}>Editar Anotação</Text>
                    <TextInput
                        value={textoEditado}
                        onChangeText={setTextoEditado}
                        style={style.textInput}
                        multiline
                    />
                    <TouchableOpacity onPress={salvarEdicao}>
                        <Text style={style.botaoSalvar}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            )}
            {editandoIndex == null && podeApagar == null && modalApagarTudo == null && (
                <View style={style.caixaEntrada}>
                    <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', fontWeight: 'bold', marginBottom: 5 }}>Adicionar uma nova anotação</Text>
                    <View style={style.container}>
                        <TextInput
                            multiline
                            placeholder="Escreva sua anotação"
                            style={style.textInput}
                            value={anotar}
                            onChangeText={setanotar}
                        />
                        <TouchableOpacity style={style.enviar} onPress={funciona}>
                            <FontAwesome name="arrow-circle-right" size={40} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            )
            }
        </View>
    );
}

const style = StyleSheet.create({
    header: {
        backgroundColor: '#0066c1',
        padding: 15,
        marginTop: 0,
    },
    textHeader: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    container: {
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textInput: {
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#1383e7',
        backgroundColor: '#fff',
        flex: 1,
        marginRight: 0,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 5,
    },
    caixaEntrada: {
        backgroundColor: '#0066c1',
        borderColor: '#1383e7',
        borderTopWidth: 5,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: 5,
    },
    modalEdicao: {
        position: 'absolute',
        top: '30%',
        left: '10%',
        right: '10%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#0066c1',
    },
    editandoIndex: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 5,
        color: '#0066c1',
        fontWeight: 'bold'
    },
    botaoSalvar: {
        color: 'white',
        backgroundColor: '#109700',
        textAlign: 'center',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    enviar: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    botaoExcluir: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        backgroundColor: '#ff5555',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        marginRight: 10,
    },
    botaoCancelar: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        backgroundColor: '#109700',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    contagemAnotacoes: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    contagemAnotacoes: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginRight: 10, // Espaço entre o texto e o botão
    },
    icones: {
        padding: 10,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: '#1383e7', // Cor de fundo para destacar o botão
    },
    modalEdicao: {
        position: 'absolute',
        top: '30%',
        left: '10%',
        right: '10%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#0066c1',
    },
    botaoSalvar1: {
        color: 'white',
        backgroundColor: '#109700',
        textAlign: 'center',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    botaoSalvar2: {
        color: 'white',
        backgroundColor: '#ff5555',
        textAlign: 'center',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },

});
