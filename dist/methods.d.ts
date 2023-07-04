import { TransactionBuilder, Instruction } from "@orca-so/common-sdk";
import { Context } from "./context";
import * as ixs from "./instructions";
export declare class Methods {
    ctx: Context;
    ix: Instruction | null | undefined;
    constructor(ctx: Context, ix?: Instruction);
    lock(params: ixs.LockParams): Promise<this>;
    changeDestination(params: ixs.ChangeDestinationParams): Promise<this>;
    unlock(params: ixs.UnlockParams): Promise<this>;
    toTx(): TransactionBuilder;
}
