import { TransactionBuilder, Instruction } from "@orca-so/common-sdk";
import { Context } from "./context";
import * as ixs from "./instructions";

export class Methods {
    public ctx: Context;
    public ix: Instruction | null | undefined;

    public constructor(ctx: Context, ix?: Instruction) {
        this.ctx = ctx;
        this.ix = ix;
    }

    public async lock(params: ixs.LockParams) {
        this.ix = await ixs.lock(this.ctx.program, params);
        return this;
    }

    public async changeDestination(params: ixs.ChangeDestinationParams) {
        this.ix = await ixs.changeDestination(this.ctx.program, params);
        return this;
    }

    public async unlock(params: ixs.UnlockParams) {
        this.ix = await ixs.unlock(this.ctx.program, params);
        return this;
    }

    public toTx(): TransactionBuilder {
        const tx = new TransactionBuilder(this.ctx.provider.connection, this.ctx.provider.wallet);
        return this.ix ? tx.addInstruction(this.ix) : tx;
    }
}
