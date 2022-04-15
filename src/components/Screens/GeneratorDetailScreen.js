import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import NavBar from "../ui/NavBar";
import FadeInView from "../ui/FadeInView";
import StylesMain from "../../../styles/StylesMain";
import { useDispatch, useSelector } from "react-redux";
import PoolbarImage from "../ui/PoolbarImage";
import LoadingText from "../ui/LoadingText";
import { fetchGenerators } from "../../redux/generatorsThunk";
import artistPlaceholder from "../../../assets/img/generatorProjectPlaceholder.jpg";

const RenderMember = ({ member }) => {
  return (
    <View
      style={{
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: "black",
      }}
    >
      <View
        style={{
          width: "100%",
          marginTop: "auto",
          marginBottom: "auto",
          flexDirection: "row",
        }}
      >
        <PoolbarImage
          imageId={member.image}
          fallback={artistPlaceholder}
          style={{
            width: 100,
            height: 100,
            borderRadius: 300,
            alignItems: "center",
          }}
        />
        <View style={{}}>
          <View
            style={{
              marginLeft: 20,
              marginTop: "auto",
              marginBottom: "auto",
              width: "100%",
            }}
          >
            <Text style={StylesMain.artistListDateText}>{member.year}</Text>
            <Text style={StylesMain.artistListMainText}>{member.name}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const RenderElement = ({ generator }) => {
  return (
    <View style={{ flex: 1, width: "100%", height: "100%" }}>
      <View style={{ padding: 20, marginTop: 10 }}>
        <View>
          <Text style={styles.roomDateText}>{generator.lab_item.name}</Text>
          <Text style={styles.roomMainText}>{generator.name}</Text>
          <Text style={StylesMain.text}>
            {generator.description_full || generator.description_short}
          </Text>
          <View style={{ height: 20 }}></View>
        </View>
      </View>
      <PoolbarImage
        imageId={generator.image}
        fallback={artistPlaceholder}
        style={{
          flex: 1,
          width: "100%",
          height: 320,
          marginBottom: 30,
        }}
      />
      {generator.members.length > 0 && (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  StylesMain.artistDetailsDateText,
                  { marginBottom: 20, marginHorizontal: 20 },
                ]}
              >
                mitwirkende
              </Text>
              <View style={{ flex: 1, borderTopWidth: 2 }}></View>
              {generator.members.map((member) => (
                <RenderMember key={member.id} member={member} />
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const GeneratorDetailScreen = ({ route, navigation }) => {
  const id = route.params.id.trim();
  const generators = useSelector((state) => state.generators.data);
  const [selectedGenerator, setSelectedGenerator] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenerators());
  }, []);

  useEffect(() => {
    const generator = generators.find((generator) => generator.id === id);
    setSelectedGenerator(generator);
  }, [generators]);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: "100%" }}>
        <NavBar navigation={navigation} title={"projekt"} />
        <ScrollView style={{ flex: 1 }}>
          {selectedGenerator ? (
            <RenderElement generator={selectedGenerator} />
          ) : (
            <LoadingText />
          )}
        </ScrollView>
      </FadeInView>
    </View>
  );
};

const styles = StyleSheet.create({
  roomDateText: {
    fontFamily: "HelviotopiaBold",
    color: "black",
    alignSelf: "flex-start",
    marginTop: "auto",
    fontSize: 24,
    textAlign: "left",
    textTransform: "uppercase",
  },
  roomMainText: {
    fontFamily: "Helviotopia",
    fontWeight: "500",
    color: "black",
    alignSelf: "flex-start",
    marginTop: "auto",
    fontSize: 32,
    textAlign: "left",
    textTransform: "uppercase",
  },
});

export default GeneratorDetailScreen;
