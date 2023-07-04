import { BN, BorshAccountsCoder, Idl } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { LockSpl } from "../artifacts/lock-spl";
import * as IDL from "../artifacts/lock-spl.json";

export type LockSplType = LockSpl;
export const LockSplIDL = IDL as Idl;
export const accountsCoder = new BorshAccountsCoder(LockSplIDL);

export enum AccountName {
    Vault = "vault",
}

export type VaultData = {
    bump: number;
    tokenBump: number;
    index: number;
    destination: PublicKey;
    mint: PublicKey;
    amount: string;
    releaseTimestamp: string;
    claimed: boolean;
};
