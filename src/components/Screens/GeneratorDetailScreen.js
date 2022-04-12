import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import NavBar from '../ui/NavBar';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { useDispatch, useSelector } from 'react-redux';
import PoolbarImage from '../ui/PoolbarImage';
import LoadingText from '../ui/LoadingText';
import { fetchGenerators } from '../../redux/generatorsThunk';


const RenderElement = ({ generator }) => {
    console.log(generator)
    return (
        <View style={{ flex: 1, width: '100%', height: '100%' }}>
            <View style={{ backgroundColor: '#c6c300', padding: 20, marginTop: 10 }}>
                <View>
                    <Text style={styles.roomDateText}>{generator.lab_item.name}</Text>
                    <Text style={styles.roomMainText}>{generator.name}</Text>
                    <Text style={StylesMain.text}>{generator.description_full || generator.description_short}</Text>
                    <View style={{ height: 20 }}></View>
                </View>
                <PoolbarImage
                    imageId={generator.image}
                    style={{
                        flex: 1,
                        width: '100%',
                        height: 320,
                    }}
                />
            </View>
        </View>
    );
};

const GeneratorDetailScreen = ({ route, navigation }) => {
    const id = route.params.id.trim();
    const generators = useSelector((state) => state.generators.data);
    const [selectedGenerator, setSelectedGenerator] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGenerators())
    }, []);

    useEffect(() => {
        const generator = generators.find((generator) => generator.id === id);
        setSelectedGenerator(generator);
    }, [generators]);

    return (
        <View style={StylesMain.mainView}>
            <FadeInView style={{ flex: 1, width: '100%' }}>
                <NavBar navigation={navigation} title={selectedGenerator.lab_item?.name} />
                <ScrollView style={{ flex: 1 }}>
                    {(selectedGenerator) ?
                        <RenderElement
                            generator={selectedGenerator}
                        /> :
                        <LoadingText />
                    }
                </ScrollView>
            </FadeInView>
        </View>
    );
};

const styles = StyleSheet.create({
    roomDateText: {
        fontFamily: 'HelviotopiaBold',
        color: '#000',
        alignSelf: 'flex-start',
        marginTop: 'auto',
        fontSize: 24,
        textAlign: 'left',
        textTransform: 'uppercase',
    },
    roomMainText: {
        fontFamily: 'Helviotopia',
        fontWeight: '500',
        color: '#000',
        alignSelf: 'flex-start',
        marginTop: 'auto',
        fontSize: 32,
        textAlign: 'left',
        textTransform: 'uppercase',
    },
});

export default GeneratorDetailScreen;
