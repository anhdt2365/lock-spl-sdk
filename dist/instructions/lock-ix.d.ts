import { Instruction } from "@orca-so/common-sdk";
import { PublicKey } from "@solana/web3.js";
import { BN, Program } from "@project-serum/anchor";
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
        index: string;
        destination: PublicKey;
        amount: BN;
        releaseTimestamp: BN;
    };
};
export declare function lock(program: Program<LockSpl>, params: LockParams): Promise<Instruction>;
