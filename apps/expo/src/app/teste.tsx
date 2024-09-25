import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetUserPoints } from "~/utils/transaction";


export default function TelaTeste() {
    const points = useGetUserPoints()
    

    return <SafeAreaView><Text>{points.data?.points}</Text></SafeAreaView>
}
