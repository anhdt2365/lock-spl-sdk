import { PublicKey } from "@solana/web3.js";
import { TransactionBuilder } from "@orca-so/common-sdk";
import { Context, PDA } from "..";
import { VaultData } from "../types";
export declare class LockSplClient {
    ctx: Context;
    pda: PDA;
    constructor(ctx: Context, pda: PDA);
    static getClient(ctx: Context): Promise<LockSplClient>;
    lock(user: PublicKey, mint: PublicKey, index: number, amount: string, releaseTimestamp: string): Promise<TransactionBuilder>;
    changeDestination(mint: PublicKey, index: number, newDestination: PublicKey): Promise<TransactionBuilder>;
    unlock(user: PublicKey, mint: PublicKey, index: number): Promise<TransactionBuilder>;
    getVaultByUserIndex(user: PublicKey, mint: PublicKey, index: number): Promise<VaultData>;
    getOneVault(vault: PublicKey): Promise<VaultData>;
}
