import { coin as COIN, transport } from '@coolwallet/core';
import sign from './sign';
import { publicKeyToAddress } from './util';
import * as Types from './types'

type Transport = transport.default;

export default class BNB extends COIN.ECDSACoin implements COIN.Coin {
  public Types: any;

  constructor() {
    super(Types.coinType);
    this.Types = Types;
  }

  /**
   * Get Binance address by index
   */
  async getAddress(transport: Transport, appPrivateKey: string, appId: string, addressIndex: number): Promise<string> {
    const publicKey = await this.getPublicKey(transport, appPrivateKey, appId, addressIndex);
    return publicKeyToAddress(publicKey);
  }
  /**
   * Sign Binance tansfer transaction.
   */
  async signTransaction(
    transport: Transport,
    appPrivateKey: string,
    appId: string,
    signObj: Types.Transfer,
    addressIndex: number,
    confirmCB: Function | undefined,
    authorizedCB: Function | undefined
  ) {
    const readType = 'CA';
    return sign(
      transport,
      appId,
      appPrivateKey,
      Types.TransactionType.TRANSFER,
      signObj,
      addressIndex,
      confirmCB,
      authorizedCB
    );
  }

  /**
   * Sign PlaceOrder Transaction
   */
  async signPlaceOrder(
    transport: Transport,
    appPrivateKey: string,
    appId: string,
    signObj: Types.PlaceOrder,
    addressIndex: number,
    confirmCB: Function | undefined,
    authorizedCB: Function | undefined
  ) {
    const readType = 'CB';
    return sign(
      transport,
      appId,
      appPrivateKey,
      Types.TransactionType.PLACE_ORDER,
      signObj,
      addressIndex,
      confirmCB,
      authorizedCB
    );
  }

  /**
   * Sign CancelOrder Transaction
   */
  async signCancelOrder(
    transport: Transport,
    appPrivateKey: string,
    appId: string,
    signObj: Types.CancelOrder,
    addressIndex: number,
    confirmCB: Function | undefined,
    authorizedCB: Function | undefined
  ) {
    const readType = 'CC';
    return sign(
      transport,
      appId,
      appPrivateKey,
      Types.TransactionType.CANCEL_ORDER,
      signObj,
      addressIndex,
      confirmCB,
      authorizedCB
    );
  }
}
