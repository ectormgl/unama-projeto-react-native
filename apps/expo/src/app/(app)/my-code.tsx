/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react"
import { Platform, Pressable, Text, View } from "react-native"
import { useRouter } from "expo-router"
import { EvilIcons } from "@expo/vector-icons"
import QRCode from "react-qr-code"
import { useSession } from "~/utils/auth"

export default function MyCodeScreen() {
    const {data} = useSession()
    const router = useRouter()
    function onPressShareHandler() {}

    const user = data.user!

    return (
        <View className="flex flex-1 flex-col gap-10 px-4">
            <View className="flex flex-row items-center justify-between">
                <Pressable onPress={() => router.back()}>
                    <EvilIcons name="chevron-left" size={40} />
                </Pressable>
                <Pressable onPress={onPressShareHandler}>
                    {Platform.OS === "ios" ? (
                        <EvilIcons name="share-apple" size={32} />
                    ) : (
                        <EvilIcons name="share-google" size={32} />
                    )}
                </Pressable>
            </View>
            <View className="flex items-center justify-center mx-auto h-96 w-11/12 rounded-lg bg-gray-200">
                <View className="bg-white p-8 rounded-lg">
                    <QRCode
                        size={200}
                        value={user.id}
                    />
                </View>
            </View>
            <Text className="text-lg text-center">
                Meu código é: {"\n"}{user.id}
            </Text>
        </View>
    )
}