import { apdu } from '@coolwallets/core';
import * as pairing from '../pairing.js';
import * as creation from '../create.js';
import * as setting from '../settings.js';

export default class CoolWallet {
  constructor(transport, appPrivateKey, appId = undefined) {
    this.transport = transport;
    this.appPrivateKey = appPrivateKey;
    this.appId = appId;

    this.setAppId = this.setAppId.bind(this);
    this.getSEVersion = this.getSEVersion.bind(this);
    this.register = this.register.bind(this);
    this.resetCard = this.resetCard.bind(this);
    this.getPairingPassword = this.getPairingPassword.bind(this);
  }

  setAppId(appId) {
    this.appId = appId;
  }

  async getCardInfo() {
    return setting.getCardInfo(this.transport);
  }

  async checkRegistered() {
    return apdu.control.sayHi(this.transport, this.appId);
  }

  async getSEVersion() {
    return apdu.setting.getSEVersion(this.transport);
  }

  async resetCard() {
    return apdu.setting.resetCard(this.transport);
  }

  async register(appPublicKey, password, deviceName) {
    return pairing.register(this.transport, appPublicKey, password, deviceName);
  }

  async getPairingPassword() {
    return pairing.getPairingPassword(this.transport, this.appId, this.appPrivateKey);
  }

  async getPairedApps() {
    return pairing.getPairedApps(this.transport, this.appId, this.appPrivateKey);
  }

  // For wallet creation
  async createWallet(strength) {
    return creation.createWallet(this.transport, this.appId, this.appPrivateKey, strength);
  }

  async sendCheckSum(sum) {
    return creation.sendCheckSum(this.transport, sum);
  }

  async setSeed(seedHex) {
    return creation.setSeed(this.transport, this.appId, this.appPrivateKey, seedHex);
  }
}
