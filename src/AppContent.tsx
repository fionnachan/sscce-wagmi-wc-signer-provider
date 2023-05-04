import { useAccount, useConnect, useSigner } from "wagmi";
import { rollupABI } from "./rollupABI";
import { Contract } from "ethers";

function AppContent() {
  const { connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { data: signer } = useSigner();

  async function callContractMethod() {
    if (!signer) {
      throw Error("signer is undefined");
    }
    const rollup = new Contract(
      "0x45e5cAea8768F42B385A366D3551Ad1e0cbFAb17",
      rollupABI,
      signer.provider
    );
    console.log("signer: ", signer);
    console.log(
      "rollup.callStatic.latestConfirmed: ",
      rollup.callStatic.latestConfirmed
    );
    try {
      const latestConfirmedNodeNum = await rollup.callStatic.latestConfirmed();
      console.log("latestConfirmedNodeNum: ", latestConfirmedNodeNum);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      {isConnected && <div>Connected to {activeConnector?.name}</div>}

      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {isLoading &&
            pendingConnector?.id === connector.id &&
            " (connecting)"}
        </button>
      ))}

      {error && <div>{error.message}</div>}

      <button onClick={() => callContractMethod()}>Call Contract Method</button>
    </>
  );
}

export default AppContent;
