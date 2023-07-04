import { Instruction } from "@orca-so/common-sdk";
import { PublicKey } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { LockSpl } from "../artifacts/lock-spl";
export declare type LockParams = {
    accounts: {
        authority: PublicKey;
        authorityTokenAccount: PublicKey;
        vaultAccount: PublicKey;
        vaultTokenAccount: PublicKey;
        mint: PublicKey;
    };
    inputs: {
        index: number;
        destination: PublicKey;
        amount: string;
        releaseTimestamp: string;
    };
};
export declare function lock(program: Program<LockSpl>, params: LockParams): Promise<Instruction>;
