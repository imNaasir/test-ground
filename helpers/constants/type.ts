// Define the type for your stack
export type AuthStackParamList = {
    WelcomeScreen: undefined;
    SignIn: undefined;
    SingUp: undefined;
    LockScreen: undefined;
    CreatePasswordScreen: {
        wallet_id?: string;
        full_name?: string;
        user_name?: string;
    };
    ForgotPassword: undefined;

    ChannelOtp: {
        fullName?: string;
        email?: string | null;
        phone?: string | null;
        from: string;
    };
    VerifyOtp: {
        wallet_id?: string;
        full_name?: string;
        user_name?: string;
        channel?: string | null;
        destination?: string | null;
        canLogin?: boolean | null;
    };
};
import { NavigatorScreenParams } from "@react-navigation/native";

export type WalletScreenParamList = {
    FrozenInfo: undefined;
    Wallet: undefined;
    IndexInfo: undefined;
    Swap: undefined;
    TransferScreen: undefined;
    Withdraw: undefined;
    ConfirmWithdraw: undefined;
    FormWithdraw: undefined;
    InstantBuy: undefined;
    Confirmation: undefined;
    TransactionWaiting: undefined;
};

export type AppStackParamList = {
    // Transaction History
    TransactionHistory: undefined;
    Receipt: undefined;

    WalletScreen: NavigatorScreenParams<WalletScreenParamList>; // Use NavigatorScreenParams
    InstantBuy: undefined;

    AccountScreen: undefined;
    AccountsForm: undefined;
    // WalletScreen: undefined;
    HomeScreen: undefined;
    SettingScreen: undefined;

    Withdraw: undefined;
    ConfirmWithdraw: undefined;

    Notification: undefined;
    Profile: undefined;
    NotificationScreen: undefined;
    NotificationView: undefined;

    SettingsScreen: undefined;
    AccountActivity: undefined;
    SecuritySettings: undefined;
    UserProfile: undefined;
    ChangePassword: undefined;
    KycScreen: undefined;
    Pin: undefined;
    SupportScreen: undefined;
    AboutScreen: undefined;
    DeleteAccount: undefined;
    AppChannelOtp: {
        fullName?: string;
        email?: string | null;
        phone?: string | null;
        from: string;
    };
    AppVerifyOtp: {
        wallet_id?: string;
        channel?: string | null;
        destination?: string | null;
        canLogin?: boolean | null;
    };
};

export type UserType = {
    id: number; // Required field
    full_name?: string; // Optional field
    email?: string; // Optional field
    phone?: string; // Optional field
    phone_verified?: string; // Optional field
    address?: {
        city?: string; // Optional field
        district?: string; // Optional field
        village?: string; // Optional field
    };
    balance?: string; // Optional field
    created_at?: string; // Optional field
    updated_at?: string; // Optional field
    date?: string; // Optional field
    desc?: string | null; // Optional field
    is_VIP?: number; // Optional field
    is_developer?: number; // Optional field
    kyc?: number; // Optional field
    pass_check?: string; // Optional field
    status?: string; // Optional field
    terms_and_conditions?: number; // Optional field
};

// Define the type for your swap stack
export type SwapStackParamList = {
    HomeScreen: undefined;
    DetailScreen: undefined;
    EvcScreen: undefined;
    Notifications: undefined;
    TransactionConfirm: undefined;
};

export type AccountStackParamList = {
    AccountScreen: undefined;
    AccountsForm: undefined;
};

export type TransactionHistoryStackParamList = {
    TransactionFilter: undefined;
    TransactionList: undefined;
    Receipt: undefined;
};

// export type WalletStackParamList = {
//     WalletScreen: undefined;
//     FrozenInfo: undefined;
//     Wallet: undefined;
//     IndexInfo: undefined;
//     Swap: undefined;
//     TransferScreen: undefined;
//     Withdraw: undefined;
//     ConfirmWithdraw: undefined;
//     FormWithdraw: undefined;
// };

export type NotificationsStackParamList = {
    Notification: undefined;
    Profile: undefined;
    NotificationScreen: undefined;
    NotificationView: undefined;
};
export type SettingsStackParamList = {
    SettingsScreen: undefined;
    SecuritySettings: undefined;
    UserProfile: undefined;
    ChangePassword: undefined;
    KycScreen: undefined;
    Pin: undefined;
    SupportScreen: undefined;
};
// types.ts
export interface Notifications {
    id: number;
    title: string;
    message: string;
    date: string;
    is_read: number; // 1 for read, 0 for unread
    status: "approved" | "rejected" | "normal" | "opened" | "Confirming"; // Notification status types
}

export type RequestBodyType<D> = { param?: string | number; data?: D; success?: (data?: any) => void; error?: (data?: any) => void };

export const Font = {
    Black: "Overpass_900Black",
    ExtraBold: "Overpass_800ExtraBold",
    Bold: "Overpass_700Bold",
    Semibold: "Overpass_600SemiBold",
    Medium: "Overpass_500Medium",
    Regular: "Overpass_400Regular",
    Light: "Overpass_300Light",
    ExtraLight: "Overpass_200ExtraLight",
    Thin: "Overpass_100Thin",

    Black_Italic: "Overpass_900Black_Italic",
    ExtraBold_Italic: "Overpass_800ExtraBold_Italic",
    Bold_Italic: "Overpass_700Bold_Italic",
    Semibold_Italic: "Overpass_600SemiBold_Italic",
    Medium_Italic: "Overpass_500Medium_Italic",
    Regular_Italic: "Overpass_400Regular_Italic",
    Light_Italic: "Overpass_300Light_Italic",
    ExtraLight_Italic: "Overpass_200ExtraLight_Italic",
    Thin_Italic: "Overpass_100Thin_Italic",
};
