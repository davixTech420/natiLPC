import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import { icons } from "../../constants";
import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2  rounded-lg">
  
      <Image
        source={icon}
        resizeMode="contain"
        tintColor="white"
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs m-2`}
        style={{ color: "white" }}
      >
        {name}
      </Text>
    
    </View>
  );
};

const TabLayout = () => {
   const { loading, isLogged } = useGlobalContext();

  if (!loading && !isLogged) return <Redirect href="/sign-in" />; 

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopLeftRadius:30,
            borderTopRightRadius:30,
            backgroundColor: "#07575B",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 70,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Dashboard"
                focused={focused}
              />
            ),
          }}
        />
        
      
      </Tabs>

      <Loader isLoading={loading} /> 
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabLayout;
