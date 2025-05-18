// import { RootStackParamList } from "@/helpers/types/stackParam";
import { RootStackParamList } from "@navigation/types";
import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

type ParamType<T extends keyof RootStackParamList> = RootStackParamList[T];

export function navigate<T extends keyof RootStackParamList>(name: T, params: ParamType<T>) {
    if (navigationRef.isReady()) {
        // @ts-ignore
        navigationRef.navigate(name, params);
    }
}
