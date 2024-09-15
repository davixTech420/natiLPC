import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { FlatList, View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { images } from "../constants";
import { CustomButton, Loader } from "../components";

import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  /*  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />; */

  const imagSli = [
    {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrOD_ecG-E-axP3HSisICTyIUU39yFe4z67Q&s",
    },
    {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0FPNcRl4ryvs5HaBQbPEtuJ_rYFJJIWUeXg&s",
    },
    {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp-lld4eqGY6oFi3xKKJYUkVg2Q5GA2whCzA&s",
    },
  ];
  return (
    <SafeAreaView className="bg-white h-full">
      {/* <Loader isLoading={loading} /> */}

      <ScrollView
        contentContainerStyle={{
          height: "80%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.lpc}
            className="w-[130px] h-[84px] b "
            resizeMode="contain"
          />

          <FlatList
          className="rounded-xl"
            horizontal
            showsHorizontalScrollIndicator={false}
            data={imagSli}
            renderItem={({ item }) => (
              <View className="aline-center item-center margin-inline-5  ">
                <Image
                  source={{ uri: item.uri }}
                  style={{ width: 300, height: 200, marginInline: 5}}
                />
              </View>
            )}
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-black font-bold text-center">
              Transmite LA Energia En Un Show De Teatro {"\n"}
              <Text className="text-customTel">LPC</Text>
            </Text>

          </View>
          <Text className="text-sm font-pregular text-gray-500 mt-7 text-center">
            Explora Los Teatros
          </Text>

          <CustomButton
            title="Continua Con Tu Email"
            handlePress={() => router.push("/sign-up")}
            containerStyles="w-full"
            backgroundColor="07575B"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
