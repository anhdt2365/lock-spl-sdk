import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

export const VAULT_SEED = "vault";
export const VAULT_TOKEN_SEED = "vault_token";

export interface PDAInfo {
    key: PublicKey;
    bump: number;
}

export class PDA {
    readonly programId: PublicKey;

    public constructor(programId: PublicKey) {
        this.programId = programId;
    }

    vault = (mint: PublicKey, index: string): PDAInfo => {
        if (index.length != 20) {
            throw Error("Invalid vault index length");
        }

        const [pda, bump] = PublicKey.findProgramAddressSync(
            [anchor.utils.bytes.utf8.encode(VAULT_SEED), mint.toBuffer(), anchor.utils.bytes.utf8.encode(index)],
            this.programId,
        );
        return {
            key: pda,
            bump: bump,
        };
    };
}
