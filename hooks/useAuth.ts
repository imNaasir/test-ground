import { useState } from "react";
import useAuthUserStore from "@/stores/useAuthUserStore";
import useAuthStore, { WalletType } from "@/stores/useAuthStore";
import useGlobalStore from "@/stores/useGlobalStore";
import useSecureStorage from "./useSecureStorage";
import useWalletStore from "@/stores/useWalletStore";

const useAuth = () => {
    const [isAppBootstrapping, setIsAppBootstrapping] = useState(true);
    const { store, get, remove } = useSecureStorage();
    const { setToken, setWallet, setFromAuth } = useAuthStore((state) => state);
    const userDelete = useAuthUserStore((state) => state.deleteUser);
    const setIsFormSubmitting = useGlobalStore((state) => state.setIsFormSubmitting);
    const { loadWallet, loadWalletCurrencies, loadWalletSecurity } = useWalletStore();

    const login = async (token: string, wallet: WalletType) => {
        await store("token", token);
        await store("fromAuth", true);
        await store("wallet", wallet);
        setToken(token);
        setFromAuth(true);
        setWallet(wallet);
        loadWallet({});
        loadWalletCurrencies({});
        loadWalletSecurity({});
    };

    const logout = async () => {
        await remove("token");
        await remove("wallet");
        setToken(null);
        setWallet(null);
        setIsFormSubmitting(true);
    };

    const deleteUser = async () => {
        userDelete({
            success: async () => {
                await remove("token");
                await remove("wallet");
                setToken(null);
                setWallet(null);
            },
        });
    };

    const initApp = async () => {
        const token = await get("token");
        const wallet = await get("wallet");
        if (token && wallet) {
            setToken(token as string);
            setWallet(wallet as WalletType);
            loadWallet({
                success: () => setIsAppBootstrapping(false),
                error: (err) => {
                    if (err?.status === 401) {
                        console.log("Error loading wallet from server");
                        logout();
                    }
                    setIsAppBootstrapping(false);
                },
            });
            loadWalletCurrencies({});
            loadWalletSecurity({});
        } else {
            setIsAppBootstrapping(false);
        }
    };

    return { login, logout, initApp, deleteUser, isAppBootstrapping };
};

export default useAuth;
