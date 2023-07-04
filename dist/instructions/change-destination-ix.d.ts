import { Instruction } from "@orca-so/common-sdk";
import { PublicKey } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { LockSpl } from "../artifacts/lock-spl";
export declare type ChangeDestinationParams = {
    accounts: {
        authority: PublicKey;
        vaultAccount: PublicKey;
    };
    inputs: {
        newDestination: PublicKey;
    };
};
export declare function changeDestination(program: Program<LockSpl>, params: ChangeDestinationParams): Promise<Instruction>;
