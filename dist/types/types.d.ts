import { BorshAccountsCoder, Idl } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { LockSpl } from "../artifacts/lock-spl";
export declare type LockSplType = LockSpl;
export declare const LockSplIDL: Idl;
export declare const accountsCoder: BorshAccountsCoder<string>;
export declare enum AccountName {
    Vault = "vault"
}
export declare type VaultData = {
    bump: number;
    tokenBump: number;
    index: number;
    destination: PublicKey;
    mint: PublicKey;
    amount: string;
    releaseTimestamp: string;
    claimed: boolean;
};
