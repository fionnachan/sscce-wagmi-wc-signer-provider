import { WagmiConfig, createClient, configureChains } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { ReactNode } from "react";
import { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy";
import { Buffer } from "buffer";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

(window as any).global = window;
window.Buffer = Buffer;

const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()]
);

const client = createClient({
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "185b447023157d54485b3f2f96210380",
      },
    }),
    new WalletConnectLegacyConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

export const WagmiProvider = ({ children }: { children: ReactNode }) => {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
};
