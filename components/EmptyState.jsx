import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "../constants";
import CustomButton from "./CustomButton";

const EmptyState = () => {
  return (
    <>
<View className="flex-1 items-center justify-center p-4">
    {/*   <Image source={user.avatar} className="w-24 h-24 rounded-full mb-4" />
      <Text className="text-2xl font-bold text-gray-800">¡Hola, {user.name}!</Text>
      <Text className="text-gray-500 mb-8">Tu última actividad fue el {user.lastActivity}</Text> */}

      {/* Sección de acciones */}
      <View className="flex-row space-x-4">
       
      </View>

      {/* Sección de estadísticas o gráficos (opcional) */}
      <View className="mt-8">
        {/* Aquí puedes agregar gráficos o estadísticas */}
      </View>
    </View>
  
      </>
  );
};

export default EmptyState;
