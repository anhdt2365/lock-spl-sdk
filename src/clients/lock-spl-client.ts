import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { TransactionBuilder } from "@orca-so/common-sdk";
import { Context, PDA, VAULT_TOKEN_SEED } from "..";
import { VaultData } from "../types";

export class LockSplClient {
    ctx: Context;
    public pda: PDA;

    constructor(
        ctx: Context,
        pda: PDA
    ) {
        this.ctx = ctx;
        this.pda = pda;
    }

    public static async getClient(
        ctx: Context,
    ): Promise<LockSplClient> {
        const pda = new PDA(ctx.program.programId);
        return new LockSplClient(ctx, pda);
    }

    public async lock(
        user: PublicKey,
        mint: PublicKey,
        index: anchor.BN,
        amount: anchor.BN,
        releaseTimestamp: anchor.BN
    ): Promise<TransactionBuilder> {
        const vault = this.pda.vault(mint, index);

        // Get vault token account
        const [vaultTokenAccount, ] = PublicKey.findProgramAddressSync(
            [anchor.utils.bytes.utf8.encode(VAULT_TOKEN_SEED), vault.key.toBuffer()],
            this.ctx.program.programId,
        );
        // Get user token account
        const userTokenAccount = await this.ctx.connection.getTokenAccountsByOwner(
            user,
            {
                mint,
            }
        );

        const tx = (
            await this.ctx.methods.lock({
                accounts: {
                    authority: user,
                    authorityTokenAccount: userTokenAccount.value[0].pubkey,
                    vaultAccount: vault.key,
                    vaultTokenAccount,
                    mint,
                },
                inputs: {
                    index,
                    destination: user,
                    amount,
                    releaseTimestamp
                },
            })
        ).toTx();

        return tx;
    }

    public async changeDestination(
        mint: PublicKey,
        index: anchor.BN,
        newDestination: PublicKey,
    ): Promise<TransactionBuilder> {
        const vault = this.pda.vault(mint, index);

        const tx = (
            await this.ctx.methods.changeDestination({
                accounts: {
                    authority: this.ctx.wallet.publicKey,
                    vaultAccount: vault.key,
                },
                inputs: {
                    newDestination
                },
            })
        ).toTx();

        return tx;
    }

    public async unlock(
        user: PublicKey,
        mint: PublicKey,
        index: anchor.BN,
    ): Promise<TransactionBuilder> {
        const vault = this.pda.vault(mint, index);

        // Get vault token account
        const vaultTokenAccount = await this.ctx.connection.getTokenAccountsByOwner(
            vault.key,
            {
                mint,
            }
        );
        // Get user token account
        const userTokenAccount = await this.ctx.connection.getTokenAccountsByOwner(
            user,
            {
                mint,
            }
        );

        const tx = (
            await this.ctx.methods.unlock({
                accounts: {
                    authority: this.ctx.wallet.publicKey,
                    destinationTokenAccount: userTokenAccount.value[0].pubkey,
                    vaultAccount: vault.key,
                    vaultTokenAccount: vaultTokenAccount.value[0].pubkey,
                },
                inputs: {},
            })
        ).toTx();

        return tx;
    }

    public async getVaultByUserIndex(
        user: PublicKey,
        mint: PublicKey,
        index: anchor.BN
    ): Promise<VaultData> {
        const pda = new PDA(this.ctx.program.programId);
        const vault = pda.vault(mint, index);

        const vaultData = await this.ctx.fetcher.getVault(vault.key, true);
        if (!vaultData) {
            throw new Error(`Vault of user ${user}. mint ${mint}, index ${index} not found`);
        }
        return vaultData;
    }

    public async getOneVault(
        vault: PublicKey,
    ): Promise<VaultData> {
        const vaultData = await this.ctx.fetcher.getVault(vault, true);
        if (!vaultData) {
            throw new Error(`Vault ${vault} not found`);
        }
        return vaultData;
    }
}
