import { Button, Input } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  usePrepareContractWrite,
  useAccount,
  useContractWrite,
  useContractEvent,
  useContractRead,
} from "wagmi";
import { ethers } from "ethers";
import ManagerAbi from "../../public/ManagerNft.json";

function CreateTeam() {
  const [image, setImage] = useState("");
  const [address, setAddress] = useState<`0x${string}`>();
  const [owned, setOwned] = useState(0);

  const { address: addressOwner } = useAccount();

  const { data } = useContractRead({
    address: process.env.NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS as `0x${string}`,
    abi: ManagerAbi.abi,
    functionName: "balanceOf",
    args: [addressOwner, 1],
  });

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS as `0x${string}`,
    abi: ManagerAbi.abi,
    functionName: "mint",
    args: [address, 1, 1, "0x000"],
  });

  const { write, isLoading, isSuccess, error } = useContractWrite(config);

  const handleMint = () => {
    if (write) write();
  };

  const unwatch = useContractEvent({
    address: process.env.NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS as `0x${string}`,
    abi: ManagerAbi.abi,
    eventName: "TransferSingle",
    listener: async (event) => {
      console.log(event);
      setImage(
        "https://bafybeie5sl2xhjulzojmcs5gl3eyc5ez4ldfmwhu42casm77qo6p7ln7oa.ipfs.nftstorage.link/"
      );
      unwatch?.();
    },
  });

  useEffect(() => {
    setAddress(addressOwner);
    console.log(data);
  }, [addressOwner]);
  return (
    <div className="h-screen flex justify-center items-center bg-[#FFEBD8]">
      <div className="bg-[#F4DFC8] p-[50px] rounded text-center">
        <div className="flex justify-center">
          {image ? (
            <Image src={image} width={300} height={300} alt="manager" />
          ) : (
            <></>
          )}
        </div>
        {image ? (
          <h1 className="text-[30px]">Congrats you minted your Manager !!</h1>
        ) : (
          <h1 className="text-[30px]">Get your manager now !!</h1>
        )}
        <div>
          {image ? (
            <div></div>
          ) : (
            <div>
              <h1 className="text-[20px]">Team Name</h1>
              <div className="flex justify-center">
                <Input type="text" border={"black"} borderStyle={"solid"} />
              </div>
            </div>
          )}
        </div>
        <div className="pt-[20px]">
          {image ? (
            <Button>Continue</Button>
          ) : (
            <Button onClick={handleMint}>Create Team</Button>
          )}
        </div>
      </div>
    </div>
  );
}
export default CreateTeam;
