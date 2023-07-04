import { Connection } from "@solana/web3.js";
import { Address } from "@project-serum/anchor";
import { VaultData } from "../";
import { ParsableEntity, ParsableVault } from "./parsing";
/**
 * Supported accounts
 */
declare type CachedValue = ParsableVault;
/**
 * Include both the entity (i.e. type) of the stored value, and the value itself
 */
interface CachedContent<T extends CachedValue> {
    entity: ParsableEntity<T>;
    value: CachedValue | null;
}
export declare class AccountFetcher {
    private readonly connection;
    private readonly _cache;
    constructor(connection: Connection, cache?: Record<string, CachedContent<CachedValue>>);
    /*** Public Methods ***/
    /**
     * Update the cached value of all entities currently in the cache.
     * Uses batched rpc request for network efficient fetch.
     */
    refreshAll(): Promise<void>;
    /*** Private Methods ***/
    /**
     * Retrieve from cache or fetch from rpc, an account
     */
    private get;
    /**
     * Retrieve from cache or fetch from rpc, a list of accounts
     */
    private list;
    /**
     * Make batch rpc request
     */
    private bulkRequest;
    getVault(address: Address, refresh?: boolean): Promise<VaultData | null>;
}
export {};
