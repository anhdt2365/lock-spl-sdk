/// <reference types="node" />
import { VaultData } from "../types";
/**
 * Static abstract class definition to parse entities.
 * @category Parsable
 */
export interface ParsableEntity<T> {
    /**
     * Parse account data
     *
     * @param accountData Buffer data for the entity
     * @returns Parsed entity
     */
    parse: (accountData: Buffer | undefined | null) => T | null;
}
export declare class ParsableVault {
    private constructor();
    static parse(data: Buffer | undefined | null): VaultData | null;
}
