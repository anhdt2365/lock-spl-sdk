import { Instruction } from "@orca-so/common-sdk";
import { PublicKey } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { LockSpl } from "../artifacts/lock-spl";
export declare type UnlockParams = {
    accounts: {
        authority: PublicKey;
        destinationTokenAccount: PublicKey;
        vaultAccount: PublicKey;
        vaultTokenAccount: PublicKey;
    };
    inputs: {};
};
export declare function unlock(program: Program<LockSpl>, params: UnlockParams): Promise<Instruction>;
